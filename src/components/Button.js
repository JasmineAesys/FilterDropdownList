import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Button.css";
import SubSelectCheckbox from "./SubSelectCheckbox";
import { ButtonState } from "./DropDown";
import { subSelectMenu } from "../data";

function Button({ name, objectIndex }) {
  const [allGroupCheck, setAllGroupCheck] = useState(false);
  const { buttonState, setButtonState } = useContext(ButtonState);

  //determina se il button dropdown composto dai 3 grandi elementi sia con il menu a tendina aperto o chiuso,
  //cambiando la proprietà open aggiunta in precedenza per il monitoraggio dello stato
  const changeButtonState = () => {
    const stateCopy = [...buttonState];
    stateCopy[objectIndex].open = !stateCopy[objectIndex].open;
    setButtonState(stateCopy);
  };

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
  }, [buttonState, objectIndex, setAllGroupCheck]);

  useEffect(() => {
    groupCheck();
  }, [buttonState, groupCheck]);

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
      {subSelectMenu.map((el) => {
        if (el.groupName === buttonState[objectIndex].groupName && buttonState[objectIndex].open) {
          return (
            <SubSelectCheckbox
              key={objectIndex}
              objectIndex={objectIndex}
              name="Select All"
              checked={allGroupCheck}
              controllo={groupCheck}
            />
          );
        }
      })}
    </>
  );
}

export default Button;
