import React from 'react'
import ReactDOM from 'react-dom'

export const mountComponent = (Component, selector, options) =>
  ReactDOM.render(React.createElement(Component, options), document.querySelector(selector))
