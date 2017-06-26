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
