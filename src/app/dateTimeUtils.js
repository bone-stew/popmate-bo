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

export { formatToLocalTime };
