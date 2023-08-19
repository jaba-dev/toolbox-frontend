import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";
function HowToBuy() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="How to buy?"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default HowToBuy;
