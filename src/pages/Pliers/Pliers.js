import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";

function Pliers() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Pliers"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default Pliers;
