import React from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Flex, Calendar, WhiteSpace, Button } from 'antd-mobile';
import { dateFormat } from '../assets/js/public'
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import styles from '../assets/css/searchItem.less'
require('../assets/css/calendar.less')

class CalendarSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      calendarShow: false,
      depart: '',
      return: ''
    }
    this.header = this.header.bind(this)
    this.selectDate = this.selectDate.bind(this)
  }
  showCalendar () {
    this.setState({
      calendarShow: true
    })
  }
  closeCalendar () {
    this.setState({
      calendarShow: false
    })
  }
  getDateExtra () {
    return {'2018/08/11': { info: 'Depart'}}
  }
  header () {
    return (
      <div>
        <div className={styles.calendarHeader}>
          <span onClick={() => {this.closeCalendar()}} className={`icon-outline-close-px iconfont ${styles.calendarClose}`}></span>
          <p className={styles.calendarHeaderDate}>
            {
              (() => {
                if (this.state.depart !== '') {
                  return <span className={styles.selectedDate}>{new dateFormat(this.state.depart).format('week date month')}</span>
                } else {
                  return <span>Depart Date</span>
                }
              })()
            }
            {
              (() => {
                if (this.state.return !== '') {
                  return <span className={styles.selectedDate}>{new dateFormat(this.state.return).format('week date month')}</span>
                } else {
                  return <span>Return Date</span>
                }
              })()
            }
          </p>
        </div>
        <WhiteSpace style={{background: '#fafafa'}}/>
      </div>
    )
  }
  selectDate (date) {
    if (this.state.depart === '') {
      this.setState({
        depart: date
      })
    } else {
      this.setState({
        return: date
      })
    }
  }
  goResult () {
    this.props.dispatch({
      type: 'app/updateState',
      payload: {
        departDate: this.state.depart,
        returnDate: this.state.return
      }
    })
    let depart = this.state.depart
    let Return = this.state.return
    let type = this.state.return === '' ? 1 : 2
    let from = `C${this.props.fromCityAirport.airports[this.props.fromCityAirport.selectIndex].code}`
    let to = `C${this.props.toCityAirport.airports[this.props.toCityAirport.selectIndex].code}`
    let outBoundDate = depart.getFullYear().toString() + (depart.getMonth() + 1).toString() + depart.getDate().toString()
    let returnDate = Return.getFullYear().toString() + (Return.getMonth() + 1).toString() + Return.getDate().toString()
    let search = `?num=1,0,0,E&type=${type}&Outbound=${from}-${outBoundDate}-${to}`
    if (type === 2) {
      search += `&Return=${to}-${returnDate}-${from}`
    }
    this.props.dispatch(
      routerRedux.push({
        search,
        pathname: '/result',
      })
    )
  }
  render () {
    let now = new Date()
    return (
      <Flex justify="between" align="end" className={styles.place} onClick={() => {this.showCalendar()}}>
        <div className={styles.from}>Depart Date</div>
        <div style={{alignSelf: 'center'}}>—</div>
        <div className={styles.to}>Return Date</div>
        <Calendar 
          renderHeader={this.header}
          prefixCls="tb-calendar"
          onCancel={() => {this.closeCalendar()}}
          locale={enUS} 
          defaultDate={now}
          visible={this.state.calendarShow} 
          onSelect={this.selectDate}
          // getDateExtra={this.getDateExtra}
          minDate={now}
          maxDate={new Date(+now + 1000 * 60 * 60 * 24 * 350)}/>
        {
          (() => {
            if (this.state.calendarShow) {
              return (
                <div style={{position: 'fixed',bottom: '1rem', zIndex: '1000', width: '100%', left: '0', display: 'flex', justifyContent: 'center'}}>
                  <Button className={styles.calendarBtn} onClick={() => {this.goResult()}} type="primary">Search</Button>
                </div>
              )
            }
          })()
        }
      </Flex>
    )
  }
}
function mapStateToProps ({ app }) {
  return {
    fromCityAirport: app.fromCityAirport,
    toCityAirport: app.toCityAirport
  }
}
export default connect(mapStateToProps)(CalendarSelect)