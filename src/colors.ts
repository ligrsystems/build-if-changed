import hasFlag = require('has-flag')
import ansi = require('ansi-256-colors')

const disabled = hasFlag('--no-color') || !!process.env.NO_COLOR
const colors = {
  // saturated colors
  red: [5, 0, 0],
  blue: [0, 1, 5],
  green: [0, 5, 1],
  yellow: [5, 5, 0],
  cyan: [0, 3, 4],
  pink: [5, 0, 4],

  // light colors
  lred: [5, 0, 1],
  lblue: [3, 3, 5],
  lgreen: [0, 5, 3],
  lyellow: [5, 5, 2],
  lcyan: [1, 4, 5],
  lpink: [5, 1, 4],
}

const colorFns: any = {}
export default colorFns as {
  [P in keyof typeof colors]: (msg: string) => string
}

const noop = msg => msg
for (const name in colors) {
  const color = ansi.fg.getRgb(...colors[name])
  colorFns[name] = disabled ? noop : msg => color + msg + ansi.reset
}
