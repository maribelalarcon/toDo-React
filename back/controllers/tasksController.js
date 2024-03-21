const Task = require("../models/TaskModel");

// const readTasks = async () => {
//   let fileTask;
//   try {
//     fileTask = await fsPromises.readFile("task.db", {
//       encoding: "utf-8",
//     });
//   } catch (error) {
//     fileTask = "[]";
//   }
//   return JSON.parse(fileTask);
// };

// const writeTasks = async (tasks) => {
//   const listTask = JSON.stringify(tasks);
//   await fsPromises.writeFile("task.db", listTask);
// };

const tasksControllers = {
  getTasks: async function (req, res) {
    try {
      const taskList = await Task.find();
      return res.json(taskList);
    } catch (error) {
      res.status(500).send({ status: "error", error });
    }
  },

  getTasksId: async function (req, res) {
    try {
      const taskId = req.params.id;
      const task = await Task.findOne({ _id: taskId });
      return res.json(task);
    } catch (error) {
      res.status(404).send("Tarea no encontrada");
    }
  },

  addTask: async function (req, res) {
    try {
      const data = req.body;
      const { date } = data; //obtengo la propiedad date de mi objeto data

      const newTask = new Task({
        ...data,
        date: date ? new Date(date) : null,
      });

      const task = await newTask.save();
      res.status(201).send(task);
    } catch (error) {
      res.send(500).send("No se pudo agregar Tarea", error);
    }
  },

  updateTaskById: async function (req, res) {
    try {
      const data = req.body;
      const { date } = data;

      const task = {
        ...data,
        date: date ? new Date(date) : null,
      };

      await Task.updateOne({ _id: req.params.id }, task);
      return res.send("Tarea Actualizada");
    } catch (error) {
      res.status(500).send({ status: "No se pudo actualizar la Tarea", error });
    }
  },

  deleteTaskById: async function (req, res) {
    try {
      const taskId = req.params.id;

      const { deletedCount } = await Task.deleteOne({
        _id: taskId,
      });

      if (deletedCount === 0) {
        res.status(404).send();
      } else {
        res.status(200).send();
      }
    } catch (error) {
      res
        .status(400)
        .send({ status: "error", error: "No se pudo eliminar la tarea" });
    }
  },
};

module.exports = tasksControllers;
