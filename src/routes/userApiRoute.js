const express = require("express");
const {
  handleLogin,
  handleSignUp,
  handleGoogleSignIn,
  handleUpdate,
} = require("../controller/userApiController");
const router = express.Router();
const userApiRoute = (app) => {
  router.post("/login", handleLogin);
  router.post("/signup", handleSignUp);
  router.post("/googlelogin", handleGoogleSignIn);
  router.post("/update", handleUpdate);
  return app.use("/user/api", router);
};
module.exports = userApiRoute;
