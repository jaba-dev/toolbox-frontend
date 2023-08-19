import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";

function HandScrewdrivers() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Screwdrivers"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default HandScrewdrivers;
