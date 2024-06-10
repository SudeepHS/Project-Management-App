const express = require("express");
const router = express.Router();

const { getAllUsers, getSingleUser } = require("../controllers/userController");

router.get("/:id", getSingleUser);
router.get("/", getAllUsers);
module.exports = router;
