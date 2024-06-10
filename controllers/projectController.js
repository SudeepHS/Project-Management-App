const Project = require("../models/Project");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const getProjectsByUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });
    const projects = await Project.find({ _id: { $in: user.projects } });
    res.status(StatusCodes.OK).json({ projects });
};
const createProject = async (req, res) => {
    const project = await Project.create(req.body);
    const userIds = project.users.map((user) => user._id);
    await User.updateMany(
        { _id: { $in: userIds } },
        { $push: { projects: project._id } }
    );
    res.status(StatusCodes.CREATED).json({ project });
};

const updateProject = async (req, res) => {
    const project = await Project.findOneAndUpdate(
        { _id: req.params.projectId },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );
    if (JSON.stringify(req.body.users) !== JSON.stringify(project.users)) {
        await User.updateMany(
            { _id: { $in: userIds } },
            { $push: { projects: project._id } }
        );
    }
    res.status(StatusCodes.OK).json({ msg: "Updated Successfully" });
};

const deleteProject = async (req, res) => {
    const project = await Project.findOne({ _id: req.params.projectId });
    await User.updateMany(
        { _id: { $in: project.users } },
        { $pull: { projects: project._id } }
    );
    await Ticket.deleteMany({ _id: { $in: project.tickets } });
    await Project.deleteOne({ _id: req.params.projectId });
    res.status(StatusCodes.OK).json({
        msg: `Project deleted with ProjectId ${req.params.projectId}`,
    });
};

module.exports = {
    getProjectsByUser,
    createProject,
    updateProject,
    deleteProject,
};
