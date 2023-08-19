import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";
function TermsAndConditions() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Terms And Conditions"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default TermsAndConditions;
