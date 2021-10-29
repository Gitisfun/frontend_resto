import moment from "moment";

function formatDay(date) {
  return date.format("DD/MM/YYYY");
}

function addDays(date, days) {
  return date.add(days, "days");
}

function subtractDays(date, days) {
  return date.subtract(days, "days");
}

function getStartAndEndOfDay(date) {
  return {
    startDate: date.startOf("day").toDate(),
    endDate: date.endOf("day").toDate()
  };
}

function formatTime(date){
  return moment(date).format("HH:mm:ss")
}

function getCurrentDay() {
  return moment();
}

function getCurrentMonth() {
  return moment().format("M");
}

function getCurrentYear() {
  return moment().format("YYYY");
}

function getAllMonths() {
  return [
    {
      id: 1,
      name: "Januari",
    },
    {
      id: 2,
      name: "Februari",
    },
    {
      id: 3,
      name: "Maart",
    },
    {
      id: 4,
      name: "April",
    },
    {
      id: 5,
      name: "Mei",
    },
    {
      id: 6,
      name: "Juni",
    },
    {
      id: 7,
      name: "Juli",
    },
    {
      id: 8,
      name: "Augustus",
    },
    {
      id: 9,
      name: "September",
    },
    {
      id: 10,
      name: "Oktober",
    },
    {
      id: 11,
      name: "November",
    },
    {
      id: 12,
      name: "December",
    },
  ];
}

function getYears() {
  return [
    {
      id: 2021,
      name: "2021",
    },
    {
      id: 2020,
      name: "2020",
    },
  ];
}

function getStartOfCurrentDay() {
  return moment()
    .clone()
    .startOf("day")
    .toDate();
}

function getEndOfCurrentDay() {
  return moment()
    .clone()
    .endOf("day")
    .toDate();
}

function getFirstDayOfCurrentWeek() {
  return moment()
    .clone()
    .startOf("week")
    .toDate();
}

function getLastDayOfCurrentWeek() {
  return moment()
    .clone()
    .endOf("week")
    .toDate();
}

function getFirstDayOfCurrentMonth() {
  return moment()
    .clone()
    .startOf("month")
    .toDate();
}

function getLastDayOfCurrentMonth() {
  return moment()
    .clone()
    .endOf("month")
    .toDate();
}

function getFirstDayOfCurrentYear() {
  return moment()
    .clone()
    .startOf("year")
    .toDate();
}

function getLastDayOfCurrentYear() {
  return moment()
    .clone()
    .endOf("year")
    .toDate();
}

function formatStartDateToTimestamp(date) {
  return `${moment(date).format("YYYY-MM-DD")} 00:00:01`;
}

function formatEndDateToTimestamp(date) {
  return `${moment(date).format("YYYY-MM-DD")} 23:59:59`;
}

function getTodayTimestamp() {
  return `${moment().format("DD.MM.YY HH:mm")}`;
}

function getControleTimestamp() {
  return `${moment().format("DD.MM.YY HH:mm:ss")}`;
}

function getAllDaysInMonthWithStartAndEndTime(month, year) {
  let date = moment();
  if (month != null || year != null) {
    date = moment({ year: year, month: month, day: 1 });
  }

  const lengthOfMonth = date.daysInMonth();
  let dayIndex = date.startOf("month");

  let temp = [];
  for (let i = 0; i < lengthOfMonth; i++) {
    temp.push({
      startDay: formatStartDateToTimestamp(dayIndex),
      endDay: formatEndDateToTimestamp(dayIndex),
    });
    dayIndex = dayIndex.add(1, "days");
  }
  const tempObj = {
    days: temp,
    daysInMonth: lengthOfMonth,
  };

  return tempObj;
}

export default {
  formatTime,
  formatDay,
  addDays,
  subtractDays,
  getStartAndEndOfDay,
  getControleTimestamp,
  getTodayTimestamp,
  getCurrentDay,
  getCurrentMonth,
  getCurrentYear,
  getAllMonths,
  getYears,
  getStartOfCurrentDay,
  getEndOfCurrentDay,
  getFirstDayOfCurrentWeek,
  getLastDayOfCurrentWeek,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
  getFirstDayOfCurrentYear,
  getLastDayOfCurrentYear,
  formatStartDateToTimestamp,
  formatEndDateToTimestamp,
  getAllDaysInMonthWithStartAndEndTime,
};
