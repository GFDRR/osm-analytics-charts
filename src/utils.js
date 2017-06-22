import { h, render } from 'preact'

export const mountComponent = (Component, selector, options) =>
  render(h(Component, options), document.querySelector(selector))
