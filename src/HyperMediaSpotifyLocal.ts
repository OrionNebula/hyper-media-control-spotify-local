import { EventEmitter } from 'events'
import { MediaPlugin, PlayerManager, Status, State, HyperMediaConfig } from 'hyper-media-control'
import * as request from 'request'
import { Spotilocal, RETURN_ON_PLAY, RETURN_ON_PAUSE, RETURN_ON_LOGIN, RETURN_ON_LOGOUT, RETURN_ON_ERROR, RETURN_ON_AP } from 'spotilocal'
import { Status as SpotifyStatus } from 'spotilocal/dist/src/status'
import { transform } from './nextPrev'

const spotiLocal = new Spotilocal()

export interface HyperMediaSpotifyLocalConfig {
  defaultPort?: number
}

export class HyperMediaSpotifyLocal extends EventEmitter implements MediaPlugin {
  playerManager: PlayerManager
  config: HyperMediaSpotifyLocalConfig
  spotify?: Spotilocal
  lastStatus: Status
  progressIntervalHandle: NodeJS.Timer
  nextTrack?: () => void | Promise<void> | Promise<Status>
  previousTrack?: () => void | Promise<void> | Promise<Status>

  constructor (playerManager: PlayerManager, config: HyperMediaConfig & { spotifyLocal: HyperMediaSpotifyLocalConfig | undefined }) {
    super()
    this.playerManager = playerManager
    this.config = config.spotifyLocal || {}
    this.lastStatus = { isRunning: false, state: State.Stopped }
  }

  playerName (): string {
    return 'spotifyLocal'
  }

  iconUrl (): string {
    return 'data:image/png;base64,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'
  }

  attemptConnect () {
    spotiLocal.init(this.config.defaultPort).then(spotify => {
      this.spotify = spotify
      spotify.getStatus().then(status => this.composeStatus(status)).then(status =>
        this.emit('status', status)
      )
      this.statusLoop()
    }).catch(() => this.attemptConnect())
  }

  activate (): void {
    this.on('status', (status: Status) => {
      if (status.state === State.Playing && this.lastStatus.state !== State.Playing) {
        this.progressIntervalHandle = setInterval(() => this.updateProgress(), 1000)
      } else if (status.state !== State.Playing && this.lastStatus.state === State.Playing) {
        clearInterval(this.progressIntervalHandle)
      }
      this.lastStatus = status
    })
    this.attemptConnect()
  }

  updateProgress () {
    if (this.lastStatus.progress) this.lastStatus.progress += 1000
    this.emit('status', this.lastStatus)
  }

  statusLoop () {
    if (!this.spotify) return
    this.spotify.getStatus([RETURN_ON_PLAY, RETURN_ON_PAUSE, RETURN_ON_LOGIN, RETURN_ON_LOGOUT, RETURN_ON_ERROR, RETURN_ON_AP], 5)
      .then((status: SpotifyStatus & { error: string }) => {
        if (!status.error) {
          this.composeStatus(status)
            .then(status => this.emit('status', status))
            .catch(_ => this.emit('status', { isRunning: false }))
          this.statusLoop()
        } else {
          this.emit('status', { isRunning: false, state: State.Stopped } as Status)
          this.attemptConnect()
        }
      })
  }

  deactivate (): void {
    this.removeAllListeners()
    clearInterval(this.progressIntervalHandle)
    this.spotify = undefined
  }

  playPause? (): void | Promise<Status> | Promise<void> {
    if (!this.spotify) return undefined
    return this.spotify.pause(this.lastStatus.state === State.Playing)
      .then(status => this.composeStatus(status))
  }

  composeStatus (status: SpotifyStatus): Promise<Status> {
    let coverPromise = Promise.resolve(status.track && this.artForTrack(status.track.track_resource.location.og))
    return coverPromise
      .then(coverUrl => ({
        isRunning: true,
        state: status.playing ? State.Playing : State.Paused,
        progress: status.playing_position * 1000,
        track: (status.track.track_resource && {
          name: status.track.track_resource.name,
          artist: status.track.artist_resource && status.track.artist_resource.name,
          coverUrl: coverUrl || undefined,
          duration: status.track.length * 1000
        })
      }))
  }

  artForTrack (trackUrl: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      request.get(trackUrl, (error, response, body) => {
        if (error) {
          resolve(null)
          return
        }

        const match = (/<meta\s+property="og:image"\s+content="(.*?)"/g).exec(body)
        resolve(match && match[1].toString())
      })
    })
  }
}

transform(HyperMediaSpotifyLocal)
