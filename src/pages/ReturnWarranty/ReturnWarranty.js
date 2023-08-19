import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";
function ReturnWarranty() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Return-warranty"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default ReturnWarranty;
