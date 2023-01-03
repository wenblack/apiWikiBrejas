/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Beer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Beer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Beer_id_key" ON "Beer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Beer_name_key" ON "Beer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
