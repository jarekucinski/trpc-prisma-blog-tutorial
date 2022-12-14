/*
  Warnings:

  - A unique constraint covering the columns `[permalink]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permalink` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "permalink" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_permalink_key" ON "Post"("permalink");
