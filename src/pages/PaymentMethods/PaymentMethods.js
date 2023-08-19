import React, { useContext } from "react";
import UnderConstructionPage from "../underConstructionPage/UnderConstructionPage";
import { AppContext } from "../../App";
function PaymentMethods() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <UnderConstructionPage
      title="Payment methods"
      initialState={initialState}
      setInitialState={setInitialState}
    />
  );
}

export default PaymentMethods;
