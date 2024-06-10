const jwt = require("jsonwebtoken");
const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;
    if (!token) {
        throw new Error("Authentication Invalid");
    }

    try {
        const { name, userId } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { name, userId };
        next();
    } catch (error) {
        throw new Error("Authentication Invalid");
    }
};

// const authorizePermissions = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             throw new CustomError.UnauthorizedError(
//                 "Unauthorized to access this route"
//             );
//         }
//         next();
//     };
// };

module.exports = {
    authenticateUser,
};
