import {useState} from "react"

if (typeof Audio === "undefined") {
  const noop = () => {}
  global.Audio = function Audio() {}
  global.Audio.prototype = [
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
  ].reduce((obj, prop) => ((obj[prop] = noop), obj), {})
}

function useAudio(src) {
  const [audio] = useState(() => new Audio(src))
  return audio
}

export default useAudio
