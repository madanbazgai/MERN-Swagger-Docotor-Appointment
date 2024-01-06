const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Doctor Appointment Application",
    description:
      "This is a simple doctor appointment application made with NodeJS, ExpressJS, MongoDB and Swagger",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const ouputPath = "./src/swagger.json";
const endpointsFiles = ["./src/index.ts"];

swaggerAutogen(ouputPath, endpointsFiles, doc).then(() => {
  require("./index.ts");
});
