/*
  Warnings:

  - You are about to drop the column `guardian_cpf` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Indications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Student_guardian_cpf_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "guardian_cpf",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Indications_email_key" ON "Indications"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
