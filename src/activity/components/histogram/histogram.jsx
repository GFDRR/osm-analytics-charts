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

const Histogram = ({ data, min, max, margin = 1, className }) => {
  const years = Object.keys(data)
  const cumulatedYs = years.reduce(
    (yy, y) => (yy += Number(data[y].filter(pass).length)),
    0
  )

  const baseScale = scalePow().exponent(0.25).domain([min, max])
  const yScale = baseScale.copy().range([0, 100])
  const opaciyScale = baseScale.copy().range([0.5, 1])
  const avgToColor = m => rgba(sassVars.blue, opaciyScale(_mean(m)))
  const firstItem = data[years[0]].filter(Boolean)[0]
  const firstItemIndex = data[years[0]].indexOf(firstItem)

  return (
    <div class={cx(className, styles.histogram)}>
      {years.map((year, yearIndex) =>
        data[year].map((month, i) =>
          <div
            class={styles['histogram-month']}
            style={{ width: `calc((100% / ${cumulatedYs}) + ${margin}px)` }}
          >
            <Bars data={month} {...{ yScale, opaciyScale }} />
            <div
              style={{ borderColor: avgToColor(month) }}
              class={styles['histogram-month-label']}
            >
              <Labels
                {...{
                  year,
                  month,
                  firstItem,
                  firstItemIndex,
                  monthIndex: i,
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
