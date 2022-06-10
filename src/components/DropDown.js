import React, { useState, createContext, useMemo, useCallback } from "react";
import "./DropDown.css";
import Button from "./Button";
import CheckBox from "./CheckBox";
import data from "../data";
import OptionsClicked from "./OptionsClicked";

export const ButtonState = createContext();

function DropDown() {
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
  const [showgroups, setShowgroups] = useState(true);
  const [buttonState, setButtonState] = useState(initializeMemoizeData);
  const [checked, setChecked] = useState(false);

  //determina se il button dropdown composto dai 3 grandi elementi sia con il menu a tendina aperto o chiuso,
  //cambiando la proprietà open aggiunta in precedenza per il monitoraggio dello stato

  const changeButtonState = (indexClicked) => {
    const stateCopy = buttonState;
    const newState = stateCopy.map((el, i) => {
      if (i === indexClicked) {
        return {
          ...el,
          open: !el.open,
        };
      } else return { ...el };
    });
    setButtonState(newState);
  };

  //tiene traccia dello stato delle checkbox e mostra se sono chekkate o meno
  const statusCheckbox = useCallback(
    (targetGroup, indexCheckBokClicked, indexTarget) => {
      console.log("Renderizzo");
      let stateCopy = [...buttonState];
      targetGroup.values.map((valuesCheckbox, index) => {
        if (valuesCheckbox.name === targetGroup.values[indexCheckBokClicked].name) {
          stateCopy[indexTarget].values[index].checked = !stateCopy[indexTarget].values[index].checked;
          return setButtonState(stateCopy);
        } else return "";
      });
    },
    [buttonState]
  );

  //determina se il tasto check all è stato cliccato o meno e di conseguenza cambia lo stato dei checkbox sottostanti
  const CheckAllClicked = (e) => {
    setChecked(e.target.checked);
    const stateCopy = [...buttonState];
    buttonState.map((el, indexButtonState) => {
      return el.values.map((elinterno, indexValues) => {
        return (stateCopy[indexButtonState].values[indexValues].checked = e.target.checked);
      });
    });
    setButtonState(stateCopy);
  };

  //quando tutti i singoli checkbox sono checkati, il tasto check all si illuminerà da solo
  function areAllChecked() {
    for (let i = 0; i < buttonState.length; i++) {
      for (let j = 0; j < buttonState[i].values.length; j++) {
        if (!buttonState[i].values[j].checked) {
          setChecked(false);
          return;
        }
      }
    }
    setChecked(true);
  }

  //doppia chiamata per le funzioni: spunta le checkbox che vengono cliccate e in più controlla
  //se tutte sono cliccate, interagendo con lo stato del select all
  function doubleCall(targetGroup, indexCheckBokClicked, indexTarget) {
    statusCheckbox(targetGroup, indexCheckBokClicked, indexTarget);
    areAllChecked();
  }

  //onChange della checkbox checkAll
  const handleClick = () => setChecked(!checked);

  return (
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
                  onChange={() => handleClick()}
                  checked={checked}
                  onClick={(e) => {
                    CheckAllClicked(e);
                  }}
                />
                {checked ? "Decheck All" : "Check All"}
              </label>
              <OptionsClicked />
              <div className="buttons">
                {buttonState.map((button, i) => {
                  return (
                    <div className="buttons" key={i}>
                      <Button
                        objectIndex={i}
                        visible={button.open}
                        name={button.groupName}
                        changeButtonState={() => {
                          changeButtonState(i);
                        }}
                      />
                      {buttonState.map((internalObj, index) => {
                        if (internalObj.open && internalObj.groupName === button.groupName) {
                          return internalObj.values.map((element, j) => {
                            return (
                              <div key={j}>
                                <CheckBox
                                  checked={element.checked}
                                  onChange={(e) => doubleCall(internalObj, j, index)}
                                  name={element.name}
                                  value={element.value}
                                />
                              </div>
                            );
                          });
                        } else return "";
                      })}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </ButtonState.Provider>
  );
}

export default DropDown;
