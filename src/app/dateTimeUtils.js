// LocalDateTime 문자열을 JavaScript Date 객체로 변환하는 함수
function parseLocalDateTime(localDateTimeString) {
  return new Date(localDateTimeString);
}

// Date 객체에서 시간을 반환하는 함수
function getHour(date) {
  return date.getHours();
}

// Date 객체에서 분을 반환하는 함수
function getMinute(date) {
  return String(date.getMinutes()).padStart(2, '0');
}

// LocalDateTime 문자열을 HH:mm 형식의 문자열로 변환하는 함수
function formatToLocalTime(localDateTimeString) {
  const date = parseLocalDateTime(localDateTimeString);
  const hour = getHour(date);
  const minute = getMinute(date);
  return `${hour}:${minute}`;
}

// LocalDateTime 문자열에 분을 더하는 함수
function addMinutesToLocalDateTime(localDateTimeString, minutesToAdd) {
  const date = parseLocalDateTime(localDateTimeString);
  date.setMinutes(date.getMinutes() + minutesToAdd);
  return date;
}

// LocalDateTime 문자열을 YYYY-MM-dd HH:mm 형식의 문자열로 변환하는 함수
function formatToLocalDateTime(localDateTimeString) {
  const date = parseLocalDateTime(localDateTimeString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = getHour(date);
  const minute = getMinute(date);
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

// LocalDateTime을 HH:mm 형식의 문자열로 변환하는 함수
function formatToLocalTimeFromLocalDateTime(localDateTime) {
  const hour = getHour(localDateTime);
  const minute = getMinute(localDateTime);
  return `${hour}:${minute}`;
}

// 현재 날짜를 YYYY-MM-dd 형식의 문자열로 반환하는 함수
function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export {
  formatToLocalTime,
  addMinutesToLocalDateTime,
  formatToLocalTimeFromLocalDateTime,
  getCurrentDate,
  formatToLocalDateTime,
};
