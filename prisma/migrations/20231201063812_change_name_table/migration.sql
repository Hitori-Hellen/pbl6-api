/*
  Warnings:

  - You are about to drop the `AppSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KanbanBoard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trash` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_KanbanBoardToPage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_userId_fkey";

-- DropForeignKey
ALTER TABLE "_KanbanBoardToPage" DROP CONSTRAINT "_KanbanBoardToPage_A_fkey";

-- DropForeignKey
ALTER TABLE "_KanbanBoardToPage" DROP CONSTRAINT "_KanbanBoardToPage_B_fkey";

-- DropTable
DROP TABLE "AppSetting";

-- DropTable
DROP TABLE "KanbanBoard";

-- DropTable
DROP TABLE "Page";

-- DropTable
DROP TABLE "Trash";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_KanbanBoardToPage";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kanbanBoard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kanbanBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trash" (
    "id" TEXT NOT NULL,

    CONSTRAINT "trash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appSetting" (
    "id" TEXT NOT NULL,
    "appearance" BOOLEAN NOT NULL DEFAULT true,
    "language" TEXT NOT NULL,

    CONSTRAINT "appSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_kanbanBoardTopage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_kanbanBoardTopage_AB_unique" ON "_kanbanBoardTopage"("A", "B");

-- CreateIndex
CREATE INDEX "_kanbanBoardTopage_B_index" ON "_kanbanBoardTopage"("B");

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_kanbanBoardTopage" ADD CONSTRAINT "_kanbanBoardTopage_A_fkey" FOREIGN KEY ("A") REFERENCES "kanbanBoard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_kanbanBoardTopage" ADD CONSTRAINT "_kanbanBoardTopage_B_fkey" FOREIGN KEY ("B") REFERENCES "page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
