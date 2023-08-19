import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./headertopnav.css";
import { AppContext } from "../../App";
import { FaBars, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function HeaderTopNav() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const { windowWidth, initialState, setInitialState } = useContext(AppContext);
  if (windowWidth >= 768) {
    return (
      <div
        className="header_top"
        onClick={() => {
          setInitialState(!initialState);
        }}
      >
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/faq">FAQ</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  return (
    <div className={sidebarExpanded ? "sidebar_expanded" : "sidebar_collapsed"}>
      {!sidebarExpanded ? (
        <div
          className="sidebar_icons"
          onClick={() => {
            setSidebarExpanded(!sidebarExpanded);
          }}
        >
          <FaBars />
          <FaCaretDown />
        </div>
      ) : (
        <div
          className="sidebar_icons"
          onClick={() => {
            setSidebarExpanded(!sidebarExpanded);
          }}
        >
          <MdClose />
          <FaCaretUp />
        </div>
      )}
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
          <li>
            <NavLink to="/faq">FAQ</NavLink>
          </li>
          <li>
            <NavLink to="/our-stores">Our Stores</NavLink>
          </li>
          <li>
            <NavLink to="/how-to-buy">How To Buy?</NavLink>
          </li>
          <li>
            <NavLink to="/payment-methods">Payment Methods</NavLink>
          </li>
          <li>
            <NavLink to="/delivery">Delivery</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HeaderTopNav;
