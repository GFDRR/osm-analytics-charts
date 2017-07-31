import { h } from 'preact'
import cx from 'classnames'

import styles from './histogram.scss'

const dataToWidth = (data, i) => `calc((100% / ${data.length}`
const dataToLeft = (data, i) => `calc(${dataToWidth(data, i)} * ${i})`

const Bars = ({ data, yScale, opacityScale }) => {
  return (
    <div class={styles.bars}>
      {data.map((d, i) =>
        <div
          title={`${d}, ${yScale(d)}`}
          class={cx(styles.bar)}
          style={{
            // hide zeros
            opacity: d === 0 ? 0 : opacityScale(d),
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
