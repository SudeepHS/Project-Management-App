const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token;
};

const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user });
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: false,
        expires: new Date(Date.now() + oneDay),
        secure: false,
        signed: true,
    });
};

module.exports = {
    createJWT,
    attachCookiesToResponse,
};
