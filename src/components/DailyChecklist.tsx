import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getAllTodayTasks } from "@/app/actions/getAllTasks";
import AddTaskScreen from "./dailyChecklist/AddTask";
import AddChecklist from "./dailyChecklist/AddChecklist";

dayjs.extend(utc);
dayjs.extend(timezone);

export default async function DailyChecklist() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const todayDate = dayjs().tz(userTimezone).startOf("day").toDate();

  const allTodayTasks = await getAllTodayTasks(todayDate, session.user.id);

  return allTodayTasks ? (
    <AddTaskScreen allTasks={allTodayTasks} currentDate={todayDate} />
  ) : (
    <AddChecklist currentDate={todayDate} />
  );
}
