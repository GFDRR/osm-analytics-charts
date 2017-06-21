import { mountComponent } from 'utils'
import Viz from './before-after-viz'

export default function topContributors (selector, options) {
  return mountComponent(Viz, selector, options)
}
