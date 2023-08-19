import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";

function AngleGrinders() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Angle grinders"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default AngleGrinders;
