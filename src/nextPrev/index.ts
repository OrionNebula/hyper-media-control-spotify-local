import * as os from 'os'
import { HyperMediaSpotifyLocal } from '../HyperMediaSpotifyLocal'

export function transform (spotifyLocal: typeof HyperMediaSpotifyLocal): void {
  let transformSpotifyLocal: typeof transform | undefined
  switch (os.platform()) {
    case 'darwin':
      transformSpotifyLocal = require('./darwin')
      break
    default:
      console.warn(`hyper-media-control-spotify-local: Platform "${os.platform()}" does not have a specific previous/next track implementation.`)
      break
  }

  transformSpotifyLocal && transformSpotifyLocal(spotifyLocal)
}
