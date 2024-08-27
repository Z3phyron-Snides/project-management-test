const db = require("../models");

exports.createProject = async (req, res) => {
  try {
    const { name, description, dueDate } = req.body;
    const project = await db.Project.create({
      name,
      description,
      dueDate,
      UserId: req.userId, // Assuming userId is available from middleware
    });
    res.status(201).send({ project });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await db.Project.findAll({
      where: { UserId: req.userId },
      include: [db.Task],
    });
    res.status(200).send({ projects });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await db.Project.findByPk(req.params.id, {
      include: [db.Task],
    });
    if (!project) {
      return res.status(404).send({ message: "Project Not Found" });
    }
    res.status(200).send({ project });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, description, dueDate } = req.body;
    const project = await db.Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "Project Not Found" });
    }

    project.name = name;
    project.description = description;
    project.dueDate = dueDate;
    await project.save();

    res.status(200).send({ project });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await db.Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "Project Not Found" });
    }

    await project.destroy();
    res.status(200).send({ message: "Project Deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
