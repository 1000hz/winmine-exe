import imgCursorDefault from "~/public/cursors/cursor-default.png"
import imgCursorPointer from "~/public/cursors/cursor-pointer.png"
import imgCursorProgress from "~/public/cursors/cursor-progress.png"
import imgCursorWait from "~/public/cursors/cursor-wait.png"

import svgCursorDefault from "~/public/cursors/cursor-default.svg"
import svgCursorPointer from "~/public/cursors/cursor-pointer.svg"
import svgCursorProgress from "~/public/cursors/cursor-progress.svg"
import svgCursorWait from "~/public/cursors/cursor-wait.svg"

export default {
  fontFaces: {
    "MS Sans Serif": `
      @font-face {
        font-family: "MS Sans Serif";
        src: url("/fonts/MSSansSerif.woff2") format("woff2"), url("/fonts/MSSansSerif.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
        font-display: fallback;
      }

      @font-face {
        font-family: "MS Sans Serif";
        src: url("/fonts/MSSansSerifBold.woff2") format("woff2"),
          url("/fonts/MSSansSerifBold.ttf") format("truetype");
        font-weight: bold;
        font-style: normal;
        font-display: fallback;
      }`
  },
  fontFamilies: {
    default: `"MS Sans Serif", Tahoma, sans-serif`
  },
  fontSizes: ["11px"],
  colors: {
    gray: ["#000", "#868a8e", "#c3c7cb", "#fff"],
    fuchsia: "#a958a8",
    red: "#fc0d1b",
    yellow: "#fffd38",
    green: "#29fd2f",
    cyan: "#2dfffe",
    blue: "#0b24fb",
    magenta: "#fc28fc",
    violetRed: "#a80b55",
    olive: "#aaa95a",
    grass: "#18a958",
    teal: "#59aaa9",
    navy: "#0414a7"
  },
  cursors: {
    default: `url(${svgCursorDefault.src}), url(${imgCursorDefault.src}), auto`,
    pointer: `url(${svgCursorPointer.src}), url(${imgCursorPointer.src}), pointer`,
    progress: `url(${svgCursorProgress.src}), url(${imgCursorProgress.src}), progress`,
    wait: `url(${svgCursorWait.src}), url(${imgCursorWait.src}), wait`
  }
}
