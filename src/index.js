import { registerSubPlugin } from 'hyper-plugin-extend'
import { HyperMediaSpotifyLocal } from './HyperMediaSpotifyLocal.js'

export const onRendererWindow = registerSubPlugin('hyper-media-control', HyperMediaSpotifyLocal)
