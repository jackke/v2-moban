import Vue from 'vue'


Vue.prototype.$changeTime = {
    createTimeFn
  }
// 时间类型转换
function createTimeFn(row, column, value){
    if (value){
        let date = new Date(value).toLocaleString()
        return date.replace(/\//g,'-')
    } else {
        return ''
    }
}
// 表头合并
function _getSpanArr (data, propertyName) {
    var spanArr = [],
      pos = ''
    data.forEach((el, i, arr) => {
      if (i === 0) {
        spanArr.push(1)
        pos = 0
      } else {
        // 判断当前元素与上一个元素是否相同
        if (el[propertyName] === arr[i - 1][propertyName]) {
          spanArr[pos] += 1
          spanArr.push(0)
        } else {
          spanArr.push(1)
          pos = i
        }
      }
    })
    return spanArr
}

  Vue.prototype.$reg = {
    createTimeFn,
    _getSpanArr
  }