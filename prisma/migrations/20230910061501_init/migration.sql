-- CreateTable
CREATE TABLE `PlayerInfo` (
    `UID` INTEGER NOT NULL,
    `LeagueNat` VARCHAR(512) NULL,
    `Based` VARCHAR(512) NULL,
    `Club` VARCHAR(512) NULL,
    `ClubID` INTEGER NULL,
    `Name` VARCHAR(512) NULL,
    `CA` INTEGER NULL,
    `PA` INTEGER NULL,
    `Position` VARCHAR(512) NULL,
    `Age` INTEGER NULL,
    `Nat` VARCHAR(512) NULL,
    `DOB` VARCHAR(512) NULL,
    `Weight` VARCHAR(512) NULL,
    `Height` VARCHAR(512) NULL,
    `RightFoot` VARCHAR(512) NULL,
    `LeftFoot` VARCHAR(512) NULL,
    `AP` INTEGER NULL,
    `Salary` INTEGER NULL,
    `Personality` VARCHAR(512) NULL,
    `ImpM` INTEGER NULL,
    `InjPr` INTEGER NULL,
    `Cons` INTEGER NULL,
    `Dirt` INTEGER NULL,
    `DetailedPos` VARCHAR(512) NULL,

    UNIQUE INDEX `UID_UNIQUE`(`UID`),
    PRIMARY KEY (`UID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerStatus` (
    `UID` INTEGER NOT NULL,
    `Wor` INTEGER NULL,
    `One` INTEGER NULL,
    `Tec` INTEGER NULL,
    `Fin` INTEGER NULL,
    `Kic` INTEGER NULL,
    `Thr` INTEGER NULL,
    `OtB` INTEGER NULL,
    `Aer` INTEGER NULL,
    `Bal` INTEGER NULL,
    `Ecc` INTEGER NULL,
    `Bra` INTEGER NULL,
    `TRO` INTEGER NULL,
    `Dri` INTEGER NULL,
    `Ldr` INTEGER NULL,
    `Str` INTEGER NULL,
    `Agi` INTEGER NULL,
    `Ref` INTEGER NULL,
    `Fir` INTEGER NULL,
    `Han` INTEGER NULL,
    `Pos` INTEGER NULL,
    `Com` INTEGER NULL,
    `Acc` INTEGER NULL,
    `Det` INTEGER NULL,
    `Vis` INTEGER NULL,
    `Ant` INTEGER NULL,
    `Mar` INTEGER NULL,
    `LTh` INTEGER NULL,
    `Agg` INTEGER NULL,
    `Jum` INTEGER NULL,
    `Pac` INTEGER NULL,
    `Lon` INTEGER NULL,
    `Sta` INTEGER NULL,
    `Cnt` INTEGER NULL,
    `Fla` INTEGER NULL,
    `Cmp` INTEGER NULL,
    `Cor` INTEGER NULL,
    `Cro` INTEGER NULL,
    `Nat` INTEGER NULL,
    `Tck` INTEGER NULL,
    `Tea` INTEGER NULL,
    `Dec` INTEGER NULL,
    `Pas` INTEGER NULL,
    `Pun` INTEGER NULL,
    `Cmd` INTEGER NULL,
    `Pen` INTEGER NULL,
    `Fre` INTEGER NULL,
    `Hea` INTEGER NULL,

    UNIQUE INDEX `UID_UNIQUE`(`UID`),
    PRIMARY KEY (`UID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClubInfo` (
    `ClubID` INTEGER NOT NULL,
    `Club` VARCHAR(512) NULL,

    UNIQUE INDEX `ClubID_UNIQUE`(`ClubID`),
    INDEX `Club`(`Club`),
    PRIMARY KEY (`ClubID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Squad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `social_user_id` VARCHAR(191) NOT NULL,
    `startingPlayerUids` VARCHAR(1024) NOT NULL,
    `subPlayerUids` VARCHAR(1024) NOT NULL,

    INDEX `Squad_social_user_id_fkey`(`social_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialUser` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `provider` ENUM('GOOGLE', 'NAVER', 'FACEBOOK') NOT NULL,

    UNIQUE INDEX `SocialUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlayerInfo` ADD CONSTRAINT `PlayerInfo_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `PlayerStatus`(`UID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Squad` ADD CONSTRAINT `Squad_social_user_id_fkey` FOREIGN KEY (`social_user_id`) REFERENCES `SocialUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
