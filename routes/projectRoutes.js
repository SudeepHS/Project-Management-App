const express = require("express");
const router = express.Router();

const {
    createProject,
    getProjectsByUser,
    updateProject,
    deleteProject,
} = require("../controllers/projectController");

const { authenticateUser } = require("../middleware/authentication");

router.route("/").post(createProject);
router.route("/user/:userId").get(authenticateUser, getProjectsByUser);
router
    .route("/:projectId")
    .patch(authenticateUser, updateProject)
    .delete(authenticateUser, deleteProject);

module.exports = router;
