import { h } from 'preact'
import cx from 'classnames'

import { MONTH_NAMES } from 'src/constants'
import styles from './histogram.scss'

const shortenMonth = m => m.substr(0, 3)
const shortenyear = y => y.substr(2)
const monthName = i => shortenMonth(MONTH_NAMES[i])
const monthYear = (m, y) => `${monthName(m)} ${shortenyear(y)}`

const Labels = ({ index, month, year, numMonths }) => {
  let classNames
  let label
  // numYears >= 2 con borde, todos los eneros y el resto nada
  if (numMonths >= 24) {
    classNames = month === 0 ? cx(styles.label, styles.labelBorder) : ''
    label = month === 0 ? monthYear(month, year) : ''

    // numYears < 2 no border, eneros con año y los meses sin
  } else if (numMonths < 24) {
    classNames = cx(styles.label)
    label = month === 0 ? monthYear(month, year) : monthName(month)

    // menos de un año primer mes con año, eneros con año y demas meses solo mes
  } else if (numMonths <= 1) {
    classNames = month === 0 ? cx(styles.label, styles.labelBorder) : ''
    label = month === 0 ? monthYear(month, year) : ''
  }

  return label
    ? <span className={classNames}>
      {label}
    </span>
    : null
}

export default Labels
