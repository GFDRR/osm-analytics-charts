import React, { PropTypes } from 'react'
import cx from 'classnames'

import appStyles from 'styles.scss'
import styles from './daily-activity.scss'

const DailyActivity = ({ width }) =>
  <div style={{ width }} className={cx(styles.da, appStyles.viz)}>Daily activity</div>

DailyActivity.propTypes = {
  width: PropTypes.string
}

export default DailyActivity
