import { HyperMediaSpotifyLocal } from '../HyperMediaSpotifyLocal'
import { Status } from 'hyper-media-control'
import * as robot from 'robotjs'

export = function (spotifyLocal: typeof HyperMediaSpotifyLocal) {
  spotifyLocal.prototype.nextTrack = function (this: HyperMediaSpotifyLocal): void | Promise<void> | Promise<Status> {
    robot.keyTap('audio_next')
  }

  spotifyLocal.prototype.previousTrack = function (this: HyperMediaSpotifyLocal): void | Promise<void> | Promise<Status> {
    robot.keyTap('audio_prev')
  }
}
