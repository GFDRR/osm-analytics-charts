/* eslint no-return-assign: 0 */
import { h } from 'preact'
import cx from 'classnames'
import _mean from 'lodash/mean'
import _max from 'lodash/max'
import { rgba, stripUnit } from 'polished'

import { MONTH_NAMES } from 'src/constants'

import Bars from './bars'
import styles from './histogram.scss'

import sassVars from 'variables.scss'

const shorten = m => (m).substring(0, 3)
const avgToColor = m => rgba(sassVars.blue, _mean(m) / 100)

const Histogram = ({ data, margin = 1, className }) => {
  const totalMonths = Object.keys(data).reduce((yy, y) => yy += Number(data[y].length), 0)
  return (
    <div class={cx(className, styles.histogram)}>
      {Object.keys(data).map(year => data[year]
        .map((month, i) =>
          <div
            class={styles['histogram-month']}
            style={{ width: `calc(100% / ${totalMonths})` }}
          >
            <Bars margin={stripUnit(sassVars.monthMargin)} data={month} {...{max: _max(month)}} />
            <div
              style={{ borderColor: avgToColor(month) }}
              class={styles['histogram-month-label']}
            >
              {totalMonths > 12 ? '' : `${shorten(MONTH_NAMES[i])} ${year}`}
            </div>
          </div>
        ))}
    </div>
  )
}
export default Histogram
