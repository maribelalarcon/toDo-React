import Task from "./Task";

const TaskList = ({ tasks, onTaskDelete, onTaskEdit, onCompleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          onDelete={onTaskDelete}
          onEdit={onTaskEdit}
          onComplete={onCompleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
