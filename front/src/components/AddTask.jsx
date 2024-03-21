import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateButton from "./DateButton";

const AddTask = ({ onAddTask }) => {
  const [newTodo, setNewTodo] = useState("");
  const [date, setDate] = useState(null);

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const onAdd = (event) => {
    event.preventDefault();
    onAddTask({ description: newTodo, date, completed: false });
    setNewTodo("");
    setDate(null);
  };

  const onDateChange = (date) => {
    setDate(date);
  };

  return (
    <form className="formulario" onSubmit={onAdd}>
      <div className="task">
        <label>Tarea</label>
        <textarea
          className="addNewTodo"
          value={newTodo}
          onChange={handleChange}
          placeholder="Add new todo..."
          rows={3}
        />
      </div>
      <div className="btnTask">
        <div id="btnDate">
          <DatePicker
            selected={date}
            onChange={onDateChange}
            dateFormat="dd/MM/yyyy"
            customInput={<DateButton />}
          />
        </div>
        <div>
          <button disabled={newTodo.length == 0}>Guardar</button>
        </div>
      </div>
    </form>
  );
};

export default AddTask;
