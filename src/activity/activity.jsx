import { h, Component } from 'preact'
import cx from 'classnames'

import * as _ from 'utils'

import Tabs from './components/tabs'
import Dropdown from './components/dropdown'
import Histogram from './components/histogram'

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
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      facets: {
        f: 'Features',
        u: 'Users'
      },
      granularities: {
        d: 'Daily',
        w: 'Weekly',
        m: 'Monthly'
      },
      granularity: 'd',
      facet: 'u',
      Users: this.formatUsers(data),
      Features: this.formatFeatures(data)
    }
  }

  formatUsers (data) {
    return histogramUsers//.slice(0, 6)
      .map(d => [d, _.max(d)])
  }

  formatFeatures (data) {
    return histogramFeatures//.slice(0, 6)
      .map(d => [d, _.max(d)])
  }

  // groups days by week and returns the average of each week
  groupByWeek (data) {
    return data.reduce((acc, [days, max]) => {
      const weeks = _.chunk(days, 7).map(d => _.avg(d))
      acc.push([weeks, max])
      return acc
    }, [])
  }

  // groups days by month and returns the average of each Monthly
  groupByMonth (data) {
    return data.map(([d, max]) => [[_.avg(d)], max])
  }

  updateGranularity (granularity) {
    const { facets, facet } = this.state
    const dataKey = facets[facet]
    let data = [...this[`format${dataKey}`]()]

    switch (granularity) {
      case 'w':
        data = this.groupByWeek(data)
        break
      case 'm':
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
    const { facets, facet } = this.state
    return this.state[facets[facet]]
  }

  render () {
    const { width } = this.props
    const { facets, facet, granularity, granularities, monthNames } = this.state
    const data = this.getData()
    return (
      <div style={{ width }} class={cx(styles.activity)}>
        <div class={styles.top}>
          <div class={styles.selector}>
            OSM{' '}
            <Dropdown
              className={styles.dropdown}
              onSelect={this.updateGranularity}
              {...{ granularities, granularity }}
            />{' '}
            activity
          </div>
          <Tabs
            className={styles.tabs}
            onClick={this.updateFacet}
            {...{ facets, facet }}
          />
        </div>
        <Histogram className={styles.histogram} {...{ data, margin: 2, monthNames }} />
      </div>
    )
  }
}

export default function topContributors (selector, options) {
  return _.mountComponent(DailyActivity, selector, options)
}
