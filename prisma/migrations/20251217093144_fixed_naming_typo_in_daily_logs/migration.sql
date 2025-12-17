/*
  Warnings:

  - You are about to drop the column `logs` on the `DailyLogs` table. All the data in the column will be lost.
  - Added the required column `log` to the `DailyLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyLogs" DROP COLUMN "logs",
ADD COLUMN     "log" TEXT NOT NULL;
