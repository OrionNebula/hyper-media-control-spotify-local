import { HyperMediaSpotifyLocal } from '../HyperMediaSpotifyLocal'
import { Status } from 'hyper-media-control'

export = function (spotifyLocal: typeof HyperMediaSpotifyLocal) {
  spotifyLocal.prototype.nextTrack = function (this: HyperMediaSpotifyLocal): void | Promise<void> | Promise<Status> {
    return undefined
  }

  spotifyLocal.prototype.previousTrack = function (this: HyperMediaSpotifyLocal): void | Promise<void> | Promise<Status> {
    return undefined
  }
}
