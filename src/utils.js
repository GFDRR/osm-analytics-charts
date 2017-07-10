import { h, render } from 'preact'

export const mountComponent = (Component, selector, options) =>
  render(h(Component, options), document.querySelector(selector))

const toInt = n => Math.floor(n)
const toNum = n => n * 1

export const percent = (n, m, fix = 2) => {
  const pc = n * 100 / m
  const fixed = toNum(pc.toFixed(fix))
  const intPc = toInt(pc)
  return intPc === fixed ? intPc : fixed
}

const MONTH_LENGTHS = [
  31,
  28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
]

export const isLeap = year => new Date(year, 1, 29).getMonth() === 1

export const monthLength = (m, y) => m === 1
  ? isLeap(y) ? MONTH_LENGTHS[m] + 1 : MONTH_LENGTHS[m]
  : MONTH_LENGTHS[m]
