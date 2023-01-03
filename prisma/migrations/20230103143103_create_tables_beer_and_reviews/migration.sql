-- CreateTable
CREATE TABLE "Beer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ibu" INTEGER NOT NULL,
    "note" INTEGER NOT NULL,
    "review" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "birthDay" TEXT NOT NULL,
    "imgUrl" TEXT
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imgUrl" TEXT,
    "content" TEXT NOT NULL,
    "beerId" TEXT NOT NULL,
    CONSTRAINT "Review_beerId_fkey" FOREIGN KEY ("beerId") REFERENCES "Beer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
