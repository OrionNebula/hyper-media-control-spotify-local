import * as os from 'os'

switch (os.platform()) {
  case 'win32':
    require('./windows')
    break
  case 'darwin':
    require('./darwin')
    break
  case 'linux':
    require('./linux')
    break
  default:
    console.warn(`hyper-media-control-spotify-local: Platform "${os.platform()}" not recognized. Providing limited support.`)
    break
}
