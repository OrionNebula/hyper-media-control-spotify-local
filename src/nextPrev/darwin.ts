import { HyperMediaSpotifyLocal } from '../HyperMediaSpotifyLocal'
import { Status } from 'hyper-media-control'
import { exec } from 'child_process'

HyperMediaSpotifyLocal.prototype.nextTrack = function (this: HyperMediaSpotifyLocal): void | Promise<void> | Promise<Status> {
  exec("osascript -e 'tell application \"Spotify\" to next track'")
}

HyperMediaSpotifyLocal.prototype.previousTrack = function (this: HyperMediaSpotifyLocal): void | Promise<void> | Promise<Status> {
  exec("osascript -e 'tell application \"Spotify\" to previous track'")
}
