/*
 * @Page: Do not edit
 * @Version: Do not edit
 * @Autor: Do not edit
 * @Date: 2021-09-06 13:55:15
 * @LastEditors: YueAo7
 * @LastEditTime: 2021-09-14 15:03:06
 */
function change(t) {
  if (t < 10) {
    return "0" + t;
  } else {
    return t;
  }
}

export const formatNowTime = () => {
  let d = new Date();
  let year = d.getFullYear();
  let month = change(d.getMonth() + 1);
  let day = change(d.getDate());
  let hour = change(d.getHours());
  let minute = change(d.getMinutes());
  let second = change(d.getSeconds());
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
};

export const formatToday = () => {
  let d = new Date();
  let year = d.getFullYear();
  let month = change(d.getMonth() + 1);
  let day = change(d.getDate());
  return year + "-" + month + "-" + day;
};

export const oneDayTime = 1000 * 60 * 60 * 24;
export const formatThisDay = (date = new Date()) => {
  return regFormatDate(date, "YYYY-MM-DD");
};
//返回Y年M月D天，D=0时返回M-1月的最后一天，M=0时返回Y-1年的最后一月的D天
export const getMonth = (Y, M, D = 1) => {
  return new Date(Y, M - 1, D);
};
//返回以今天为基数向offset偏移的星期weekDay的日期
export const getWeek = (offset, weekDay = null) => {
  let thisDay = new Date().getDay();
  let weekStartDayTime = getOffsetDay(-thisDay).getTime();
  weekDay != null || (weekDay = thisDay);
  return new Date(weekStartDayTime - (-7 * offset - weekDay) * oneDayTime);
};
export const getOffsetDay = (offset = 0, date = new Date()) => {
  return new Date(date.getTime() + offset * oneDayTime);
};
export const regFormatDate = (
  date = new Date(),
  formatStr = "YYYY/MM/DD hh:mm"
) => {
  formatStr = formatStr.replace("YYYY", date.getFullYear());
  formatStr = formatStr.replace("MM", change(date.getMonth() + 1));
  formatStr = formatStr.replace("DD", change(date.getDate()));
  formatStr = formatStr.replace("hh", change(date.getHours()));
  formatStr = formatStr.replace("mm", change(date.getMinutes()));
  formatStr = formatStr.replace("ss", change(date.getSeconds()));
  return formatStr;
};

/**
 * 获取某年某月共有多少天
 * @param {Number} year
 * @param {Number} month
 * @returns {Number}
 */
export const daysInMonth = (year, month) => {
  let days = 31;
  if (month == 4 || month == 6 || month == 9 || month == 11) {
    days = 30;
  } else if (month == 2) {
    if (!(year % 400) || (!(year % 4) && year % 100)) {
      days = 29;
    } else {
      days = 28;
    }
  }
  return days;
};

export const allDays = (year) => {
  year = Number(year)
  let leapYear = false, sum_day = 0, month_arr = [4, 6, 9, 11];
  if (year % 100 === 0) { // 年份是整百
      leapYear = year % 400 === 0 
  } else {
      leapYear = year % 4 === 0
  }
  // 下面计算每个月的天数
  for (let i = 1; i < 13; i++) {
      if (i === 2) {
          sum_day += leapYear ? 29 : 28
      } else if (month_arr.includes(i)) {
          sum_day += 30
      } else {
          sum_day += 31
      }
  }
  return sum_day
}

/**
* 通过时间戳获取相对时间
* @param {时间戳} timeStamp
*/
export const relativeTime = (timeStamp) => {
  var timeDate = new Date(timeStamp)  
  var year = timeDate.getFullYear()
  var month = timeDate.getMonth() + 1
  var leaveSecond = Math.ceil((new Date().getTime() - timeStamp) / 1000)
  if (leaveSecond > 60) { // 大于60秒
    if (leaveSecond > 3600) {  // 大于60分钟
      if (leaveSecond > (3600 * 24)) { // 大于24小时
        if (leaveSecond > (3600 * 24 * daysInMonth(year, month))) { // 大于一个月
          if (leaveSecond > (3600 * 24 * daysInMonth(year, month) * 12)) { // 大于一年
            return  Math.floor(leaveSecond / (3600 * 24 * daysInMonth(year, month) * 12 )) + "年前"
          } else {
            return  Math.floor(leaveSecond / (3600 * 24 * daysInMonth(year, month))) + "月前"
          }
        } else {
          return  Math.floor(leaveSecond / (3600 * 24) ) + "天前"
        }
      } else {
        return  Math.floor(leaveSecond / 3600) + "小时前"
      }
    } else {
      return  Math.floor(leaveSecond / 60) + "分钟前"
    }
  } else {
    return  "刚刚发布"
  }
};
