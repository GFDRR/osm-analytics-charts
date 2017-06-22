import { h } from 'preact'
import styles from './histogram.scss'
import cx from 'classnames'

import Bars from './bars'

const key = m => Object.keys(m)[0]
const values = m => m[key(m)]
const monthToLabel = m => key(m).substring(0, 3)
const max = m => Math.max(...values(m))
const sum = m => values(m).reduce((a, b) => a + b, 0)
const avg = m => sum(m) / values(m).length
const avgToColor = (d, m) => `rgba(0, 0, 255, ${avg(m) / 100})`

const Histogram = ({ data, margin = 1, className }) => {
  return (
    <div class={cx(className, styles.histogram)}>
      {data.map(month =>
        <div
          class={styles['histogram-month']}
          style={{ width: `calc(100% / ${data.length})` }}
        >
          <Bars max={max(month)} data={values(month)} />
          <div
            style={{ borderColor: avgToColor(data, month) }}
            class={styles['histogram-month-label']}
          >
            {monthToLabel(month)}
          </div>
        </div>
      )}
    </div>
  )
}
export default Histogram
