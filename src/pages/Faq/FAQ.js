import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";
function FAQ() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="FAQ"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default FAQ;
