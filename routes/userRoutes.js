const express = require("express");
const router = express.Router();

const { getAllUsers, getSingleUser } = require("../controllers/userController");
const { authenticateUser } = require("../middleware/authentication");

router.get("/:id", authenticateUser, getSingleUser);
router.get("/", authenticateUser, getAllUsers);
module.exports = router;
