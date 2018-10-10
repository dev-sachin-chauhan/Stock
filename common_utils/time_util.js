const TimeUtil = function () {
};

TimeUtil.prototype.getDate = function (params) {
  params = params || {};
  const oThis = this
    , pastDate = params.p_date || 0
    , pastMonth = params.p_month || 0
    , pastYear = params.p_year || 0
    , currentDate = new Date()
  ;
  let date = new Date(currentDate.getUTCFullYear() - pastYear,
    currentDate.getUTCMonth() - pastMonth, currentDate.getUTCDate() - pastDate, currentDate.getUTCHours());
  let dateString = date.toISOString().slice(0, 10);
  return dateString;
};

module.exports = new TimeUtil();

// const tu = require('./common_utils/time_util')
/*
currentDate = new Date();
date = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate());
*/

