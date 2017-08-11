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

const indexData = data => {
  let index = 0
  return Object.keys(data).reduce((result, year) => {
    result[year] = data[year].map(m => [index++, m])
    return result
  }, {})
}

const Histogram = ({ data, min, max, margin = 1, className }) => {
  const years = Object.keys(data)

  const indexedData = indexData(data)
  const cumulatedMonths = years.reduce(
    (yy, y) => (yy += Number(data[y].filter(pass).length)),
    0
  )

  const baseScale = scalePow().exponent(0.25).domain([min, max])
  const yScale = baseScale.copy().range([0, 100])
  const opacityScale = baseScale.copy().range([0.5, 1])
  const avgToColor = m => rgba(sassVars.blue, opacityScale(_mean(m)))

  const firstItem = data[years[0]].filter(Boolean)[0]
  const firstItemIndex = data[years[0]].indexOf(firstItem)

  return (
    <div class={cx(className, styles.histogram)}>
      {Object.keys(indexedData).map((year, yearIndex) =>
        indexedData[year].map(([index, month], i) =>
          <div
            class={styles['histogram-month']}
            style={{ width: `${100 / cumulatedMonths}%` }}
          >
            <Bars data={month} {...{ yScale, opacityScale }} />
            <div
              style={{ borderColor: avgToColor(month) }}
              class={styles['histogram-month-label']}
            >
              <Labels
                {...{
                  year,
                  index,
                  firstItemIndex,
                  monthIndex: i,
                  numMonths: cumulatedMonths
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
