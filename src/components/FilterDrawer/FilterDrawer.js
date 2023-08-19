import React, { useEffect } from "react";
import "./filterdrawer.css";
import { ReactComponent as XMark } from "../../assets/icons/xmark.svg";

function FilterDrawer({ filterDrawerExpanded, setFilterDrawerExpanded }) {
  useEffect(() => {
    if (filterDrawerExpanded) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [filterDrawerExpanded]);
  return (
    <div
      className={`filter-drawer ${
        filterDrawerExpanded ? "filter-drawer-expanded" : ""
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setTimeout(() => {
            setFilterDrawerExpanded(!filterDrawerExpanded);
          }, 0);
        }
      }}
    >
      <div className="filter-drawer-content">
        <div className="filter-drawer-header">
          <button
            onClick={() => {
              setFilterDrawerExpanded(!filterDrawerExpanded);
            }}
          >
            <span>CLOSE</span>
            <XMark />
          </button>
        </div>
        <div className="filter-drawer-footer">
          <h4>categories</h4>
          <p>We're still working on this feature to make it work!</p>
          <p>Please check back later for the latest updates.</p>
        </div>
      </div>
    </div>
  );
}

export default FilterDrawer;
