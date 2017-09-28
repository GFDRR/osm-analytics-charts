import { h, Component } from 'preact'
import { mountComponent } from 'utils'

class InlineStat extends Component {
  formatStat () {
    const { data, featureType, stat } = this.props
    const rootValue = data[featureType]
    const value =
      stat === 'users' ? rootValue.users_length : rootValue.total_feature_value
    return value
  }

  render () {
    let value = this.formatStat()
    return (
      <span>
        {value}
      </span>
    )
  }
}

export default function inlineStat (selector, options) {
  return mountComponent(InlineStat, selector, options)
}
