import React from 'react'

export default class AText extends React.PureComponent {
  componentDidMount () {
    if (!this.props.animated) return
    this.onEnd = this.props.onAnimationEnd || (() => ({}))
    this.div.style.height = `${this.div.clientHeight}px`
    this.div.style.opacity = 1
    this.div.innerText = ''

    const letters = this.props.text.split('')
    let text = ''
    let id = 0

    const spm = 2000
    let lastUpdate = 0

    const timeHandler = time => {
      if (id >= letters.length) {
        this.terminateAnimation()
        return
      }

      if (time - lastUpdate >= 60000 / spm) {
        text += letters[id++]
        this.div.innerText = text
        lastUpdate = time
      }

      this.timerId = window.requestAnimationFrame(timeHandler)
    }

    timeHandler()
  }

  componentWillUnmount () {
    this.terminateAnimation()
  }

  terminateAnimation () {
    if (this.timerId) {
      this.onEnd()
      window.cancelAnimationFrame(this.timerId)

      this.div.innerText = this.props.text
    }
  }

  render () {
    const { text, animated } = this.props

    return (
      <div
        style={{opacity: animated ? 0 : 1}}
        ref={c => { this.div = c }}
      >
        { text }
      </div>
    )
  }

  componentDidUpdate (nextProps) {
    if (nextProps.animated && this.props.animated !== nextProps.animated) {
      this.terminateAnimation()
    }
  }
}
