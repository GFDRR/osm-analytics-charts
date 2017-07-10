import { h } from 'preact'
import cx from 'classnames'

import styles from './histogram.scss'

const dataToWidth = (data, margin, i) =>
  `calc((100% / ${data.length} - ${margin}px) + ${data.length > 1
    ? margin / (data.length - 1)
    : 0}px)`

const dataToLeft = (data, margin, i) =>
  `calc((${dataToWidth(data, margin, i)} * ${i}) + ${i * margin}px)`

const Bars = ({ data, yScale, margin = 1 }) => {
  return (
    <div class={styles.bars}>
      {data.map((d, i) =>
        <div
          class={cx(styles.bar)}
          style={{
            opacity: yScale(d) / 100,
            height: `${yScale(d)}%`,
            left: dataToLeft(data, margin, i),
            width: dataToWidth(data, margin, i),
            minWidth: dataToWidth(data, 0, i),
            marginRight: `${(margin && margin / data.length) || 0}px`
          }}
        />
      )}
    </div>
  )
}

export default Bars
