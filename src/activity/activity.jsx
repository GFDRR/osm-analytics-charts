import { h, Component } from 'preact'
import cx from 'classnames'

import _max from 'lodash/max'
import _maxBy from 'lodash/maxBy'
import _mean from 'lodash/mean'
import _chunk from 'lodash/chunk'
import _reduce from 'lodash/reduce'

import { mountComponent, monthLength } from 'utils'

import { FACETS, GRANULARITIES } from 'src/constants'

import Tabs from 'components/tabs'
import Dropdown from './components/dropdown'
import Histogram from './components/histogram'

import appStyles from 'src/styles'
import styles from './activity.scss'

import histogramUsers from '../../public/mocks/histogram-users.json'

class DailyActivity extends Component {
  constructor (props) {
    super(props)
    this.updateFacet = this.updateFacet.bind(this)
    this.updateGranularity = this.updateGranularity.bind(this)
    this.state = this.formatState(props)
  }

  formatState (props) {
    return {
      granularity: GRANULARITIES.Daily,
      facet: FACETS.Features,
      data: props.data,
      range: props.range || []
    }
  }

  parseDate (d) {
    const date = new Date(d)
    const day = date.getDate() - 1
    const month = date.getMonth()
    const year = date.getFullYear()
    return {
      day,
      month,
      year,
      len: monthLength(month, year)
    }
  }

  formatData (data, getCount) {
    const months = 12
    const [from, to] = this.state.range
    const filteredValues = data
      .sort((a, b) => a.day - b.day)
      .filter(d => d.day >= from && d.day < to)

    const max = getCount(_maxBy(filteredValues, getCount))

    return [filteredValues.reduce((result, item) => {
      const { day, month, year, len } = this.parseDate(item.day)
      result[year] = (!result[year]) ? new Array(months) : result[year]
      result[year][month] = result[year][month] || new Array(len).fill(0, 0, len)

      result[year][month].forEach((d, i) => {
        if (i + 1 === day) {
          result[year][month][i] = getCount(item)
        }
      })

      return result
    }, {}), max]
  }

  getFeatures () {
    const getCount = d => d.count_features
    return this.formatData(this.state.data.buildings.activity_count, getCount)
  }

  getUsers (data) {
    const getCount = d => d.count_features
    // const getCount = d => d.count_users
    return this.formatData(this.state.data.buildings.activity_count, getCount)
  }

  // groups days by week and returns the average of each week
  groupByWeek ([data, max]) {
    return [_reduce(data, (years, months, year) => {
      years[year] = years[year] || months
        .map(days => _chunk(days, 7).map(d => _mean(d)))

      return years
    }, {}), max]
  }

  // groups days by month and returns the average of each Monthly
  groupByMonth ([data, max]) {
    return [_reduce(data, (years, months, year) => {
      years[year] = years[year] || months
        .map(days => [_mean(days)])
      return years
    }, {}), max]
  }

  updateGranularity (granularity) {
    this.setState({
      ...this.state,
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
    const { facet, granularity } = this.state
    const dataKey = FACETS[facet]
    let groupedData = this[`get${dataKey}`]()
    switch (granularity) {
      case GRANULARITIES.Weekly:
        return this.groupByWeek(groupedData)
      case GRANULARITIES.Monthly:
        return this.groupByMonth(groupedData)
    }

    return groupedData
  }

  render () {
    const { facet, granularity } = this.state
    const [data, max] = this.getData()
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
        <Histogram className={styles.histogram} {...{ data, max, margin: 2 }} />
      </div>
    )
  }
}

export default function topContributors (selector, options) {
  return mountComponent(DailyActivity, selector, options)
}
