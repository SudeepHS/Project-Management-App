const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide title"],
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: [true, "Please provide project"],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide admin"],
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        assignedToName: {
            type: "String",
        },
        description: {
            type: "String",
        },
        priority: {
            type: "Number",
            enum: [1, 2, 3],
            default: 2,
        },
        status: {
            type: "String",
            enum: ["New", "Active", "Resolved", "Closed"],
            default: "New",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);
