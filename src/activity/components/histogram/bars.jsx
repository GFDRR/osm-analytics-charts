import { h } from 'preact'
import cx from 'classnames'

import styles from './histogram.scss'

const dataToWidth = (data, margin, i) =>
  `calc((100% / ${data.length} - ${margin}px) + ${
    data.length > 1
      ? margin / (data.length - 1)
      : 0
  }px)`

const dataToLeft = (data, margin, i) =>
  `calc((${dataToWidth(data, margin, i)} * ${i}) + ${i * margin}px)`

const valueToPerc = (value, max) => `${value / max * 100}`
const valueToOpacity = (value, max) => `${valueToPerc(value, max) / 100}`
const valueToHeight = (value, max) => `${valueToPerc(value, max)}%`

const Bars = ({ data, max, margin = 1 }) => {
  return (
    <div class={styles.bars}>
      {data.map((d, i) =>
        <div
          class={cx(styles.bar)}
          style={{
            opacity: valueToOpacity(d, max),
            height: valueToHeight(d, max),
            left: dataToLeft(data, margin, i),
            width: dataToWidth(data, margin, i)
          }}
        />
      )}
    </div>
  )
}

export default Bars
