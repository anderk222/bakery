-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_breadBookId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_breadBookId_fkey" FOREIGN KEY ("breadBookId") REFERENCES "BreadBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
