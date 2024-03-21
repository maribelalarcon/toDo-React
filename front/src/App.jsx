import "./App.css";
import image from "./assets/boton-mas.svg";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";
import TaskList from "./components/TasksList";
import { Modal, Fab } from "@mui/material";
import TaskFilter from "./components/TaskFilter";

function App() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [date, setDate] = useState(null);

  async function getTasks() {
    const backendResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/tasks`
    );
    const taskFromBackend = await backendResponse.json();
    setTasks(taskFromBackend);
  }

  async function onAddTask(task) {
    const { date } = task;
    const newTask = {
      ...task,
      date: date ? date.toISOString() : null,
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const createdTask = await response.json();
    setTasks([...tasks, createdTask]);
    setModalOpen(false);
  }

  const onEditTask = async (updatedTask) => {
    await fetch(`${import.meta.env.VITE_API_URL}/tasks/${updatedTask._id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const updatedTasks = tasks.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    );

    setTasks(updatedTasks);
  };

  const onDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // se borro correctamente
        const updatedTasks = tasks.filter((task) => task._id !== taskId);
        setTasks(updatedTasks);
      } else {
        // no se pudo borrar
      }
    } catch (e) {
      alert("Ocurrio un error, intente nuevamente luego");
    }
  };

  const onCompleteTask = async (taskId) => {
    try {
      const task = tasks.find((task) => {
        return task._id === taskId;
      });
      await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ complete: !task.complete }),
      });
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, complete: !task.complete } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.log("Error en la tarea completada", error);
    }
  };

  const onFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const onFilterReset = () => {
    setFilter("all");
    setDate(null);
  };

  const onDateChange = (date) => {
    setDate(date);
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter == "all") {
        return true;
      } else if (filter == "complete") {
        return task.complete;
      } else {
        return !task.complete;
      }
    })
    .filter((task) => {
      if (date) {
        const taskDate = new Date(task.date);
        return date.getTime() === taskDate.getTime();
      } else {
        return true;
      }
    });

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="app">
      <h1>Task</h1>

      <TaskList
        tasks={filteredTasks}
        onTaskDelete={onDeleteTask}
        onTaskEdit={onEditTask}
        onCompleteTask={onCompleteTask}
      />
      <Fab
        onClick={() => {
          setModalOpen(true);
        }}
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
      >
        <img src={image} alt="icono mas" style={{ width: "100%" }} />
      </Fab>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="addTaskModal">
          <AddTask
            onAddTask={onAddTask}
            className="addTask"
            setModalOpen={setModalOpen}
          />
        </div>
      </Modal>
      <TaskFilter
        filter={filter}
        onChange={onFilterChange}
        onDateChange={onDateChange}
        onReset={onFilterReset}
        date={date}
      />
    </div>
  );
}

export default App;
