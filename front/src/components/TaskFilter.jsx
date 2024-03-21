import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateButton from "./DateButton";

function TaskFilter({ filter, onChange, onDateChange, onReset, date }) {
  return (
    <div>
      <button onClick={() => onChange("all")} disabled={filter === "all"}>
        All
      </button>
      <button
        onClick={() => onChange("complete")}
        disabled={filter === "complete"}
      >
        Complete
      </button>
      <button
        onClick={() => onChange("pending")}
        disabled={filter === "pending"}
      >
        Pending
      </button>
      <DatePicker
        selected={date}
        onChange={onDateChange}
        dateFormat="dd/MM/yyyy"
        customInput={<DateButton />}
      />
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default TaskFilter;
