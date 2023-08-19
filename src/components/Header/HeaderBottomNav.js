import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./headerbottomnav.css";
import { AppContext } from "../../App";

function HeaderBottomNav() {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <>
      <nav
        className="header_bottom_nav"
        onClick={() => {
          setInitialState(!initialState);
        }}
      >
        <ul>
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
    </>
  );
}

export default HeaderBottomNav;
