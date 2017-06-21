import { mountComponent } from 'utils'
import Viz from './daily-activity-viz'

export default function dailyActivity (selector, options) {
  return mountComponent(Viz, selector, options)
}
