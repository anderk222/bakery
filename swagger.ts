import swaggerAutogen from "swagger-autogen";

const output_file = './swagger.output.json'

const endpoints_files = [
  './src/components/order/order.routes.ts',
  './src/components/catalogue/catalogue.routes.ts',
  './src/components/bread_book/bread_book.routes.ts',
  './src/components/image/image.routes.ts',
  './src/components/user/user.routes.ts'
];
swaggerAutogen()(output_file, endpoints_files, {}).then(async () => {
  await import('./src/main'); // Your project's root file
});