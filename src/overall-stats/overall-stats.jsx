import { h, Component } from 'preact'
import { mountComponent } from 'utils'
import cx from 'classnames'

import appStyles from 'styles.scss'
import styles from './overall-stats.scss'

import Context from 'components/context'

class OverallStats extends Component {
  formatStats () {
    const { data, stats } = this.props
    return stats.map(stat => {
      const rootValue = data[stat.featureType]
      const value =
        stat.stat === 'users'
          ? rootValue.users_length
          : rootValue.total_feature_value
      const unit =
        stat.featureType === 'buildings' || stat.stat === 'users' ? null : 'km'
      const label =
        stat.stat === 'users'
          ? `users edited ${stat.featureType}`
          : `${stat.featureType} edited`
      return { value, unit, label }
    })
  }

  render () {
    const { apiUrl, data } = this.props
    const formattedStats = this.formatStats()
    return (
      <div className={appStyles}>
        <div class={cx(styles.title, appStyles.title)}>
          OSM Overall stats
          {apiUrl !== undefined && (
            <a target="_blank" className={appStyles.download} href={apiUrl}>
              Download data
            </a>
          )}
        </div>
        <Context data={data} />
        {formattedStats.map(stat => (
          <div className={styles.overallStat}>
            <span className={styles.label}>{stat.label}</span>
            <span className={styles.value}>{stat.value}</span>
            {stat.unit !== null && (
              <span className={styles.unit}>{stat.unit}</span>
            )}
          </div>
        ))}
      </div>
    )
  }
}

export default function overallStats (selector, options) {
  return mountComponent(OverallStats, selector, options)
}
