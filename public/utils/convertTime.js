const { formatInTimeZone } = require("date-fns-tz");

function centalConversion(date) {
  return formatInTimeZone(date, "America/Chicago", "yyyy-MM-dd HH:mm a zzz");
}

module.exports = centalConversion;
