import dateHelper from "../dateHelper.js";

function getTotalRevenueForDay() {
  return {
    startDate: dateHelper.getStartOfCurrentDay(),
    endDate: dateHelper.getEndOfCurrentDay(),
  };
}

function getTotalRevenueForWeek() {
  return {
    startDate: dateHelper.getFirstDayOfCurrentWeek(),
    endDate: dateHelper.getLastDayOfCurrentWeek(),
  };
}

function getTotalRevenueForMonth() {
  return {
    startDate: dateHelper.getFirstDayOfCurrentMonth(),
    endDate: dateHelper.getLastDayOfCurrentMonth(),
  };
}

function getTotalRevenueForYear() {
  return {
    startDate: dateHelper.getFirstDayOfCurrentYear(),
    endDate: dateHelper.getLastDayOfCurrentYear(),
  };
}

export default { getTotalRevenueForDay, getTotalRevenueForWeek, getTotalRevenueForMonth, getTotalRevenueForYear };
