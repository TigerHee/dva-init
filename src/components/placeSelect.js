import React from 'react'
import { connect } from 'dva'
import styles from '../assets/css/searchItem.less'

class PlaceSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cities: props.cities
    }
  }
  // props 更新时调用
  UNSAFE_componentWillReceiveProps (nextState) {
    // TODO: 判断cities是否相等
    this.setState({
      cities: nextState.cities
    })
  }
  selectAirport (city, index) {
    city.selectIndex = index
    let key = this.props.name === 'from' ? 'fromCityAirport' : 'toCityAirport'
    this.props.dispatch({
      type: 'app/updateState',
      payload: {
        [key]: city
      }
    })
    this.props.onClose()
  }
  render () {
    return (
      <div className={`${styles['place-select']}`}>
        {
          this.state.cities.map(city => {
            return (
              <div key={city.name}>
                <p>
                  <span className="icon-outline-tune-px iconfont"></span>
                  <span>{city.name}, {city.countryName}</span>
                </p>
                {
                  city.airports.map((airport, index) => {
                    return (
                      <p onClick={() => {this.selectAirport(city, index)}} key={airport.code} style={{padding: '0 1.25rem', lineHeight: '2rem'}}>
                        <span className="icon-round-location_on- iconfont"></span>
                        <span>{airport.code}, {airport.name}</span>
                      </p>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps ({ app }) {
  return {
    ipInfo: app.ipInfo,
  }
}

export default connect(mapStateToProps)(PlaceSelect)