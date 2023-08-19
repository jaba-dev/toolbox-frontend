import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";
function Delivery() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Delivery Service Page"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default Delivery;
