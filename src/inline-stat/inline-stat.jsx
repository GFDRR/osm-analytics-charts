import { Component } from 'preact'
import { mountComponent } from 'utils'

class InlineStat extends Component {
  formatStat () {
    const { data, featureType, stat } = this.props
    const rootValue = data[featureType]
    const value =
      stat === 'users' ? rootValue.users_length : rootValue.total_feature_value
    const unit = featureType === 'buildings' || stat === 'users' ? null : 'km'
    return { value, unit }
  }

  render () {
    const formattedStat = this.formatStat()
    return formattedStat.value
  }
}

export default function inlineStat (selector, options) {
  return mountComponent(InlineStat, selector, options)
}
