-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('MANHA', 'TARDE', 'INTEGRAL');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('INDICADO', 'EM_PROGRESSO', 'FALHA', 'SUCESSO');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "shift" "Shift" NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Indications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "shift" "Shift" NOT NULL,
    "guardian" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isMatriculed" BOOLEAN NOT NULL DEFAULT false,
    "student_id" TEXT NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'INDICADO',

    CONSTRAINT "Indications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Indications" ADD CONSTRAINT "Indications_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
