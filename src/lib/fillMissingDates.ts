import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(timezone);

export function fillMissingDays(
  data: { date: string; count: number }[],
  timezone: string
): { date: string; count: number }[] {
  if (data.length === 0) return [];

  const map = new Map(data.map((d) => [d.date, d.count]));

  const start = dayjs(data[0].date).tz(timezone);
  const end = dayjs(data[data.length - 1].date).tz(timezone);

  const result: { date: string; count: number }[] = [];

  let current = start;

  while (current.isSameOrBefore(end, "day")) {
    const key = current.format("YYYY/MM/DD");

    result.push({
      date: key,
      count: map.get(key) ?? 0,
    });

    current = current.add(1, "day");
  }

  return result;
}
