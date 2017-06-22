import { h } from 'preact'
import cx from 'classnames'

import styles from '../activity.scss'

const dataToWidth = (data, margin, i) => `calc((100% / ${data.length} - ${margin}px) + ${margin / (data.length - 1)}px)`
const dataToLeft = (data, margin, i) => `calc((${dataToWidth(data, margin, i)} * ${i}) + ${i * margin}px)`

const valueToPerc = (value) => `${((value.features) / value.max) * 100}`
const valueToOpacity = (value) => `${valueToPerc(value) / 100}`
const valueToHeight = (value) => `${valueToPerc(value)}%`

const Bars = ({ data, margin = 1 }) => <div class={styles.bars}>
  {data.map((d, i) => <div
    class={cx(styles.bar)}
    style={{
      opacity: valueToOpacity(d),
      height: valueToHeight(d),
      left: dataToLeft(data, margin, i),
      width: dataToWidth(data, margin, i)
    }} />)}
</div>

export default Bars
