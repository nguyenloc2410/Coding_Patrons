require("dotenv").config();
const cors = require("cors");

const secureCors = (app) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
};
module.exports = secureCors;
