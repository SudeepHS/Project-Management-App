const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../util/jwt");

const register = async (req, res) => {
    const { email, name, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        throw new Error("Email already exists");
    }
    const user = await User.create({ name, email, password });
    const tokenUser = { userId: user._id, name: user.name, email: user.email };
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("Please provide email and password");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid Credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new Error("Invalid Credentials");
    }
    const tokenUser = { userId: user._id, name: user.name, email: user.email };
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({
        user: { userId: user._id, name: user.name, email: user.email },
    });
};

const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
    register,
    login,
    logout,
};
