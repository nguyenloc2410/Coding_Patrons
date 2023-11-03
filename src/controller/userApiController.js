const {
  signUpService,
  logInService,
  googleSignInService,
  updateService,
} = require("../services/userApiServices");

const handleLogin = async (req, res) => {
  try {
    let userData = req.body;
    const data = await logInService(userData);
    res.cookie("access_token", data.DT.token, { httpOnly: true });
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT.userValid,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Something wrong with the service",
      EC: -1,
      DT: "",
    });
  }
};

const handleSignUp = async (req, res) => {
  try {
    const userData = req.body;
    const data = await signUpService(userData);
    res.cookie("access_token", data.token, { httpOnly: true });
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Something wrong with the service",
      EC: -1,
      DT: "",
    });
  }
};

const handleGoogleSignIn = async (req, res) => {
  try {
    const userData = req.body;
    const data = await googleSignInService(userData);
    res.cookie("access_token", data.DT.token, { httpOnly: true });
    res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT.userValid,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleUpdate = async (req, res) => {
  try {
    const userData = req.body;
    const data = await updateService(userData);
    return res.status(200).json({
      EC: data.EC,
      EM: data.EM,
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleLogOut = async (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({
    EM: "Log Out Success",
    EC: 0,
    DT: "",
  });
};

module.exports = {
  handleLogin,
  handleSignUp,
  handleGoogleSignIn,
  handleUpdate,
  handleLogOut,
};
