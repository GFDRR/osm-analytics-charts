import { h } from 'preact'
import cx from 'classnames'

import { mountComponent } from 'utils'
import appStyles from 'styles.scss'
import styles from './top-contributors.scss'

const TopContributors = ({ width }) =>
  <div style={{ width }} class={cx(styles.tc, appStyles.viz)}>Top contributors</div>

export default function topContributors (selector, options) {
  return mountComponent(TopContributors, selector, options)
}
