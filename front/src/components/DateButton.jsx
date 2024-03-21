import React, { forwardRef } from "react";

const DateButton = forwardRef(({ value, onClick }, ref) => (
  <button
    onClick={(event) => {
      event.preventDefault();
      onClick(event);
    }}
    ref={ref}
  >
    Day {value ? value.toString() : null}
  </button>
));

export default DateButton;
