-- DropIndex
DROP INDEX "event_userId_key";

-- AlterTable
ALTER TABLE "event" ALTER COLUMN "start" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "end" SET DATA TYPE TIMESTAMP(3);
