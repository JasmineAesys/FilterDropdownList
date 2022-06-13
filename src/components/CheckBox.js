import React, { useCallback, useContext } from "react";
import _ from "lodash";
import { ButtonState } from "./DropDown";

function CheckBox({ name, value, indexGroup, indexCheckBox, checked, checkAll }) {
  const { buttonState, setButtonState } = useContext(ButtonState);

  //tiene traccia dello stato delle checkbox e mostra se sono chekkate o meno
  const handleCheckbox = useCallback(() => {
    const stateCopy = _.clone(buttonState);
    stateCopy[indexGroup].values[indexCheckBox].checked = !stateCopy[indexGroup].values[indexCheckBox].checked;
    setButtonState(stateCopy);
    checkAll();
  }, [buttonState, checkAll, indexCheckBox, indexGroup, setButtonState]);

  return (
    <div>
      <label>
        <input type="checkbox" onChange={() => handleCheckbox()} checked={checked} />
        {name} {value}
      </label>
    </div>
  );
}

export default CheckBox;
