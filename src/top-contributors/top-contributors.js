import { mountComponent } from 'utils'
import Viz from './top-contributors-viz'

export default function topContributors (selector, options) {
  return mountComponent(Viz, selector, options)
}
