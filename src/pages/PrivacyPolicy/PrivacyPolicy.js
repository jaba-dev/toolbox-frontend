import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";
function PrivacyPolicy() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Privacy Policy"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default PrivacyPolicy;
