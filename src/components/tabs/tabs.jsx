import { h } from 'preact'
import cx from 'classnames'

import styles from './tabs.scss'

const Tabs = ({ tabs, selected, onClick, className }) =>
  <div class={styles.tabs}>
    {Object.keys(tabs).map(f => {
      return (
        <span
          class={cx(className, styles.tab, {
            [styles['tab-selected']]: f === selected
          })}
          onClick={() => onClick(f)}
        >
          {tabs[f]}
        </span>
      )
    })}
  </div>

export default Tabs
