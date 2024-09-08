const User = require("../../model/user");

const getUsers = async (req, res, next) => {
  try {
    const getUser = await User.find();
    console.log('allusers',getUser);
    return res.status(200).json(getUser);
  } catch (err) {
    return next(err);
  }
};

exports.userController={
    getUsers,
}