import React, { useContext } from "react";
import { ButtonState } from "./DropDown";

function SubSelectCheckbox({ name, objectIndex, checked, controllo }) {
  const { buttonState, setButtonState } = useContext(ButtonState);

  //Implementa il funzionamento della subselect, cliccando tutto il gruppo sottostante o deselezionandolo
  function setSubSelect(e) {
    const stateCopy = [...buttonState];
    stateCopy[objectIndex].values.forEach((el) => {
      el.checked = e.target.checked;
    });
    setButtonState(stateCopy);
  }

  return (
    <div>
      <label>
        <input type="checkbox" onChange={(e) => setSubSelect(e)} checked={checked} onClick={() => controllo()} />
        {name}
      </label>
    </div>
  );
}

export default SubSelectCheckbox;
