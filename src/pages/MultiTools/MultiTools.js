import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";

function MultiTools() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Multi-tools"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default MultiTools;
