import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Button.css";
import CheckBox from "./CheckBox";
import { ButtonState } from "./DropDown";

function Button({ name, changeButtonState, visible, objectIndex }) {
  const { buttonState, setButtonState } = useContext(ButtonState);
  const [allGroupCheck, setAllGroupCheck] = useState(false);

  //Implementa il funzionamento della subselect, cliccando tutto il gruppo sottostante o deselezionandolo
  function setSubSelect(e) {
    const stateCopy = [...buttonState];
    stateCopy[objectIndex].values.map((el) => {
      return (el.checked = e.target.checked);
    });
    setButtonState(stateCopy);
  }

  //Controlla che i checkbox dello stesso gruppo siano tutti checked o meno, illuminando
  //o meno il pulsante subselect
  const groupCheck = useCallback(() => {
    const isEveryClicked = (currentValue) => currentValue === true;
    const stateCopy = [...buttonState];
    const everyClicked = Object.values(
      stateCopy[objectIndex].values.map((el) => {
        return el.checked;
      })
    ).every(isEveryClicked);

    everyClicked ? setAllGroupCheck(true) : setAllGroupCheck(false);
  }, [buttonState, objectIndex]);

  useEffect(() => {
    groupCheck();
  }, [buttonState]);

  return (
    <>
      <div
        className="buttons_container"
        onClick={() => {
          changeButtonState();
        }}
      >
        {name}
      </div>
      {name !== "Group3" && visible && (
        <CheckBox checked={allGroupCheck} onChange={(e) => setSubSelect(e)} name={"Subselect All"} />
      )}
    </>
  );
}

export default Button;
