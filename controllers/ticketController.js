const { StatusCodes } = require("http-status-codes");
const Ticket = require("../models/Ticket");
const Project = require("../models/Project");

const getTickets = async (req, res) => {
    const project = await Project.findOne({ _id: req.params.projectId });
    if (!project) {
        res.status(StatusCodes.NOT_FOUND).json({
            msg: `Project with ProjectId ${req.params.projectId} doesn't exist`,
        });
    }
    let query = { _id: { $in: project.tickets } };
    if (req.query) {
        Object.keys(req.query).forEach((key) => {
            if (req.query[key] !== undefined && req.query[key] !== null) {
                query[key] = req.query[key];
            }
        });
    }
    if (req.query.title) {
        req.query.title = { $regex: new RegExp(req.query.title, "i") };
    }

    try {
        const tickets = await Ticket.find(query).collation({
            locale: "en",
            strength: 2,
        });
        res.status(StatusCodes.OK).json({ tickets });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: error.message,
        });
    }
};

const getSingleTicket = async (req, res) => {
    const ticket = Ticket.findOne({ _id: req.params.ticketId });
    res.status(StatusCodes.OK).json({ ticket });
};

const createTicket = async (req, res) => {
    const ticket = await Ticket.create(req.body);
    await Project.updateOne(
        { _id: req.body.project },
        { $push: { tickets: ticket._id } }
    );
    res.status(StatusCodes.CREATED).json({ ticket });
};

const updateTicket = async (req, res) => {
    const ticket = await Ticket.findOneAndUpdate(
        { _id: req.params.ticketId },
        req.body,
        { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).json({ ticket });
};

const deleteTicket = async (req, res) => {
    const ticket = await Ticket.findOne({ _id: req.params.ticketId });
    await Project.findOneAndUpdate(
        { _id: ticket.project },
        { $pull: { tickets: req.params.ticketId } }
    );
    await Ticket.deleteOne({ _id: req.params.ticketId });
    res.status(StatusCodes.OK).json({
        msg: `Ticket ${req.params.ticketId} deleted successfully`,
    });
};
module.exports = {
    getTickets,
    getSingleTicket,
    createTicket,
    updateTicket,
    deleteTicket,
};
