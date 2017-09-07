import { h, Component } from 'preact'
import cx from 'classnames'

import styles from './dropdown.scss'

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.selectItem = this.selectItem.bind(this)
    this.close = this.close.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.state = {
      closed: true
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.handle, true)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handle, true)
  }

  handle = e => {
    const el = this.container
    if (!el.contains(e.target)) this.close(e)
  };

  toggleOpen () {
    this.setState({ closed: !this.state.closed })
  }

  close () {
    this.setState({ closed: true })
  }

  selectItem (item) {
    const { onSelect } = this.props
    onSelect(item)
    this.setState({ closed: true })
  }

  render () {
    const { options, selected, className } = this.props
    const { closed } = this.state
    return (
      <div
        class={cx(className, styles.dropdown)}
        ref={el => {
          this.container = el
        }}
      >
        <div onClick={this.toggleOpen} class={styles.label}>
          {options[selected]}
        </div>
        <ul
          style={{ zIndex: 2 }}
          class={cx(styles.options, { [styles['options-closed']]: closed })}
        >
          {Object.keys(options).map(g => {
            return (
              <li
                class={cx(styles.option, {
                  [styles['option-selected']]: g === selected
                })}
                onClick={() => this.selectItem(g)}
              >
                {options[g]}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Dropdown
