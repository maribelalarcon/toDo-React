import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateButton from "./DateButton";

const Task = ({ task, onDelete, onEdit, onComplete }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.description);
  const [date, setDate] = useState(new Date(task.date));

  const onToggleEditing = () => {
    setEditing(!editing);
  };

  const onChange = (event) => {
    setText(event.target.value);
  };

  const onSave = () => {
    onEdit({
      ...task,
      description: text,
      date: date.toISOString(),
    });
    setEditing(false);
  };

  const onCheckboxChange = () => {
    onComplete(task._id);
  };

  const taskDate = new Date(task.date).toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div>
      <ul>
        <li key={task.id} className="lists">
          <div>
            <input
              type="checkbox"
              checked={task.complete}
              onChange={onCheckboxChange}
            />
          </div>

          <div>
            {editing ? (
              <>
                <input type="text" value={text} onChange={onChange} />
                <DatePicker
                  selected={date}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setDate(date);
                  }}
                  customInput={<DateButton />}
                />
              </>
            ) : (
              <p
                onDoubleClick={onToggleEditing}
                style={{
                  textDecoration: task.complete ? " line-through" : "none",
                }}
              >
                {task.description}
                {task.date ? ` (${taskDate})` : null}
              </p>
            )}
          </div>
          <div className="button">
            <button onClick={() => onDelete(task._id)}>X</button>
            {editing ? (
              <button onClick={onSave}>Save</button>
            ) : (
              <button onClick={onToggleEditing}>✎</button>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Task;
