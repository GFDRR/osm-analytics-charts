import React, { PropTypes } from 'react'
import cx from 'classnames'

import { mountComponent } from 'utils'
import appStyles from 'styles.scss'
import styles from './top-contributors.scss'

const TopContributors = ({ width }) =>
  <div style={{ width }} className={cx(styles.tc, appStyles.viz)}>Top contributors</div>

TopContributors.propTypes = {
  width: PropTypes.string
}

export default function topContributors (selector, options) {
  return mountComponent(TopContributors, selector, options)
}
