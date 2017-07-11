/* eslint no-return-assign: 0 */
import { h } from 'preact'
import cx from 'classnames'
import _mean from 'lodash/mean'
import { rgba, stripUnit } from 'polished'
import { scalePow } from 'd3-scale'

import Bars from './bars'
import styles from './histogram.scss'

import sassVars from 'variables.scss'

const displayLabel = (m, y) => ``

const Histogram = ({ data, max, margin = 1, className }) => {
  const cumulatedYs = Object.keys(data).reduce(
    (yy, y) => (yy += Number(data[y].length)),
    0
  )
  const yScale = scalePow().domain([0, max]).range([0, 100]).exponent(0.25)
  const avgToColor = (m, max) => rgba(sassVars.blue, yScale(_mean(m)) / 100)
  return (
    <div class={cx(className, styles.histogram)}>
      {Object.keys(data).map(year =>
        data[year].map((month, i) =>
          <div
            class={styles['histogram-month']}
            style={{ width: `calc(100% / ${cumulatedYs})` }}
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
