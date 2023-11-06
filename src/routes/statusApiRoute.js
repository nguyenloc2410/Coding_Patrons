const express = require("express");
const router = express.Router();
const {
  handleUpLoad,
  handleGetPostList,
  handlelikeStatus,
  handleComment,
} = require("../controller/statusApiController");
const statusApiRoute = (app) => {
  router.post("/upload", handleUpLoad);
  router.get("/getpostlist", handleGetPostList);
  router.post("/likestatus", handlelikeStatus);
  router.post("/commentstatus", handleComment);

  return app.use("/status/api", router);
};
module.exports = statusApiRoute;
