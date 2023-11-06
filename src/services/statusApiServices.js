const db = require("../models/index");
const { Op, Sequelize, where } = require("sequelize");
const upLoadService = async (statusData) => {
  const data = await db.Post.create({
    raw: true,
    content: statusData.content.describe,
    image: statusData.content.imageURLS,
    userid: statusData.userid,
    plain: true,
  });
  const reactData = await db.React.create({
    postid: data.dataValues.id,
    userid: [],
  });
};

const getListPost = async () => {
  try {
    const postList = await db.Post.findAll({
      include: [
        {
          model: db.User,
          required: true,
          attributes: ["username", "avatar"],
        },
        {
          model: db.React,
          required: true,
          attributes: ["id", "quantity", "userid"],
        },
        {
          model: db.Comment,
          include: [{ model: db.User, attributes: ["avatar", "username"] }],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });
    return {
      EM: "Get list success",
      EC: 0,
      DT: postList,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with server",
      EC: 0,
      DT: "",
    };
  }
};

const likeStatusService = async (data) => {
  try {
    const userid = data.userid;
    const postid = data.postId;
    const likeExist = await db.React.count({
      where: {
        userid: { [Op.contains]: [userid] },
        postid: postid,
      },
    });
    if (likeExist === 1) {
      await db.React.update(
        {
          userid: Sequelize.fn("array_remove", Sequelize.col("userid"), userid),
        },
        {
          where: { postid: postid },
        }
      );
      await db.React.increment(
        {
          quantity: -1,
        },
        { where: { postid: postid } }
      );
      const data = await db.React.findOne({
        where: {
          postid: postid,
        },
      });
      return {
        EM: "Unlike success",
        EC: 0,
        DT: data.dataValues,
      };
    } else {
      await db.React.update(
        {
          userid: Sequelize.fn("array_append", Sequelize.col("userid"), userid),
        },
        {
          where: { postid: postid },
        }
      );
      await db.React.increment(
        {
          quantity: +1,
        },
        { where: { postid: postid } }
      );
      const data = await db.React.findOne({
        where: {
          postid: postid,
        },
      });
      return {
        EM: "Like success",
        EC: 1,
        DT: data.dataValues,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with database",
      EC: -1,
      DT: "",
    };
  }
};

const commentService = async (data) => {
  try {
    await db.Comment.create({
      content: data.content_comment,
      postid: data.postid,
      userid: data.userid,
    });
    const res = await db.Comment.findAll({
      where: {
        postid: data.postid,
      },
      include: [{ model: db.User, attributes: ["avatar", "username"] }],
      order: [["updatedAt", "DESC"]],
    });
    return {
      EM: "Comment success",
      EC: 0,
      DT: res,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with database",
      EC: 0,
      DT: "",
    };
  }
};
module.exports = {
  upLoadService,
  getListPost,
  likeStatusService,
  commentService,
};
