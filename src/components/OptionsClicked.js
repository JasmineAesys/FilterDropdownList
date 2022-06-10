import React, { useContext } from "react";
import { ButtonState } from "./DropDown";
import List from "./List";

function OptionsClicked() {
  const { buttonState } = useContext(ButtonState);
  return (
    <div>
      <ul>
        List Item Checked :
        {buttonState.map((el) => {
          return el.values.map((checkbox) => {
            if (checkbox.checked === true) {
              return <List key={checkbox.value} name={checkbox.name} value={checkbox.value} />;
            } else return "";
          });
        })}
      </ul>
    </div>
  );
}

export default OptionsClicked;
