import { h } from 'preact'
import cx from 'classnames'

import styles from './histogram.scss'
import { FACETS } from 'src/constants'

const dataToWidth = (data, i) => `calc((100% / ${data.length}`
const dataToLeft = (data, i) => `calc(${dataToWidth(data, i)} * ${i})`

const getTooltip = (d, facet) => {
  const labels = Object.keys(d.rawDict).map(key => {
    const value = Math.round(d.rawDict[key])
    if (facet === FACETS.Users) {
      return `${value} user${value === 1 ? '' : 's'} edited ${key} each day`
    }
    const unit = key === 'buildings' ? '' : ' km'
    // remove final s when singular and feature is measured in units, not length
    const featureType =
      value === 1 && key === 'buildings' ? key.replace(/s$/i, '') : key
    return `${value}${unit} ${featureType} edited per day`
  })
  return labels.join('|')
}

const Bars = ({ data, yScale, opacityScale, facet }) => {
  return (
    <div class={styles.bars}>
      {data.map((d, i) => (
        <div
          data-tooltip={getTooltip(d, facet)}
          class={cx(styles.bar)}
          style={{
            // hide zeros
            opacity: d.aggr === 0 ? 0 : opacityScale(d.aggr),
            height: `${d.aggr === 0 ? 0 : Math.max(yScale(d.aggr), 1)}%`,
            left: dataToLeft(data, i),
            width: dataToWidth(data, i)
          }}
        />
      ))}
    </div>
  )
}

export default Bars
