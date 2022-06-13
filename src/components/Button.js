import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Button.css";
import SubSelectCheckbox from "./SubSelectCheckbox";
import { ButtonState, StatusCheckBoxChechAll } from "./DropDown";
import { subSelectMenu } from "../data";
import CheckBox from "./CheckBox";
import _ from "lodash";

function Button({ name, objectIndex, open }) {
  const [allGroupCheck, setAllGroupCheck] = useState(false);
  const { buttonState, setButtonState } = useContext(ButtonState);
  const { setButtonAllChecked } = useContext(StatusCheckBoxChechAll);

  //determina se il button dropdown composto dai 3 grandi elementi sia con il menu a tendina aperto o chiuso,
  //cambiando la proprietà open aggiunta in precedenza per il monitoraggio dello stato
  const openGroupMenu = () => {
    const stateCopy = _.clone(buttonState);
    stateCopy[objectIndex].open = !stateCopy[objectIndex].open;
    setButtonState(stateCopy);
  };

  //Controlla che i checkbox dello stesso gruppo siano tutti checked o meno, illuminando
  //o meno il pulsante subselect
  const groupMenuAllChecked = useCallback(() => {
    const everyClicked = Object.values(
      buttonState[objectIndex].values.map((el) => {
        return el.checked;
      })
    ).every((val) => val === true);

    everyClicked ? setAllGroupCheck(true) : setAllGroupCheck(false);
  }, [buttonState, objectIndex, setAllGroupCheck]);
  useEffect(() => {
    groupMenuAllChecked();
  }, [buttonState, groupMenuAllChecked]);

  //quando tutti i singoli checkbox sono checkati, il tasto check all si illuminerà da solo, la funzione viene passata ai figli
  const areAllChecked = useCallback(() => {
    const mapOfAllValuesCheck = buttonState.flatMap((el) => el.values).every((val) => val.checked === true);
    mapOfAllValuesCheck ? setButtonAllChecked(true) : setButtonAllChecked(false);
  }, [buttonState, setButtonAllChecked]);

  return (
    <>
      <div
        className="buttons_container"
        onClick={() => {
          openGroupMenu();
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
              checkAll={areAllChecked}
            />
          );
        } else return null;
      })}
      {open &&
        buttonState[objectIndex].values.map((checkboxValues, indexCheckBox) => {
          return (
            <div key={indexCheckBox}>
              <CheckBox
                indexCheckBox={indexCheckBox}
                indexGroup={objectIndex}
                name={checkboxValues.name}
                value={checkboxValues.value}
                checked={checkboxValues.checked}
                checkAll={areAllChecked}
              />
            </div>
          );
        })}
    </>
  );
}

export default Button;
