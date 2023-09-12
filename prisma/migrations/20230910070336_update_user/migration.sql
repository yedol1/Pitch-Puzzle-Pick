/*
  Warnings:

  - A unique constraint covering the columns `[email,provider]` on the table `SocialUser` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `SocialUser` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `email` to the `Squad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `Squad` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Squad` DROP FOREIGN KEY `Squad_social_user_id_fkey`;

-- AlterTable
ALTER TABLE `SocialUser` MODIFY `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Squad` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `provider` ENUM('GOOGLE', 'NAVER', 'FACEBOOK') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `SocialUser_email_provider_key` ON `SocialUser`(`email`, `provider`);

-- AddForeignKey
ALTER TABLE `Squad` ADD CONSTRAINT `Squad_email_provider_fkey` FOREIGN KEY (`email`, `provider`) REFERENCES `SocialUser`(`email`, `provider`) ON DELETE RESTRICT ON UPDATE CASCADE;
