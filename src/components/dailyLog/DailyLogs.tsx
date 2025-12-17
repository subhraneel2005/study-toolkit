import { getTodayLog } from "@/app/actions/getDailyLog";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import TodayLog from "./TodayLog";
import DailyLogForm from "./DailyLogForm";

dayjs.extend(utc);
dayjs.extend(timezone);

export default async function DailyLogScreen() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const todayDate = dayjs().tz(userTimezone).startOf("day").toDate();

  const todayLog = await getTodayLog(session.user?.id, todayDate);

  return todayLog ? (
    <TodayLog log={todayLog.log} today={todayLog.date} />
  ) : (
    <DailyLogForm currentDate={todayDate} />
  );
}
