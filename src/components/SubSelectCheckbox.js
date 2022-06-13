import React, { useContext } from "react";
import { ButtonState } from "./DropDown";
import _ from "lodash";

function SubSelectCheckbox({ name, objectIndex, checked, checkAll }) {
  const { buttonState, setButtonState } = useContext(ButtonState);

  //Implementa il funzionamento della subselect, cliccando tutto il gruppo sottostante o deselezionandolo
  function setSubSelect(e) {
    const stateCopy = _.clone(buttonState);
    stateCopy[objectIndex].values.forEach((el) => {
      el.checked = e.target.checked;
    });
    setButtonState(stateCopy);
    checkAll();
  }

  return (
    <div>
      <label>
        <input type="checkbox" onChange={(e) => setSubSelect(e)} checked={checked} />
        {name}
      </label>
    </div>
  );
}

export default SubSelectCheckbox;
