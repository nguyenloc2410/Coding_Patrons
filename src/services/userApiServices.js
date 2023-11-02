const db = require("../models/index");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const { createjwt } = require("../token/tokenAction");
const { where } = require("sequelize");

const hashUserPassWord = (pass) => {
  return bcrypt.hashSync(pass, salt);
};

const checkUserExist = async (userEmail) => {
  const check = await db.User.findOne({
    where: { email: userEmail },
  });
  if (check) {
    return check;
  } else {
    return null;
  }
};

const signUpService = async (userData) => {
  let check = await checkUserExist(userData.email);
  if (!check) {
    const hashpass = hashUserPassWord(userData.password);
    const result = await db.User.create({
      username: userData.email.split("@")[0],
      email: userData.email,
      password: hashpass,
    });
    const { password, ...rest } = result.dataValues;
    const userValid = rest;
    const payload = {
      username: userValid.username,
      email: userValid.email,
      role: userValid.role,
    };
    const token = await createjwt(payload);
    return {
      token: token,
      EM: "Create account success",
      EC: 0,
      DT: userValid,
    };
  } else {
    return {
      EM: "Email already exist !",
      EC: -1,
      DT: "",
    };
  }
};

const logInService = async (userData) => {
  try {
    const userValid = await checkUserExist(userData.email);
    if (!userValid) {
      return {
        EM: "User not found",
        EC: -1,
        DT: "",
      };
    }
    const checkPassword = bcrypt.compareSync(
      userData.password,
      userValid.password
    );
    if (!checkPassword) {
      return {
        EM: "User not found",
        EC: -1,
        DT: "",
      };
    }
    const payload = {
      username: userValid.username,
      email: userValid.email,
      role: userValid.role,
    };
    const token = await createjwt(payload);
    const { password, ...rest } = userValid.dataValues;
    return {
      EM: "Login Success",
      EC: 0,
      DT: {
        token: token,
        userValid: rest,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with service",
      EC: -1,
      DT: "",
    };
  }
};

const googleSignInService = async (userData) => {
  try {
    const userValid = await checkUserExist(userData.email);
    if (userValid) {
      const payload = {
        username: userValid.username,
        email: userValid.email,
        role: userValid.dataValues.role,
      };
      const token = await createjwt(payload);
      const { password, ...rest } = userValid.dataValues;
      return {
        EM: "Login Success",
        EC: 0,
        DT: {
          token: token,
          userValid: rest,
        },
      };
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashpass = hashUserPassWord(generatePassword);
      const result = await db.User.create({
        username: userData.username,
        email: userData.email,
        password: hashpass,
        avatar: userData.avatar,
      });
      console.log("check user", result.dataValues);
      const payload = {
        id: result.dataValues.id,
        username: result.dataValues.username,
        email: result.dataValues.email,
        avatar: result.dataValues.avatar,
        role: result.dataValues.role,
      };
      const token = await createjwt(payload);
      return {
        EM: "Login Success",
        EC: 0,
        DT: {
          token: token,
          userValid: payload,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with service",
      EC: -1,
      DT: "",
    };
  }
};

const updateService = async (userData) => {
  try {
    const userValid = await checkUserExist(userData.email);
    if (!userValid) {
      return {
        EM: "User not found",
        EC: -1,
        DT: "",
      };
    }
    const checkPassword = bcrypt.compareSync(
      userData.password,
      userValid.password
    );
    if (!checkPassword) {
      return {
        EM: "Wrong password please try again",
        EC: -1,
        DT: "",
      };
    }
    await db.User.update(
      {
        username: userData.username,
        avatar: userData.avatar,
      },
      { where: { email: userData.email } }
    );
    const updateUser = await db.User.findOne({
      where: {
        email: userData.email,
      },
    });
    const { password, ...rest } = updateUser.dataValues;
    return {
      EM: "Update Success",
      EC: 0,
      DT: rest,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong with service",
      EC: -1,
      DT: "",
    };
  }
};

module.exports = {
  signUpService,
  logInService,
  googleSignInService,
  updateService,
};
