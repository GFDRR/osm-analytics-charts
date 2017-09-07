import { h, Component } from 'preact'

import styles from './tooltip.scss'

class Tooltip extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  hide = () => {
    this.setVisibility(false)
  }

  move = (e) => {
    if (e.target) {
      const tooltip = e.target.getAttribute('data-tooltip')
      if (tooltip !== null) {
        const tooltipArr = tooltip.split('|')
        if (tooltipArr.every(t => t !== '')) {
          this.setVisibility(true, tooltipArr, e.pageX, e.pageY)
        }
        return
      }
    }
    this.setVisibility(false)
  }

  setVisibility = (visible, content = [], x, y) => {
    this.setState(Object.assign({}, this.state, {
      visible,
      content,
      x,
      y
    }))
  }

  render () {
    const {props, state, hide, move, handleTouch} = this
    return (
      <div
        ref={el => { this.el = el }}
        onMouseLeave={hide}
        onMouseMove={move}
        onTouchStart={handleTouch}
        class={styles.wrapper}>
        {props.children}
        {
          state.visible &&
          <div class={styles.tooltip} style={{top: state.y, left: state.x}}>
            <div class={styles.content}>
              {state.content.map(t =>
                <div>{t}</div>
              )}
            </div>
            {/*
            <div ref="arrow" style={styles.arrow}> </div>
            <div ref="gap" style={styles.gap}> </div>
            */}
          </div>
        }
      </div>
    )
  }
}

export default Tooltip
