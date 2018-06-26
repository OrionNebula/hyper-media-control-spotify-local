import * as os from 'os'
import { HyperMediaSpotifyLocal } from '../HyperMediaSpotifyLocal'

export function transform (spotifyLocal: typeof HyperMediaSpotifyLocal): void {
  let transformSpotifyLocal: typeof transform | undefined
  switch (os.platform()) {
    case 'win32':
      transformSpotifyLocal = require('./windows')
      break
    case 'darwin':
      transformSpotifyLocal = require('./darwin')
      break
    case 'linux':
      transformSpotifyLocal = require('./linux')
      break
    default:
      console.warn(`hyper-media-control-spotify-local: Platform "${os.platform()}" not recognized. Providing limited support.`)
      break
  }

  transformSpotifyLocal && transformSpotifyLocal(spotifyLocal)
}
