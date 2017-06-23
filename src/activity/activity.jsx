import { h, Component } from 'preact'
import cx from 'classnames'

import * as _ from 'utils'

import Tabs from './components/tabs'
import Dropdown from './components/dropdown'
import Histogram, { key as getKey, values as getValues } from './components/histogram'

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
    return histogramUsers.slice(0, 6)
  }

  formatFeatures (data) {
    return histogramFeatures.slice(0, 6)
  }

  updateGranularity (granularity) {
    const { facets, facet } = this.state
    const dataKey = facets[facet]
    let newData = this.state[dataKey]

    switch (granularity) {
      case 'w':
        newData = [...this[`format${dataKey}`]()].reduce((acc, v) => {
          const k = getKey(v)
          const days = getValues(v)
          const weeks = _.chunk(days, 7).map(d => {
            // console.log(d)
            return _.avg(d)
          })
          console.log(weeks);
          acc.push({[k]: weeks})
          return acc
        }, [])
        break
      case 'm':
        break
      case 'd':
        newData = [...this[`format${dataKey}`]()]
        break
    }
    // console.log(newData);
    this.setState({
      ...this.state,
      [dataKey]: newData,
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
