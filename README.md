# Minesweeper

This project started as building a simple minesweeper clone for a job interview, but the nostalgia swept over me hard and inspired me to do something a little more ambitious. My goal is to build as faithful of a recreation of Windows 95 in the browser as I can.

### Get to sweepin'. Try not to get too blown up.

##### https://winmine-exe.now.sh/

## Installation

It assumes you have the latest node and yarn installed.

```
yarn install
yarn dev
open http://localhost:3000
```

## Running Tests

`yarn test` or `yarn test:debugger` to attach a debugger session

## Rules

* Player can left click to reveal square.
* Player can right click to flag square as mine.
* The number tells how many mines are in the immediate neighborhood.
* The goal is to reveal or flag all squares without revealing a mine.

## TODO

This thing is fun to build, so the project will grow to encompass more and more of the ✨Windows 95 experience✨.

Expect things like:

* A functioning Desktop with shortcut icons.
* A LocalStorage "file system."
* Functioning application menus.
* A Task manager to launch and keep track of running applications in the taskbar.
* Proper window management (moving, minimizing, maximizing, closing, focus control.)
* More applications. (Notepad.exe! Explorer.exe! MSPaint??)
* Easter eggs (BSOD error boundary, Clippy, maybe the SkiFree Yeti will eat you)
