import { h } from 'react'
import styles from './loader-styles'

const Loader = ({ width, height }) =>
  <div style={{ width, height }} className={styles.loader} />

export default Loader
