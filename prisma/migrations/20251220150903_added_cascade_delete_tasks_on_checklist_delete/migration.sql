-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_dailyChecklistId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_dailyChecklistId_fkey" FOREIGN KEY ("dailyChecklistId") REFERENCES "DailyChecklist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
