const { formatInTimeZone } = require("date-fns-tz");

function centalConversion(date) {
  return formatInTimeZone(date, "America/Chicago", "MM-dd-yy | HH:mm a zzz");
}

module.exports = centalConversion;
