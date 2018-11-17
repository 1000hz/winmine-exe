import {useRef} from "react"

function useAudio(src) {
  const ref = useRef(new Audio(src))
  return ref.current
}

if (typeof Audio === "undefined") {
  const noop = () => {}
  global.Audio = noop
  const properties = [
    "NETWORK_EMPTY",
    "NETWORK_IDLE",
    "NETWORK_LOADING",
    "NETWORK_NO_SOURCE",
    "HAVE_NOTHING",
    "HAVE_METADATA",
    "HAVE_CURRENT_DATA",
    "HAVE_FUTURE_DATA",
    "HAVE_ENOUGH_DATA",
    "error",
    "src",
    "currentSrc",
    "crossOrigin",
    "networkState",
    "preload",
    "buffered",
    "readyState",
    "seeking",
    "currentTime",
    "duration",
    "paused",
    "defaultPlaybackRate",
    "playbackRate",
    "played",
    "seekable",
    "ended",
    "autoplay",
    "loop",
    "controls",
    "controlsList",
    "volume",
    "muted",
    "defaultMuted",
    "textTracks",
    "webkitAudioDecodedByteCount",
    "webkitVideoDecodedByteCount",
    "load",
    "canPlayType",
    "play",
    "pause",
    "addTextTrack",
    "onencrypted",
    "onwaitingforkey",
    "srcObject",
    "captureStream",
    "sinkId",
    "remote",
    "disableRemotePlayback",
    "setSinkId",
    "mediaKeys",
    "setMediaKeys"
  ]
  properties.forEach(prop => (Audio.prototype[prop] = noop))
}

export default useAudio
