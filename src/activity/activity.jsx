import { h, Component } from 'preact'
import cx from 'classnames'
import { stripUnit } from 'polished'

import _maxBy from 'lodash/maxBy'
import _mean from 'lodash/mean'
import _chunk from 'lodash/chunk'
import _reduce from 'lodash/reduce'
import startCase from 'lodash/startCase'

import { mountComponent, monthLength } from 'utils'

import { FACETS, GRANULARITIES } from 'src/constants'

import Tabs from 'components/tabs'
import Dropdown from './components/dropdown'
import Histogram from './components/histogram'

import sassVars from 'variables.scss'
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

  getFeatures () {
    const getCount = d => d.count_features
    return this.formatData(this.state.data.buildings.activity_count, getCount)
  }

  getUsers (data) {
    const getCount = d => d.count_users
    return this.formatData(this.state.data.buildings.activity_users, getCount)
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
    const margin = stripUnit(sassVars.monthMargin)
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
        <Histogram className={styles.histogram} {...{ data, max, margin }} />
      </div>
    )
  }
}

export default function topContributors (selector, options) {
  return mountComponent(DailyActivity, selector, options)
}
