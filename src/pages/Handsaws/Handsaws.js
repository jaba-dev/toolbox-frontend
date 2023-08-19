import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";

function Handsaws() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Handsaws"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default Handsaws;
