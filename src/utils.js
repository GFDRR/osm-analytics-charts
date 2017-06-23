import { h, render } from 'preact'

export const mountComponent = (Component, selector, options) =>
  render(h(Component, options), document.querySelector(selector))

export const sum = a => a.reduce((a, b) => a + b, 0)
export const avg = a => sum(a) / a.length
export const max = m => Math.max(...m)

export const chunk = (arr, chunkSize) => {
  var R = []
  for (var i = 0, len = arr.length; i < len; i += chunkSize) {
    R.push(arr.slice(i, i + chunkSize))
  }
  return R
}
