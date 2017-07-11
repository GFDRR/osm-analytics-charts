import { h, Component } from 'preact'
import cx from 'classnames'
import max from 'lodash/max'

import { mountComponent, percent } from 'utils'
import { percentWidth } from 'variables.scss'

import appStyles from 'styles.scss'
import styles from './contributors.scss'

class TopContributors extends Component {
  constructor (props) {
    super(props)

    this.formatContributors = this.formatContributors.bind(this)
  }

  formatContributors () {
    const { data } = this.props
    const top = 10

    const users = Object.keys(data).reduce(
      (allUsers, users) => allUsers.concat(data[users].top_users),
      []
    )
    const maxContributions = max(users.map(c => c.feature_value))

    const allUsers = users.map(c => ({
      name: c.osm_name,
      contributions: c.feature_value,
      percent: percent(c.feature_value, maxContributions, 1)
    }))

    return {
      top: allUsers.slice(0, top),
      remaining: allUsers.length - top
    }
  }

  render () {
    const { width } = this.props
    const { top, remaining } = this.formatContributors()

    return (
      <div style={{ width }} class={cx(styles.contributors, appStyles.viz)}>
        <div class={cx(styles['header'], appStyles.heading)}>
          <div class={cx(styles.title, appStyles.title)}>Top contributors</div>
        </div>
        <ul class={styles['list']}>
          {top.map(c =>
            <li class={styles['list-items']}>
              <span class={cx(styles['name'], { [styles['local']]: c.local })}>
                {c.name}
              </span>
              <div class={cx(styles['percent'])}>
                <div
                  style={{
                    width: `calc(${Math.round(c.percent)}% - ${percentWidth})`
                  }}
                  class={cx(styles['percent-bar'])}
                />
                <span class={cx(styles['percent-nr'])}>
                  {c.percent}%
                </span>
              </div>
            </li>
          )}
        </ul>
        <div class={styles['remaining']}>
          + {remaining} More
        </div>
      </div>
    )
  }
}

export default function topContributors (selector, options) {
  return mountComponent(TopContributors, selector, options)
}
