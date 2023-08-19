import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";
function Contact() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Contact us"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default Contact;
