const db = require('../models');

exports.createTask = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const task = await db.Task.create({
      name,
      description,
      status,
      ProjectId: req.params.projectId, // Assuming projectId is passed in the route
    });
    res.status(201).send({task});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await db.Task.findAll({ where: { ProjectId: projectId } });
    res.status(200).send({ tasks });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const task = await db.Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).send({ message: 'Task Not Found' });
    }

    task.name = name;
    task.description = description;
    task.status = status;
    await task.save();

    res.status(200).send({task});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await db.Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).send({ message: 'Task Not Found' });
    }

    await task.destroy();
    res.status(200).send({ message: 'Task Deleted' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
