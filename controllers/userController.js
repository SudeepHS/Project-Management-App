const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const getAllUsers = async (req, res) => {
    const users = await User.find({}).select("-password");
    res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select("-password");
    res.status(StatusCodes.OK).json(user);
};

module.exports = { getAllUsers, getSingleUser };
