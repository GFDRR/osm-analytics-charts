import { h } from 'preact'
import cx from 'classnames'

import { mountComponent } from 'utils'
import appStyles from 'styles.scss'
import styles from './activity.scss'

const DailyActivity = ({ width }) =>
  <div style={{ width }} class={cx(styles.da, appStyles.viz)}>Daily activity</div>

export default function topContributors (selector, options) {
  return mountComponent(DailyActivity, selector, options)
}
