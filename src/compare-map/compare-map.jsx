import { h } from 'preact'
// import cx from 'classnames'

import { mountComponent } from 'utils'
// import appStyles from 'styles.scss'
// import styles from './top-contributors.scss'

const CompareMap = ({ width, height }) => {
  console.log(width, height)
  return (
    <iframe
      scrolling="no"
      style={{ width, height, border: 0 }}
      src="http://localhost:3000/#/compare/polygon:ifv%7BDndwkBx%60%40aYwQev%40sHkPuf%40ss%40%7BfA_%40uq%40xdCn%7D%40%5E/2010...now/buildings/embed"
    />
  )
}

export default function topContributors (selector, options) {
  return mountComponent(CompareMap, selector, options)
}
