const express = require("express");
const router = express.Router();

const {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    getSingleTicket,
} = require("../controllers/ticketController");
const { authenticateUser } = require("../middleware/authentication");

router.route("/project/:projectId").get(getTickets);
router
    .route("/:ticketId")
    .get(authenticateUser, getSingleTicket)
    .patch(authenticateUser, updateTicket)
    .delete(authenticateUser, deleteTicket);
router.route("/").post(authenticateUser, createTicket);

module.exports = router;
