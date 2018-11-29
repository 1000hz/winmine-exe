export default {
  fontFaces: {
    "MS Sans Serif": `
      @font-face {
        font-family: "MS Sans Serif";
        src: url("/static/fonts/MSSansSerif.woff2") format("woff2"), url("/static/fonts/MSSansSerif.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
        font-display: fallback;
      }

      @font-face {
        font-family: "MS Sans Serif";
        src: url("/static/fonts/MSSansSerifBold.woff2") format("woff2"),
          url("/static/fonts/MSSansSerifBold.ttf") format("truetype");
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
    webkitDefault: `-webkit-image-set(url(${require("~/static/cursor-default.png")}) 1x, url(${require("~/static/cursor-default.svg")}) 2x), auto`,
    default: `url(${require("~/static/cursor-default.png")}), auto`,
    webkitPointer: `-webkit-image-set(url(${require("~/static/cursor-pointer.png")}) 1x, url(${require("~/static/cursor-pointer.svg")}) 2x), pointer`,
    pointer: `url(${require("~/static/cursor-pointer.png")}), pointer`,
    webkitProgress: `-webkit-image-set(url(${require("~/static/cursor-progress.png")}) 1x, url(${require("~/static/cursor-progress.svg")}) 2x), progress`,
    progress: `url(${require("~/static/cursor-progress.png")}), progress`,
    webkitWait: `-webkit-image-set(url(${require("~/static/cursor-wait.png")}) 1x, url(${require("~/static/cursor-wait.png")}) 2x), wait`,
    wait: `url(${require("~/static/cursor-wait.png")}), wait`
  }
}
