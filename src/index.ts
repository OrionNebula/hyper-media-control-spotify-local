import { registerSubPlugin } from 'hyper-plugin-extend'
import { HyperMediaSpotifyLocal } from './HyperMediaSpotifyLocal'

export const onRendererWindow = registerSubPlugin('hyper-media-control', HyperMediaSpotifyLocal)
