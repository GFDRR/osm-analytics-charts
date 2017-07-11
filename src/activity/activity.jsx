import { h, Component } from 'preact'
import cx from 'classnames'

import _maxBy from 'lodash/maxBy'
import _mean from 'lodash/mean'
import _meanBy from 'lodash/meanBy'
import _chunk from 'lodash/chunk'
import _reduce from 'lodash/reduce'
import _map from 'lodash/map'
import startCase from 'lodash/startCase'

import { mountComponent, monthLength } from 'utils'

import { FACETS, GRANULARITIES } from 'src/constants'

import Tabs from 'components/tabs'
import Dropdown from './components/dropdown'
import Histogram from './components/histogram'

import appStyles from 'src/styles'
import styles from './activity.scss'

class DailyActivity extends Component {
  constructor (props) {
    super(props)
    this.updateFacet = this.updateFacet.bind(this)
    this.updateGranularity = this.updateGranularity.bind(this)
    this.state = this.formatState(props)
  }

  formatState (props) {
    return {
      granularity:
        (props.granularity && startCase(props.granularity)) ||
        GRANULARITIES.Daily,
      facet: (props.facet && startCase(props.facet)) || FACETS.Features,
      data: props.data,
      range: props.range || [new Date(), new Date()]
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
    const { range } = this.state
    const fromStamp = new Date(range[0]).getTime()
    const toStamp = new Date(range[1]).getTime()
    const filteredValues = data
      .sort((a, b) => a.day - b.day)
      .filter(d => d && d.day >= fromStamp && d.day < toStamp)

    const max = filteredValues.length
      ? getCount(_maxBy(filteredValues, getCount))
      : 0

    return [
      filteredValues.reduce((result, item) => {
        const { day, month, year, len } = this.parseDate(item.day)
        result[year] = !result[year] ? new Array(months) : result[year]
        result[year][month] =
          result[year][month] || new Array(len).fill(0, 0, len)

        result[year][month].forEach((d, i) => {
          if (i + 1 === day) {
            result[year][month][i] = getCount(item)
          }
        })

        return result
      }, {}),
      max
    ]
  }

  stdDeviation (data, average, getData = d => d) {
    const diffs = data.map(d => Math.pow(getData(d) - average, 2))
    return Math.sqrt(_mean(diffs))
  }

  aggregateFeatures (data, key, count) {
    const getCount = d => d[count]
    const getKey = d => d[key]

    const distAvgToStdDev = _reduce(
      this.state.data,
      (result, d, key) => {
        const values = (getKey(d) && getKey(d)) || []

        const average = _meanBy(getKey(d), getCount)
        const stdev = this.stdDeviation(values, average, getCount)

        result[key] = values.map(v => ({
          day: v.day,
          [count]: (getCount(v) - average) / stdev
        }))
        return result
      },
      {}
    )

    const aggregated = _reduce(
      distAvgToStdDev,
      (r, items) => {
        items.forEach(item => {
          const { day } = item
          r[day] = r[day] ? (r[day] + item[count]) / 2 : item[count]
        })
        return r
      },
      {}
    )

    return _map(aggregated, (aggregatedCount, day) => ({
      day: day * 1,
      [count]: aggregatedCount
    }))
  }

  getFeatures () {
    const count = 'count_features'
    const key = 'activity_count'
    const getCount = d => d[count]
    return this.formatData(
      this.aggregateFeatures(this.state.data, key, count),
      getCount
    )
  }

  getUsers (data) {
    const count = 'count_users'
    const key = 'activity_users'
    const getCount = d => d[count]
    return this.formatData(
      this.aggregateFeatures(this.state.data, key, count),
      getCount
    )
  }

  groupBy (data, predicate) {
    return _reduce(
      data,
      (years, months, year) => {
        years[year] = years[year] || months.map(predicate)
        return years
      },
      {}
    )
  }

  // groups days by week and returns the average of each week
  groupByWeek ([data, max]) {
    return [
      this.groupBy(data, days => _chunk(days, 7).map(d => _mean(d))),
      max
    ]
  }

  // groups days by month and returns the average of each Monthly
  groupByMonth ([data, max]) {
    return [this.groupBy(data, days => [_mean(days)]), max]
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
