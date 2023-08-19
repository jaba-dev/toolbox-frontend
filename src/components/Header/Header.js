import React from "react";
import HeaderTopNav from "./HeaderTopNav";
import HeaderBottomNav from "./HeaderBottomNav";
import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <header>
      <HeaderTopNav />
      <HeaderBottomNav />
      <HeaderMenu />
    </header>
  );
}

export default Header;
