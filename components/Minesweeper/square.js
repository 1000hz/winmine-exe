import React, {useState} from "react"
import {createComponent} from "cf-style-container"
import Flag from "./flag"

const borderStyle = clicked => {
  return clicked
    ? {
        borderTop: "2px solid #999",
        borderRight: "none",
        borderBottom: "none",
        borderLeft: "2px solid #999"
      }
    : {
        borderWidth: 4,
        borderStyle: "solid",
        borderTopColor: "#fff",
        borderRightColor: "#999",
        borderBottomColor: "#999",
        borderLeftColor: "#fff"
      }
}

const styles = ({clicked, exploded}) => ({
  width: 40,
  height: 40,
  padding: 10,
  cursor: clicked ? "initial" : "pointer",
  backgroundColor: exploded ? "#fc0d1b" : "#ccc",
  ...borderStyle(clicked),
  ".Desk:active :hover": borderStyle(true),
  lineHeight: 1,
  textAlign: "center",
  fontSize: 18,
  outline: "none"
})

const Square = ({onClick, onContextMenu, flag, clicked, className, children}) => {
  return (
    <button type="button" className={className} onClick={onClick} onContextMenu={onContextMenu}>
      {clicked ? children : flag ? <Flag /> : undefined}
    </button>
  )
}

export default createComponent(styles, Square, ["onClick", "onContextMenu", "children", "clicked", "flag"])
