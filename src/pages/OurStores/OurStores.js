import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";
function HowToBuy() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Our stores"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default HowToBuy;
