import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default RootLayout;
