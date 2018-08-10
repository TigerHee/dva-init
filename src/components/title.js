import React from 'react'
import { routerRedux } from 'dva/router'
import styles from '../assets/css/title.less'

class Title extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      back: props.back,
      close: props.close,
      name: props.name
    }
    this.backClick = this.backClick.bind(this)
    this.closeClick = this.closeClick.bind(this)
  }
  backClick () {
    routerRedux.goBack()
  }
  closeClick () {
    this.props.onClose({stateName: 'showDate', status: false})
  }
  render () {
    let handleElement = null
    if (this.state.back && !this.state.close) {
      handleElement = <div className={styles['title-contain-handle']} onClick={this.backClick.bind(this)}>Back</div>
    } else if (!this.state.back && this.state.close) {
      handleElement = <div className={styles['title-contain-handle']} onClick={this.closeClick.bind(this)}>Close</div>
    }
    return (
      <div className={`${styles['title-contain']} navBar`}>
        {handleElement}
        <div className={styles['title-contain-name']}>{this.state.name}</div>
      </div>
    )
  }
}

export default Title;