-- DropForeignKey
ALTER TABLE "DailyChecklist" DROP CONSTRAINT "DailyChecklist_userId_fkey";

-- DropForeignKey
ALTER TABLE "DailyLogs" DROP CONSTRAINT "DailyLogs_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountCompleted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "DailyLogs" ADD CONSTRAINT "DailyLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyChecklist" ADD CONSTRAINT "DailyChecklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
