function preFixInt(num, length) {//数字前面补0
  return (Array(length).join('0') + num).slice(-length);
}
/**
 *
 * @class dateFormat
 */
class dateFormat {
  constructor(date) {
    if (date.length === 12) {
      date = date.substr(0, 4) + '/' + date.substring(4, 6) + '/' + date.substring(6, 8) + ' ' + date.substring(8, 10) + ':' + date.substring(10, 12)
    }
    date = new Date(date)
    this.year = date.getFullYear()
    this.month = preFixInt(date.getMonth() + 1)
    this.date = preFixInt(date.getDate())
    this.day = date.getDay()
    this.hours = preFixInt(date.getHours())
    this.min = preFixInt(date.getMinutes())
    this.second = preFixInt(date.getSeconds())
    this.AP = date.getHours() < 12 ? 'AM' : 'PM'
  }
  format(formatStr) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let returnStr = ''
    switch (formatStr) {
    case 'YYYY-MM-DD hh:mm:ss':
      returnStr = this.year + '-' + this.month + '-' + this.date + ' ' + this.hours + ':' + this.min + ':' + this.second
      break
    case 'YYYY/MM/DD':
      returnStr = this.year + '/' + this.month + '/' + this.date
      break
    case 'YYYY/EN/DD':
      returnStr = this.year + '/' + months[this.month - 1] + '/' + this.date
      break
    case 'YYYY/MM':
      returnStr = this.year + '/' + this.month
      break
    case 'DD/MM/YYYY':
      returnStr = this.date + '/' + this.month + '/' + this.year
      break
    case 'week month date':
      let v = 'th'
      if (this.date === 3) v = 'rd'
      if (this.date === 2) v = 'nd'
      if (this.date === 1) v = 'st'
      returnStr = weeks[this.day] + ' ' + months[this.month - 1] + ' ' + this.date + v
      break
    case 'time 24h':
      returnStr = `${preFixInt(this.hours)}:${preFixInt(this.min)}`
      break
    case 'time APM':
      returnStr = preFixInt(parseInt(this.hours > 12 ? this.hours - 12 : this.hours === 0 ? 12 : this.hours)) + ':' + this.min + ' ' + this.AP
      break
    case 'week time APM':
      returnStr = weeks[this.day] + ' ' + preFixInt(parseInt(this.hours > 12 ? this.hours - 12 : this.hours === 0 ? 12 : this.hours)) + ':' + this.min + ' ' + this.AP
      break
    case 'time str twelve':
      returnStr = ('' + this.year + this.month + this.date + this.hours + this.min)
      break
    case 'month date':
      returnStr = months[this.month - 1] + ' ' + this.date
      break
    case 'detail month date':
      returnStr = months[this.month - 1] + ', ' + this.date + (this.date === 1 ? 'st' : this.date === 2 ? 'nd' : this.date === 3 ? 'rd' : 'th')
      break
    case 'week date month':
      returnStr = `${weeks[this.day]} ${this.date} ${months[this.month - 1]}`
      break
    case 'month date':
      returnStr = `${months[this.month - 1]} ${this.date}`
      break
    case 'filter takeoff':
      returnStr = Number(this.hours) + this.min/60
      break
    default:
      console.warn('没有该format格式')
      break
    }
    return returnStr
  }
}

export {
  dateFormat,
  preFixInt
}