import { h, Component } from 'preact'
import cx from 'classnames'

import { mountComponent } from 'utils'

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
    // data.buildings.experiences.map(d => console.log(d))
    // const max = Math.max(...data.top_users.map(u => u.num_features))
    // // const max = Math.max(...data.top_users.map(u => u.num_features))
    // return data.top_users.map(u => {
    //   const user = {
    //     features: u.num_features,
    //     name: u.name,
    //     local: u.is_local,
    //     max
    //   }
    //   return user
    // })
    return histogramUsers.slice(0, 6)
  }

  formatFeatures (data) {
    // return data.top_users.map(u => {
    //   const feature = {
    //     features: u.num_features,
    //     name: u.name,
    //     local: u.isLocal
    //   }
    //   return feature
    // })
    return histogramFeatures.slice(0, 6)
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

  render () {
    const { width } = this.props
    const { facets, facet, granularity, granularities } = this.state
    const data = this.state[facets[facet]]

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
        <Histogram className={styles.histogram} {...{ data, margin: 2 }} />
      </div>
    )
  }
}

export default function topContributors (selector, options) {
  return mountComponent(DailyActivity, selector, options)
}
