import { h } from 'preact'
import styles from './activity.scss'
import cx from 'classnames'

const Tabs = ({onClick, facets, facet}) => <div class={styles.tabs}>
  {Object.keys(facets).map(f => {
    return <span
      class={cx(styles.tab, {[styles['tab-selected']]: f === facet})}
      onClick={() => onClick(f)}>{facets[f]}</span>
  })}
</div>

export default Tabs
