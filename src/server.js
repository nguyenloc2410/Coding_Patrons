require("dotenv").config();
const express = require("express");
const userApiRoute = require("./routes/userApiRoute");
const statusApiRoute = require("./routes/statusApiRoute");
const secureCors = require("./config/cors");
const connectDataBase = require("./config/database");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.SERVER_PORT || 8888;

//CORS
secureCors(app);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1);

//database
connectDataBase();

//userApi
userApiRoute(app);
//statusApi
statusApiRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
