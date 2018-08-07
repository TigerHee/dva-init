import React from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Link } from 'dva/router'
import styles from '../assets/css/IndexPage.less'
import { Button } from 'antd-mobile'

class homePage extends React.Component {
  goResult (props) {
    console.log(props)
    props.history.push('/result')
  }
  reduxGoResult (props) {
    props.dispatch(
      routerRedux.push({
        pathname: 'result',
        search: '?sdf=s78',
        state: {id: 31}
      })
    )
  }
  render () {
    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>this is home page</h1>
        <div className={styles.flex}>
          <span>路由跳转方式一：props.history</span>
          <Button onClick={() => {this.goResult(this.props)}}>Result Page</Button>
        </div>
        <div className={styles.flex}>
          <span>路由跳转方式二：Link</span>
          <Link to={{
            pathname: '/result',
            search: '?a=1&b=2',
            state: {
              id: 32
            }
          }}>Result Page</Link>
        </div>
        <div className={styles.flex}>
          <span>路由跳转方式三: routerRedux</span>
          <Button onClick={() => {this.reduxGoResult(this.props)}}>Result Page</Button>
        </div>
      </div>
    )
  }
}

export default connect()(homePage);
