import { h } from 'preact'
import styles from '../activity.scss'
import cx from 'classnames'

import Bars from './bars'

const BarGroup = ({ data, margin = 1 }) => <div class={styles.bargroup}>
  <Bars {...{data, margin: 2}} />
</div>

export default BarGroup
