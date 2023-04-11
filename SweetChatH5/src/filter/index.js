import moment from 'moment'
const renderStateIcon = (text, color) => {
  return `<i class="iconfont icon-dian" style="color:${color};font-size:26px;vertical-align: -0.18em" ></i><span style="color:${
    color === '#999' ? color : ''
  }">${text}</span>`
}
/**
 * 格式化时间
 * @param time
 * @param format
 * @returns {*}
 */
export function timeFormat(time, format) {
  if (!time) return ''
  format = format != null ? format : 'YYYY-MM-DD HH:mm'
  return moment(time).format(format)
}
const color = {
  error: '#ff4140',
  success: '#52C41A',
  info: '#5094f3',
  warning: '#f5a623',
  default: '#ccc'
}
/**
 *
 * @param {*} type
 * //专辑类型 (1图文2音频3视频)
 */
export function topicType(type) {
  let text = ''
  switch (parseInt(type)) {
    case 1:
      text = '图文'
      break
    case 2:
      text = '音频'
      break
    case 3:
      text = '视频'
      break
  }
  return text
}

/**
 *
 * @param {*} status
 * album 专辑
 */

export function albumState(state) {
  if (Number(state) === 0) {
    return renderStateIcon('审核中', color.warning)
  } else if (Number(state) === 1) {
    return renderStateIcon('连载中', color.info)
  } else if (Number(state) === 2) {
    return renderStateIcon('未通过', color.error)
  } else if (Number(state) === 3) {
    return renderStateIcon('已完结', color.default)
  }
}

export function albumInfoState(state) {
  if (Number(state) === 0) {
    return renderStateIcon('审核中', color.warning)
  } else if (Number(state) === 1) {
    return renderStateIcon('未通过', color.error)
  } else if (Number(state) === 2) {
    return renderStateIcon('已发布', color.default)
  }
}

/**
 *
 * @param {免费live} state
 */
export function freeLiveState(state) {
  if (Number(state) === 0) {
    return renderStateIcon('已结束', color.default)
  } else if (Number(state) === 1) {
    return renderStateIcon('进行中', color.success)
  } else if (Number(state) === 2) {
    return renderStateIcon('被封禁', color.error)
  } else if (Number(state) === 3) {
    return renderStateIcon('异常关闭', color.warning)
  }
}


/**
 *
 * @param {答疑室} state
 */
export function answeringState(state) {
  if (Number(state) === 1) {
    return renderStateIcon('进行中', color.success)
  } else if (Number(state) === 2) {
    return renderStateIcon('已结束', color.default)
  }
}


/**
 *
 * @param {付费live} state
 * @param {*} serial_state
 */
export function payLiveState(state, serial_state) {
  if (Number(state) === 0) {
    return renderStateIcon('审核中', color.warning)
  } else if (Number(state) === 1) {
    return renderStateIcon('连载中', color.warning)
  } else if (Number(state) === 2) {
    return renderStateIcon('审核失败', color.error)
  } else if (Number(state) === 3) {
    return renderStateIcon('未开始', color.success)
  } else if (Number(state) === 4) {
    return renderStateIcon('已完结', color.default)
  }
}

/**
 *
 * @param {自习室} state
 */
export function learningRoomState(state) {
  if (Number(state) === 0) {
    return renderStateIcon('未开始', color.error)
  } else if (Number(state) === 1) {
    return renderStateIcon('开放中', color.info)
  } else if (Number(state) === 2) {
    return renderStateIcon('已结束', color.default)
  } else if (Number(state) === 3) {
    return renderStateIcon('被封禁', color.error)
  } else if (Number(state) === 4) {
    return renderStateIcon('未支付', color.warning)
  }
}
/**
 *
 * @param {付费live详情} state
 */
export function payLiveInfoState(state, startTime) {
  if (Number(state) === 0) {
    return relativeTime(startTime)
    // return renderStateIcon('未开始', color.error)
  } else if (Number(state) === 1) {
    return renderStateIcon('直播中', color.info)
  } else if (Number(state) === 2) {
    return renderStateIcon('已结束', color.default)
  }
}
/**
 *
 * @param {*} status
 * 1.进行中 2.已结束
 */
export function answerQuestionsStatus(status) {
  let text = ''
  switch (parseInt(status)) {
    case 1:
      text = '进行中'
      break
    case 2:
      text = '已结束'
      break
  }
  return text
}

export function timeWrap(time, format = 'YYYY-MM-DD HH:mm') {
  const t = moment(time)
    .format(format)
    .split(' ')
  if (t[0] === 'Invalid') {
    return '-'
  } else {
    return `${t[0]} ${t[1]}`
  }
}
/**
 *
 * @param {*} durationTime
 * 单位秒
 */
export function formatrTime(durationTime) {
  if (durationTime < 3600) {
    return (parseFloat(durationTime) / 60).toFixed(1) + '分钟'
  } else {
    return (parseFloat(durationTime) / 3600).toFixed(1) + '小时'
  }
}

export function toFixed(s) {
  return Number(s).toFixed(2)
}
export function relativeTime(relativeTime) {
  const rt = moment(relativeTime).valueOf()
  const ct = moment().valueOf()
  const dt = ct - rt
  const s = 1000
  const m = 60 * s
  const h = 60 * m
  if (dt > 24 * h) {
    return `已超时${parseInt(dt / (24 * h))}天`
  } else if (dt > h) {
    return `已超时${parseInt(dt / h)}小时`
  } else if (dt > m) {
    return `已超时${parseInt(dt / m)}分钟`
  } else if (-dt > 24 * h) {
    return `${parseInt(-dt / (24 * h))}天后直播`
  } else if (-dt > h) {
    return `${parseInt(-dt / h)}小时后直播`
  } else if (-dt > m) {
    return `${parseInt(-dt / m)}分钟后直播`
  } else {
    return renderStateIcon('未开始', color.error)
  }
}
/**
 * 时间格式化
 * @param time
 * @returns {*}
 */
export function timeHour(time) {
  let times = Number(time)
  if (times < 3600) {
    return times / 60 + '分钟'
  } else {
    return times / 3600 + '小时'
  }
}


export function progressingTypeName(type, album_type) {
  let typeName = ''
  switch (parseInt(type)) {
    case 1:
      typeName = '付费Live'
      break
    case 2:
      typeName = '免费Live'
      break
    case 3:
      typeName = '答疑室'
      break
    case 4:
      if (album_type == 1) typeName = '图文专辑'
      if (album_type == 2) typeName = '音频专辑'
      if (album_type == 3) typeName = '视频专辑'
      break
    case 5:
      typeName = '自习室'
      break
  }
  return typeName
}
export function manageLiveType(type) {
  let typeName = ''
  switch (Number(type)) {
    case 1:
      typeName = '图文专辑'
      break
    case 2:
      typeName = '音频专辑'
      break
    case 3:
      typeName = '视频专辑'
      break
    case 4:
      typeName = '付费Live'
      break
    case 14:
      typeName = '付费Live'
      break
  }
  return typeName
}
export function payWay(type) {
  let payWay = ''
  switch (Number(type)) {
    case 1:
      payWay = '支付宝'
      break
    case 2:
      payWay = '微信'
      break
    case 3:
      payWay = '余额'
      break
    case 4:
      payWay = '苹果'
      break
  }
  return payWay
}
export function withdrawStatus(type) {
  let payWay = ''
  switch (Number(type)) {
    case 0:
      payWay = '提现中'
      break
    case 1:
      payWay = '已提现'
      break
    case 2:
      payWay = '提现失败'
      break
  }
  return payWay
}
//账单分类
export function billType(type) {
  let billType = ''
  switch (Number(type)) {
    case 1:
      billType = '赞助自习室'
      break
    case 2:
      billType = '举办Live'
      break
    case 3:
      billType = '申请认证'
      break
  }
  return billType
}
