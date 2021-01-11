import moment from "moment-timezone";

const addWeekdays = (date, days) => {
  date = moment(date);
  if (date.day() === 6) {
    date.add(2, "days");
  } else if (date.day() === 0) {
    date.add(1, "days");
  }
  while (days > 0) {
    date = date.add(1, "days");
    if (date.day() !== 6 && date.day() !== 0) {
      days -= 1;
    }
  }
  return date;
};
const getDeadlineDate = (date, work) => {
  date = moment(date, "DD/MM/YYYY, H:mm dddd");
  let workDays = 0,
    temp = moment(date, "DD/MM/YYYY, H:mm dddd");
  while (work >= 9) {
    work -= 9;
    workDays += 1;
  }
  if (temp.day() === 6) {
    temp.add(2, "days");
    temp.hour(10 + work);
  } else if (temp.day() === 0) {
    temp.add(1, "days");
    temp.hour(10 + work);
  } else if (temp.hour() >= 10 && temp.hour() <= 19) {
    temp.hour(temp.hour() + work);
  }
  if (temp.hour() >= 19) {
    workDays += 1;
    temp.hour(temp.hour() - 19 + 10);
    temp.minutes(0);
  } else if (temp.hour() < 10) {
    let r = 19 - date.hour();
    if (r > work && r > 0) {
      temp.hour(10 + work);
    } else {
      temp.hour(10 + (work - r));
    }
  }
  if (temp.minutes() > 0 && temp.minutes() <= 15) {
    temp.minutes(0);
  } else if (temp.minutes() > 15 && temp.minutes() <= 30) {
    temp.minutes(30);
  } else if (temp.hour() > 30 && temp.minutes() <= 45) {
    temp.minutes(45);
  } else if (temp.hour() > 45 && temp.minutes() < 60) {
    temp.minutes(0);
    temp.hours((temp.hours() + 1) % 24);
  }
  return (temp = addWeekdays(temp, workDays));
};

export default getDeadlineDate;
