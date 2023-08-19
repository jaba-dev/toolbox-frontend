import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";

function Jigsaws() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Jigsaws"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default Jigsaws;
