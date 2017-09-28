import { h, Component } from 'preact'
import { mountComponent } from 'utils'
import cx from 'classnames'

import appStyles from 'styles.scss'
import styles from './overall-stats.scss'

class OverallStats extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return <div className={cx(styles.overallStats, appStyles.viz)}>lala</div>
  }
}

export default function overallStats (selector, options) {
  return mountComponent(OverallStats, selector, options)
}
