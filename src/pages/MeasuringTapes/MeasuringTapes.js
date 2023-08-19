import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";

function MeasuringTapes() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Measuring tapes"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default MeasuringTapes;
