import React, { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import "./breadcrumbs.css";
import { AppContext } from "../../App";

function Breadcrumbs({ productName }) {
  const { initialState, setInitialState } = useContext(AppContext);
  const location = useLocation();
  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;
      if (/.*\d.*/.test(crumb)) {
        return (
          <li className="crumb" key={crumb}>
            {productName}
          </li>
        );
      }

      return (
        <li className="crumb" key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </li>
      );
    });

  const breadcrumbsWithHome = [
    <li className="crumb" key="home">
      <Link to="/">Home</Link>
    </li>,
    ...crumbs,
  ];

  return (
    <nav
      className="breadcrumbs"
      onClick={() => {
        setInitialState(!initialState);
      }}
    >
      <ul>{breadcrumbsWithHome}</ul>
    </nav>
  );
}

export default Breadcrumbs;
