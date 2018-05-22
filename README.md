# hyper-media-control-spotify-local

[![License](https://img.shields.io/github/license/OrionNebula/hyper-media-control-spotify-local.svg)](LICENSE)
[![hyper](https://img.shields.io/badge/Hyper-v2.0.0-brightgreen.svg)](https://github.com/zeit/hyper/releases/tag/2.0.0)
[![GitHub issues](https://img.shields.io/github/issues/OrionNebula/hyper-media-control-spotify-local.svg)](https://github.com/OrionNebula/hyper-media-control-spotify-local/issues)

> Extend [`hyper-media-control`](https://github.com/OrionNebula/hyper-media-control) with support for [`Spotify`](https://www.spotify.com/) via the local web server.

## Installation

Add `hyper-media-control` and `hyper-media-control-spotify-local` to your Hyper configuration.

## Configuration

`hyper-media-control-spotify-local` defines the following configuration options:

```js
module.exports = {
    config: {
        ...
        hyperMedia: {
            ...
            spotifyLocal: {
                defaultPort: 4370 // The starting port when scanning for the local Spotify server. Only change this if you know what you're doing.
            }
            ...
        }
    }
}
```