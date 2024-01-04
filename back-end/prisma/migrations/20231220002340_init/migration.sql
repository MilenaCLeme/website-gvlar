-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "name" VARCHAR(127) NOT NULL,
    "hashedPassword" VARCHAR(150) NOT NULL,
    "hashedRefreshToken" VARCHAR(250),
    "phone" VARCHAR(15) NOT NULL,
    "validation" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL DEFAULT 'client',
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property" (
    "id" SERIAL NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "business" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "sell" DOUBLE PRECISION,
    "rental" DOUBLE PRECISION,
    "iptu" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "footage" INTEGER NOT NULL,
    "bedroom" INTEGER NOT NULL,
    "bathroom" INTEGER NOT NULL,
    "garage" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "zipcode" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zone" TEXT,
    "situation" TEXT NOT NULL DEFAULT 'em analise',
    "register" INTEGER,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photograph" (
    "id" SERIAL NOT NULL,
    "describe" VARCHAR(100) NOT NULL,
    "url" TEXT NOT NULL,
    "propertyId" INTEGER,

    CONSTRAINT "photograph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(127) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owner" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(127) NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,

    CONSTRAINT "owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "propertyandowner" (
    "propertyId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "propertyandowner_pkey" PRIMARY KEY ("propertyId","ownerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_register_fkey" FOREIGN KEY ("register") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photograph" ADD CONSTRAINT "photograph_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyandowner" ADD CONSTRAINT "propertyandowner_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "propertyandowner" ADD CONSTRAINT "propertyandowner_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
