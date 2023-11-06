const {
  upLoadService,
  getListPost,
  likeStatusService,
  commentService,
} = require("../services/statusApiServices");
const handleUpLoad = async (req, res) => {
  const data = await upLoadService(req.body);
};
const handleGetPostList = async (req, res) => {
  try {
    const data = await getListPost();
    res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      EM: "Something wrong with the server",
      EC: -1,
      DT: "",
    });
  }
};

const handlelikeStatus = async (req, res) => {
  try {
    const data = await likeStatusService(req.body);
    console.log(data);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Something wrong with the server",
      EC: -1,
      DT: "",
    });
  }
};

const handleComment = async (req, res) => {
  const data = await commentService(req.body);
  return res.status(200).json({
    EM: data.EM,
    EC: data.EC,
    DT: data.DT,
  });
};
module.exports = {
  handleUpLoad,
  handleGetPostList,
  handlelikeStatus,
  handleComment,
};
