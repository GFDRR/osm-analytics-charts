import { h } from 'preact'
import cx from 'classnames'

import styles from './histogram.scss'

const dataToWidth = (data, i) => `calc((100% / ${data.length}`

const dataToLeft = (data, i) => `calc(${dataToWidth(data, i)} * ${i})`

const Bars = ({ data, yScale }) => {
  return (
    <div class={styles.bars}>
      {data.map((d, i) =>
        <div
          class={cx(styles.bar)}
          style={{
            opacity: yScale(d) / 100,
            height: `${yScale(d)}%`,
            left: dataToLeft(data, i),
            width: dataToWidth(data, i)
          }}
        />
      )}
    </div>
  )
}

export default Bars
