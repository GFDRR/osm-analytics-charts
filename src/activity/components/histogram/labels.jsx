import { h } from 'preact'
import _isEqual from 'lodash/isEqual'
import cx from 'classnames'

import { MONTH_NAMES } from 'src/constants'
import styles from './histogram.scss'

const monthName = i => MONTH_NAMES[i]
const shortenMonth = m => m.substr(0, 3)
const shortenyear = y => y.substr(2)
const shortMonthName = i => shortenMonth(monthName(i))

const Labels = ({
  month,
  firstItem,
  firstItemIndex,
  monthIndex,
  year,
  numMonths
}) => {
  const isJanuary = monthIndex === 0
  const isFirst = _isEqual(firstItem, month)

  const labelClasses = cx({
    [styles.label]: isJanuary || numMonths <= 1 || isFirst,
    [styles.labelHidden]:
    numMonths >= 24 && !isJanuary && (!isFirst || firstItemIndex > 10),
    [styles.labelBorder]: numMonths > 24 && (isJanuary || isFirst)
  })

  const yearClasses = cx(styles.year, {
    [styles.yearVisible]: isFirst || isJanuary || numMonths <= 1
  })

  return (
    <span className={labelClasses}>
      {numMonths <= 1 ? monthName(monthIndex) : shortMonthName(monthIndex)}
      <span className={yearClasses}>
        {numMonths <= 1 ? year : shortenyear(year)}
      </span>
    </span>
  )
}

export default Labels
