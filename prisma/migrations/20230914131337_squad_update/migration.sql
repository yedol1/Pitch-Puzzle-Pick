/*
  Warnings:

  - The primary key for the `Squad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Squad` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Squad` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `Squad` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Squad` DROP FOREIGN KEY `Squad_email_provider_fkey`;

-- AlterTable
ALTER TABLE `Squad` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `id`,
    DROP COLUMN `provider`,
    ADD PRIMARY KEY (`social_user_id`);

-- AddForeignKey
ALTER TABLE `Squad` ADD CONSTRAINT `Squad_social_user_id_fkey` FOREIGN KEY (`social_user_id`) REFERENCES `SocialUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
