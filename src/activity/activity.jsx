import { h, Component } from 'preact'
import cx from 'classnames'

import _max from 'lodash/max'
import _mean from 'lodash/mean'

import { mountComponent, chunk } from 'utils'

import { FACETS, GRANULARITIES } from 'src/constants'

import Tabs from 'components/tabs'
import Dropdown from './components/dropdown'
import Histogram from './components/histogram'

import appStyles from 'src/styles'
import styles from './activity.scss'

import histogramUsers from '../../public/mocks/histogram-users.json'
import histogramFeatures from '../../public/mocks/histogram-features.json'

class DailyActivity extends Component {
  constructor (props) {
    super(props)
    this.updateFacet = this.updateFacet.bind(this)
    this.updateGranularity = this.updateGranularity.bind(this)
    this.state = this.formatState(props.data)
  }

  formatState (data) {
    return {
      granularity: GRANULARITIES.Daily,
      facet: FACETS.Features,
      Users: this.formatUsers(data),
      Features: this.formatFeatures(data)
    }
  }

  formatUsers (data) {
    return histogramUsers // .slice(0, 6)
      .map(d => [d, _max(d)])
  }

  formatFeatures (data) {
    return histogramFeatures // .slice(0, 6)
      .map(d => [d, _max(d)])
  }

  // groups days by week and returns the average of each week
  groupByWeek (data) {
    return data.reduce((acc, [days, max]) => {
      const weeks = chunk(days, 7).map(d => _mean(d))
      acc.push([weeks, max])
      return acc
    }, [])
  }

  // groups days by month and returns the average of each Monthly
  groupByMonth (data) {
    return data.map(([d, max]) => [[_mean(d)], max])
  }

  updateGranularity (granularity) {
    const { facet } = this.state
    const dataKey = FACETS[facet]
    let data = [...this[`format${dataKey}`]()]

    switch (granularity) {
      case GRANULARITIES.Weekly:
        data = this.groupByWeek(data)
        break
      case GRANULARITIES.Monthly:
        data = this.groupByMonth(data)
        break
    }

    this.setState({
      ...this.state,
      [dataKey]: data,
      granularity
    })
  }

  updateFacet (facet) {
    this.setState({
      ...this.state,
      facet
    })
  }

  getData () {
    const { facet } = this.state
    return this.state[FACETS[facet]]
  }

  render () {
    const { facet, granularity } = this.state
    const data = this.getData()
    return (
      <div class={cx(styles.activity)}>
        <div class={appStyles.heading}>
          <div class={appStyles.title}>
            OSM{' '}
            <Dropdown
              className={styles.dropdown}
              onSelect={this.updateGranularity}
              {...{ options: GRANULARITIES, selected: granularity }}
            />{' '}
            activity
          </div>
          <Tabs
            className={styles.tabs}
            onClick={this.updateFacet}
            {...{ tabs: FACETS, selected: facet }}
          />
        </div>
        <Histogram className={styles.histogram} {...{ data, margin: 2 }} />
      </div>
    )
  }
}

export default function topContributors (selector, options) {
  return mountComponent(DailyActivity, selector, options)
}
