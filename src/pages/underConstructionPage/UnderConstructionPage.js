import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import RootLayout from "../../components/Layouts/RootLayout";
import "./underconstructionpage.css";

function UnderConstructionPage({ title, initialState, setInitialState }) {
  return (
    <RootLayout>
      <Breadcrumbs />
      <div
        className="under-construction-page"
        onClick={() => setInitialState(!initialState)}
      >
        <h1>{title}</h1>
        <p>This page is currently under construction.</p>
        <p>Please check back later for updates.</p>
      </div>
    </RootLayout>
  );
}

export default UnderConstructionPage;
