import { h, render } from 'preact'

export const mountComponent = (Component, selector, options) =>
  render(h(Component, options), document.querySelector(selector))

export const chunk = (arr, chunkSize) => {
  var R = []
  for (var i = 0, len = arr.length; i < len; i += chunkSize) {
    var rest = i + chunkSize > len
      ? null
      : i + chunkSize
    R.push(arr.slice(i, rest))
  }
  return R
}

const toInt = n => Math.floor(n)
const toNum = n => n * 1

export const percent = (n, m, fix = 2) => {
  const pc = n * 100 / m
  const fixed = toNum(pc.toFixed(fix))
  const intPc = toInt(pc)
  return intPc === fixed ? intPc : fixed
}
