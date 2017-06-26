import { h, Component } from 'preact'
import cx from 'classnames'
import max from 'lodash/max'
import { mountComponent, percent } from 'utils'
import Tabs from 'components/tabs'

import contributors from 'public/mocks/contributors.json'
import { USER_SCOPES } from 'src/constants'
import { percentWidth } from 'variables.scss'

import appStyles from 'styles.scss'
import styles from './contributors.scss'

class TopContributors extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userScope: 'all'
    }

    this.updateUserScope = this.updateUserScope.bind(this)
    this.formatContributors = this.formatContributors.bind(this)
  }

  formatContributors () {
    const maxContributions = max(contributors.map(c => c.num_features))
    return contributors.map(c => ({
      name: c.name,
      contributions: c.num_features,
      local: (c.is_local > 0.8),
      percent: percent(c.num_features, maxContributions, 1)
    }))
  }

  updateUserScope (userScope) {
    this.setState({
      ...this.state,
      userScope
    })
  }

  render () {
    const { width } = this.props
    const { userScope } = this.state
    const contributors = this.formatContributors()

    return (
      <div style={{ width }} class={cx(styles.contributors, appStyles.viz)}>
        <div class={cx(styles['header'], appStyles.heading)}>
          <div class={cx(styles.title, appStyles.title)}>Top contributors</div>
          <Tabs
            onClick={this.updateUserScope}
            {...{ tabs: USER_SCOPES, selected: userScope }}
          />
        </div>
        <ul class={styles['contributor-list']}>{contributors.map(c =>
          <li styles={styles['contributor-item']}>
            <span class={cx(styles['name'], {[styles['local']]: c.local})}>
              {c.name}
            </span>
            <div class={cx(styles['percent'])}>
              <div
                style={{width: `calc(${Math.round(c.percent)}% - ${percentWidth})`}}
                class={cx(styles['percent-bar'])}
              />
              <span class={cx(styles['percent-nr'])}>{c.percent}%</span>
            </div>
          </li>
        )}</ul>
      </div>
    )
  }
}

export default function topContributors (selector, options) {
  return mountComponent(TopContributors, selector, options)
}
