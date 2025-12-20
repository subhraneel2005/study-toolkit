/*
  Warnings:

  - You are about to drop the column `priority` on the `DailyChecklist` table. All the data in the column will be lost.
  - You are about to drop the column `completed` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyChecklist" DROP COLUMN "priority";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "completed",
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'HIGH';
