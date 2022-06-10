import React from "react";
import "./CheckBox.css";

function CheckBox({ name, value, onChange, checked }) {
  return (
    <div>
      <label>
        <input type="checkbox" onChange={onChange} checked={checked} />
        {name} {value}
      </label>
    </div>
  );
}

export default CheckBox;
