export function curDate() {
  const date = new Date();
  const year = String(date.getFullYear());
  let month = String(date.getDay());
  let day = String(date.getDate());
  if (month.length < 2) month = `0${Number(month) - 1}`;
  if (day.length < 2) day = `0${day}}`;
  return `${year}-${month}-${day}`;
}
