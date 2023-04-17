/*
  Warnings:

  - You are about to drop the column `bed` on the `immobile` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `owner` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(127)`.
  - You are about to alter the column `email` on the `owner` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(127)`.
  - You are about to alter the column `phone` on the `owner` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - Added the required column `city` to the `immobile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `immobile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "immobile" DROP COLUMN "bed",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "room" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "owner" ALTER COLUMN "name" SET DATA TYPE VARCHAR(127),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(127),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(15);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);
