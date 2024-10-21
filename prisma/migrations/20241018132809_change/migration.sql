/*
  Warnings:

  - A unique constraint covering the columns `[guardian_cpf]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guardian` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guardian_cpf` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "guardian" TEXT NOT NULL,
ADD COLUMN     "guardian_cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_guardian_cpf_key" ON "Student"("guardian_cpf");
