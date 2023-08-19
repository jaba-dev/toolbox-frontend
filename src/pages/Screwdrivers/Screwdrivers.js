import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";

function Screwdrivers() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Screwdrivers"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default Screwdrivers;
