import { h, Component } from 'preact'
import cx from 'classnames'

import { mountComponent } from 'utils'

import appStyles from 'styles.scss'
import Tabs from './tabs'
import Dropdown from './dropdown'
import styles from './activity.scss'

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
      facet: 'u'
    }
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

    return (<div style={{ width }} class={cx(styles.da, appStyles.viz)}>
      <Dropdown onSelect={this.updateGranularity} {...{granularities, granularity}} />
      <Tabs onClick={this.updateFacet} {...{facets, facet}} />
    </div>)
  }
}

export default function topContributors (selector, options) {
  return mountComponent(DailyActivity, selector, options)
}
