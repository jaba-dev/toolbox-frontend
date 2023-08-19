import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";

function OtherPowerTools() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Other tools"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default OtherPowerTools;
