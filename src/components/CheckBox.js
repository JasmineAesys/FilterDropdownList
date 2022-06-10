import React, { useCallback, useContext } from "react";
import { ButtonState, StatusCheckBoxChechAll } from "./DropDown";

function CheckBox({ name, value, indexGroup, indexCheckBox, checked }) {
  const { buttonState, setButtonState } = useContext(ButtonState);
  const { setButtonAllChecked } = useContext(StatusCheckBoxChechAll);

  //tiene traccia dello stato delle checkbox e mostra se sono chekkate o meno
  const handleCheckbox = useCallback(() => {
    const stateCopy = [...buttonState];
    stateCopy[indexGroup].values[indexCheckBox].checked = !stateCopy[indexGroup].values[indexCheckBox].checked;
    setButtonState(stateCopy);
    areAllChecked();
  }, []);

  //quando tutti i singoli checkbox sono checkati, il tasto check all si illuminerà da solo
  const areAllChecked = () => {
    const xx = buttonState.flatMap((el) => el.values);
    const yy = xx.every((currentvalue) => currentvalue.checked === true);

    yy ? setButtonAllChecked(true) : setButtonAllChecked(false);
  };

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
