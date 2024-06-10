const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ProjectSchema = new mongoose.Schema(
    {
        projectName: {
            type: String,
            required: [true, "Please provide name"],
            minlength: 3,
            maxlength: 50,
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide admin"],
        },
        tickets: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Tickets",
        },
        users: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            required: [true, "Please provide user"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
