const express = require("express");
const router = express.Router();

const {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    getSingleTicket,
} = require("../controllers/ticketController");

router.route("/project/:projectId").get(getTickets);
router
    .route("/:ticketId")
    .get(getSingleTicket)
    .patch(updateTicket)
    .delete(deleteTicket);
router.route("/").post(createTicket);

module.exports = router;
