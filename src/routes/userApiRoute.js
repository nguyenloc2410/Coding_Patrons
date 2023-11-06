const express = require("express");
const router = express.Router();
const {
  handleLogin,
  handleSignUp,
  handleGoogleSignIn,
  handleUpdate,
  handleLogOut,
} = require("../controller/userApiController");
const userApiRoute = (app) => {
  router.post("/login", handleLogin);
  router.post("/signup", handleSignUp);
  router.post("/googlelogin", handleGoogleSignIn);
  router.post("/update", handleUpdate);
  router.get("/logout", handleLogOut);
  return app.use("/user/api", router);
};
module.exports = userApiRoute;
