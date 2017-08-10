import { h } from 'preact'
import cx from 'classnames'

import { MONTH_NAMES } from 'src/constants'
import styles from './histogram.scss'

const monthName = i => MONTH_NAMES[i]
const shortenMonth = m => m.substr(0, 3)
const shortMonthName = i => shortenMonth(monthName(i))

const Labels = ({ index, firstItemIndex, monthIndex, year, numMonths }) => {
  const labelLength = 6
  const isJanuary = monthIndex === 0
  const isFirst = index === 0
  const isLast = index === numMonths - 1
  const overlapsLast = index > numMonths - labelLength * 2
  const overlapsFirst = isJanuary && firstItemIndex - index > 0

  const labelClasses = cx({
    [styles.label]: isJanuary || numMonths <= 1 || isFirst || isLast,
    [styles.labelHidden]:
    (numMonths >= 24 && !isFirst && !isLast && !isJanuary) ||
      (numMonths >= 24 &&
        ((!isFirst && overlapsFirst) || (!isLast && overlapsLast))),
    [styles.labelBorder]: numMonths > 24 && ((isJanuary && !isLast) || isFirst),
    [styles.labelBorderLast]: numMonths > 24 && isLast,
    [styles.last]: isLast
  })

  const yearClasses = cx(styles.year, {
    [styles.yearVisible]: isFirst || isLast || isJanuary || numMonths <= 1
  })

  const monthClasses = cx({
    [styles.monthHidden]: numMonths >= 24 && !isFirst && !isLast
  })

  return (
    <span className={labelClasses}>
      <span className={monthClasses}>
        {numMonths <= 1 ? monthName(monthIndex) : shortMonthName(monthIndex)}
      </span>
      <span className={yearClasses}>
        {year}
      </span>
    </span>
  )
}

export default Labels
