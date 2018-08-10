import React from 'react'
import { connect } from 'dva'
import styles from '../assets/css/searchItem.less'
import { Button, Flex } from 'antd-mobile'

class PlaceSelectDefault extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const hotCities = ['Toronto', 'Tokyo', 'Newyork', 'Shanghai', 'Beijing']
    return (
      <div className={`${styles['place-select']}`}>
        {/* 定位 location */}
        <div className={styles['place-select-item']}>
          <p style={{marginBottom: '0.5rem', fontWeight: '400'}}>Location</p>
          <Button inline className={styles.selectBtn} style={{width: '6.875rem'}}>
            <span className="icon-round-location_on- iconfont" style={{color: '#FFA900'}}></span>
            <span>{this.props.ipInfo.city}</span>
          </Button>
        </div>
        {/* 历史记录 history */}
        <div className={styles['place-select-item']}>
          <p style={{marginBottom: '0.5rem', fontWeight: '400'}}>History</p>
        </div>
        {/* 热门城市 Popular Destinations  */}
        <div className={styles['place-select-item']}>
          <p style={{marginBottom: '0.5rem', fontWeight: '400'}}>Popular Destinations</p>
          <Flex wrap="wrap" justify="around">
            {
              hotCities.map(city => {
                return <Button inline className={styles.selectBtn} key={city} style={{width: '6.875rem', marginBottom: '0.5rem'}}>{city}</Button>
              })
            }
          </Flex>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ app }) {
  return {
    ipInfo: app.ipInfo,
  }
}

export default connect(mapStateToProps)(PlaceSelectDefault)