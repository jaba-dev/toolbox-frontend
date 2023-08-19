import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";

function OtherHandTools() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Other hand tools"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default OtherHandTools;
