export function sameDay(d1: Date | string, d2: Date | string) {
  if (typeof d1 === "string") d1 = new Date(d1);
  if (typeof d2 === "string") d2 = new Date(d2);
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

export function formatDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getWeekNumber(date: Date) {
  const firstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const offsetDate = date.getDate() + firstWeekday - 1;
  return Math.ceil(offsetDate / 7);
}
