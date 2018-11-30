import React from 'react'
import { connect } from 'dva'
import { Flex } from 'antd-mobile'
import PlaceInput from '../components/placeInput'
import styles from '../assets/css/searchItem.less'

class Place extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFrom: false,
      showTo: false,
      fromCityAirport: {},
      toCityAirport: {}
    }
  }
  // props 更新时调用
  UNSAFE_componentWillReceiveProps(nextState) {
    this.setState({
      fromCityAirport: nextState.fromCityAirport,
      toCityAirport: nextState.toCityAirport
    })
  }
  render() {
    return (
      <Flex justify="between" align="end" className={styles.place}>
        {/* from */}
        {
          (() => {
            if (!this.state.fromCityAirport.name) {
              return (
                <div className={styles.from} onClick={() => { this.setState({ 'showFrom': !this.state.showFrom }) }}>
                  Form
                </div>
              )
            } else {
              return (
                <div className={styles.selected} onClick={() => { this.setState({ 'showFrom': !this.state.showFrom }) }}>
                  <p className={styles['selected-city']}>{this.state.fromCityAirport.name}</p>
                  <p className={styles['selected-code']}>{this.state.fromCityAirport.countryCode}, {this.state.fromCityAirport.airports[this.state.fromCityAirport.selectIndex].code}</p>
                </div>
              )
            }
          })()
        }
        {/* exchange from and to */}
        <span className={`${styles.exchange} iconfont icon-return`}></span>
        {/* to */}
        {
          (() => {
            if (!this.state.toCityAirport.name) {
              return (
                <div className={styles.to} onClick={() => { this.setState({ 'showTo': !this.state.showTo }) }}>
                  To
                </div>
              )
            } else {
              return (
                <div className={styles.selectedTo} onClick={() => { this.setState({ 'showTo': !this.state.showTo }) }}>
                  <p className={styles['selected-city']}>{this.state.toCityAirport.name}</p>
                  <p className={styles['selected-code']}>{this.state.toCityAirport.countryCode}, {this.state.toCityAirport.airports[this.state.toCityAirport.selectIndex].code}</p>
                </div>
              )
            }
          })()
        }
        <PlaceInput show={this.state.showFrom} name="from" onClose={() => { this.setState({ showFrom: false }) }}></PlaceInput>
        <PlaceInput show={this.state.showTo} name="to" onClose={() => { this.setState({ showTo: false }) }}></PlaceInput>
      </Flex>
    )
  }
}
function mapStateToProps({ app }) {
  return {
    fromCityAirport: app.fromCityAirport,
    toCityAirport: app.toCityAirport
  }
}
export default connect(mapStateToProps)(Place)