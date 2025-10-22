-- CreateTable
CREATE TABLE "Itemshop" (
    "id" TEXT NOT NULL,
    "nameid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isNew" BOOLEAN,
    "inStock" INTEGER,
    "description" TEXT,

    CONSTRAINT "Itemshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "amountPaid" DOUBLE PRECISION,
    "purchaseDate" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);
