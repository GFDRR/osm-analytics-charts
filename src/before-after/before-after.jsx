import { h } from 'preact'
import cx from 'classnames'

import { mountComponent } from 'utils'
import appStyles from 'styles.scss'
import styles from './before-after.scss'

const BeforeAfter = ({ width }) =>
  <div style={{ width }} className={cx(styles.ba, appStyles.viz)}>Before & After</div>

export default function topContributors (selector, options) {
  return mountComponent(BeforeAfter, selector, options)
}
