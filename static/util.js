//获取一周内的日期和时间
/*
how to use
let time = util.formatDate(new Date());
let date=util.getDates(7, time);
let today=util.dateLater(time,0)
*/
//得到时间
const formatTime = date => {
  var hour = date.getHours()
  var minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//得到时间数组[年，月，日]
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day]

}
//todate默认参数是当前日期，可以传入对应时间 todate格式为2018-10-05
function getDates(days, todate) {
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}
function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.time = yearDate + '-' + month + '-' + dayFormate;
  dateObj.week = show_day[day];
  return dateObj;
}
//比较
function compare(s1, s2) {
  for (let i = 0; i < 5; i++) {
    if (s1[i] > s2[i]){
      return 1
    } else if (s1[i] < s2[i]) {
      return 0
    }
  }

  return 0
}

//获取时间对应的picker
function timePicker(date) {
  if (date == '周一' || '周二' || '周三' || '周四' || '周五')
    return 0;
  if (date == '周六')
    return 1;
  if (date == '周日')
    return 2;
}
function update_next(timeList) {
  let time = formatTime(new Date());
  console.log("now:",time)
  let when = "今日无剩余";

  if (timeList == undefined) {
    return {
      when: when
    }
  }
  if (!timeList.hasOwnProperty("length")) {
    return {
     when:when
    }
  }

  for (let i = 0; i < timeList.length; i++) {
    if (compare(timeList[i]["when"], time)) {
      console.log("timelist:",timeList[i]["when"])
      when = timeList[i]["when"];
      break;
    }
  }

  return {
   when:when
  }
}

module.exports = {
  formatDate: formatDate,
  getDates: getDates,
  dateLater: dateLater,
  timePicker: timePicker,
  update_next:update_next
}







































