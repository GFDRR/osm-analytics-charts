import { h } from 'preact'
import cx from 'classnames'
import _mean from 'lodash/mean'
import { rgba } from 'polished'
import { scalePow } from 'd3-scale'

import Bars from './bars'
import Labels from './labels'
import styles from './histogram.scss'

import sassVars from 'variables.scss'

const pass = _ => true

const Histogram = ({ data, max, margin = 1, className }) => {
  const years = Object.keys(data)
  const cumulatedYs = years.reduce(
    (yy, y) => (yy += Number(data[y].filter(pass).length)),
    0
  )

  // Different scales to decide which one works best
  // logarithmic scale base 10
  // const yScale = scaleLog().base(10).domain([0, max]).range([0, 100])
  // linear scale
  // const yScale = scaleLinear().domain([0, max]).range([0, 100])
  // exponential scale exponent 0.5
  const yScale = scalePow().exponent(0.5).domain([0, max]).range([0, 100])
  // const yScale = scaleLinear().domain([0, max]).range([0, 100])
  const colorScale = yScale.copy().range([0.3, 1])
  const avgToColor = (m, max) => rgba(sassVars.blue, colorScale(_mean(m)))

  return (
    <div class={cx(className, styles.histogram)}>
      {years.map((year, yearIndex) =>
        data[year].map((month, i) =>
          <div
            class={styles['histogram-month']}
            style={{ width: `calc((100% / ${cumulatedYs}) + ${margin}px)` }}
          >
            <Bars data={month} {...{ yScale }} />
            <div
              style={{ borderColor: avgToColor(month, max) }}
              class={styles['histogram-month-label']}
            >
              <Labels
                {...{
                  index: yearIndex,
                  month: i,
                  year,
                  numMonths: cumulatedYs
                }}
              />
            </div>
          </div>
        )
      )}
    </div>
  )
}
export default Histogram
