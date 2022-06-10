import React, { useState, createContext, useMemo, useCallback } from "react";
import "./DropDown.css";
import Button from "./Button";
import CheckBox from "./CheckBox";
import OptionsClicked from "./OptionsClicked";

export const ButtonState = createContext();
export const StatusCheckBoxChechAll = createContext();

function DropDown({ data }) {
  //inizializzazione della struttura dati ButtonState che terrà traccia dei menu aperti e delle checkbox checked
  //struttura di supporto a DATA con aggiunta lo stato open che determina la visibilità delle checkbox in sottomenu
  //e lo stato checked per ogni checkbox per tenere traccia del loro stato
  const initializeMemoizeData = useMemo(
    () =>
      data.map((el) => {
        return {
          ...el,
          open: false,
          values: el.values.map((item) => ({ ...item, checked: false })),
        };
      }),
    []
  );
  const [showgroups, setShowgroups] = useState(true); //stato del button primario a tendina aperto o chiuso
  const [buttonState, setButtonState] = useState(initializeMemoizeData); //struttura dati di supporto
  const [buttonAllChecked, setButtonAllChecked] = useState(false); //stato del checkall

  //determina se il tasto check all è stato cliccato o meno e di conseguenza cambia lo stato dei checkbox sottostanti
  const handleSelectAll = useCallback(
    (e) => {
      setButtonAllChecked(e.target.checked);
      const stateCopy = [...buttonState];
      buttonState.forEach((el, indexButtonState) => {
        el.values.forEach(
          (elinterno, indexValues) => (stateCopy[indexButtonState].values[indexValues].checked = e.target.checked)
        );
      });
      setButtonState(stateCopy);
    },
    [buttonState]
  );

  return (
    <StatusCheckBoxChechAll.Provider value={{ buttonAllChecked, setButtonAllChecked }}>
      <ButtonState.Provider value={{ buttonState, setButtonState }}>
        <div className="dropdown_container">
          DropDown Selector
          <div className="selectors">
            <h2 onClick={() => setShowgroups(!showgroups)}>Header Selector</h2>
            {showgroups && (
              <>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => setButtonAllChecked(!buttonAllChecked)}
                    checked={buttonAllChecked}
                    onClick={(e) => {
                      handleSelectAll(e);
                    }}
                  />
                  {buttonAllChecked ? "Decheck All" : "Check All"}
                </label>
                <OptionsClicked />

                {buttonState.map((button, indexGroup) => {
                  return (
                    <div className="buttons" key={indexGroup}>
                      <Button objectIndex={indexGroup} name={button.groupName} />
                      {button.open === true
                        ? button.values.map((checkboxValues, indexCheckBox) => {
                            return (
                              <div key={indexCheckBox}>
                                <CheckBox
                                  indexCheckBox={indexCheckBox}
                                  indexGroup={indexGroup}
                                  name={checkboxValues.name}
                                  value={checkboxValues.value}
                                  checked={checkboxValues.checked}
                                />
                              </div>
                            );
                          })
                        : ""}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </ButtonState.Provider>
    </StatusCheckBoxChechAll.Provider>
  );
}

export default DropDown;
