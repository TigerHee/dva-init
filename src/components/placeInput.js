import React from 'react'
import { connect } from 'dva'
import { Flex, WingBlank, WhiteSpace, InputItem } from 'antd-mobile'
import HeaderCom from './common/headerCom'
import PlaceSelectDefault from '../components/placeSelectDefault'
import PlaceSelect from '../components/placeSelect'
import styles from '../assets/css/searchItem.less'
import { query } from '../services/service'

class PlaceInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: props.show,
      showDefault: true,
      value: '',
      cities: []
    }
    this.inputChange = this.inputChange.bind(this)
    this.closePopup = this.closePopup.bind(this)
  }
  // props 更新时调用
  UNSAFE_componentWillReceiveProps(nextState) {
    if (nextState.show !== this.state.show) {
      this.setState({
        show: nextState.show
      })
    }
  }
  // 第一次渲染完成调用
  componentDidMount() {
  }
  closePopup() {
    this.props.onClose()
  }
  inputChange(val) {
    // 输入内容长度大于3搜索
    if (val.length >= 3) {
      query({
        codes: val
      }).then(res => {
        if (res.data.code === 100) {
          this.setState({
            cities: res.data.cities
          })
        } else {
          this.setState({
            cities: []
          })
        }
      })
    } else {
      this.setState({
        cities: []
      })
    }
    this.setState({
      value: val
    })
    // 字符长度为0显示默认
    this.setState({
      showDefault: val === '' ? true : false
    })
  }
  render() {
    let placeholder = this.props.name === 'from' ? 'From City or Airport' : 'To City or Airport';
    let Select = this.state.showDefault ? <PlaceSelectDefault name={this.props.name} /> : <PlaceSelect name={this.props.name} cities={this.state.cities} onClose={() => { this.closePopup() }} />
    return (
      <Flex
        direction="column"
        justify="start"
        style={this.state.show ? { transform: `translateY(-100%)` } : { transform: 'translateY(0)' }}
        className={styles.modal}>
        {/* input */}
        <div className={styles['place-input']}>
          <WingBlank>
            <HeaderCom callbackLeft={this.closePopup} titleText={'Select place'}></HeaderCom>
            <InputItem
              placeholder={placeholder}
              clear
              value={this.state.value}
              onChange={this.inputChange}
            />
          </WingBlank>
        </div>
        <WhiteSpace />
        {/* select area */}
        {Select}
      </Flex>
    )
  }
}

function mapStateToProps({ app }) {
  return {
    ipInfo: app.ipInfo,
  }
}

export default connect(mapStateToProps)(PlaceInput)