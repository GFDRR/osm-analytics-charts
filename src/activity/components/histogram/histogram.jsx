/* eslint no-return-assign: 0 */
import { h } from 'preact'
import cx from 'classnames'
import _mean from 'lodash/mean'
import _size from 'lodash/size'
import { rgba, stripUnit } from 'polished'
import { scalePow } from 'd3-scale'
// import { MONTH_NAMES } from 'src/constants'

import Bars from './bars'
import styles from './histogram.scss'

import sassVars from 'variables.scss'

// const shorten = m => (m).substring(0, 3)
// const displayLabel = m => `${shorten(MONTH_NAMES[i])} ${year}`
// const displayLabel = (m, y) => `${m + 1}/${y}`
// const displayLabel = (m, y) => `${m + 1}`
const displayLabel = (m, y) => ``

const Histogram = ({ data, max, margin = 1, className }) => {
  const totalMonths = Object.keys(data).reduce(
    (yy, y) => (yy += Number(data[y].filter(d => !!data[y]).length)),
    0
  )
  const yScale = scalePow().domain([0, max]).range([0, 100]).exponent(0.25)
  const avgToColor = (m, max) => rgba(sassVars.blue, yScale(_mean(m)) / 100)
  const histogramStyle =
    _size(data) > 6 ? { justifyContent: 'space-between' } : {}
  return (
    <div class={cx(className, styles.histogram)} style={histogramStyle}>
      {Object.keys(data).map(year =>
        data[year].map((month, i) =>
          <div
            class={styles['histogram-month']}
            style={{ width: `calc(100% / ${totalMonths})` }}
          >
            <Bars
              margin={stripUnit(sassVars.monthMargin)}
              data={month}
              {...{ yScale }}
            />
            <div
              style={{ borderColor: avgToColor(month, max) }}
              class={styles['histogram-month-label']}
            >
              {displayLabel(i, year)}
            </div>
          </div>
        )
      )}
    </div>
  )
}
export default Histogram
