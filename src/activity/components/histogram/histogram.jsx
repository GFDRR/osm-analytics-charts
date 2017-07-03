import { h } from 'preact'
import cx from 'classnames'
import _mean from 'lodash/mean'
import _max from 'lodash/max'
import { rgba } from 'polished'

import { MONTH_NAMES } from 'src/constants'

import Bars from './bars'
import styles from './histogram.scss'

import sassVars from 'variables.scss'

const shorten = m => (m).substring(0, 3)
const avgToColor = (d, m) => rgba(sassVars.blue, _mean(m) / 100)

const Histogram = ({ data, margin = 1, className }) => {
  return (
    <div class={cx(className, styles.histogram)}>
      {Object.keys(data).map(year => data[year]
        .map(d => [d, _max(d)])
        .map(([month, max], i) =>
          <div
            class={styles['histogram-month']}
            style={{ width: `calc(100% / ${data.length})` }}
          >
            <Bars data={month} {...{max}} />
            <div
              style={{ borderColor: avgToColor(data, month) }}
              class={styles['histogram-month-label']}
            >
              {`${shorten(MONTH_NAMES[i])} ${year}`}
            </div>
          </div>
        ))}
    </div>
  )
}
export default Histogram
