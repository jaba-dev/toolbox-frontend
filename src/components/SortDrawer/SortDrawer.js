import { useEffect } from "react";
import { ReactComponent as XMark } from "../../assets/icons/xmark.svg";
import "./sortdrawer.css";
function SortDrawer({
  drawerExpanded,
  setDrawerExpanded,
  setSortByPriceAsc,
  setSortByPriceDesc,
  setSortByRecommended,
}) {
  useEffect(() => {
    if (drawerExpanded) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [drawerExpanded]);

  return (
    <div
      className={`drawer ${drawerExpanded ? "drawer-expanded" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setTimeout(() => {
            setDrawerExpanded(!drawerExpanded);
          }, 0);
        }
      }}
    >
      <div className="drawer-content">
        <div className="drawer-content-header">
          <h4>Sort by</h4>
          <button
            onClick={() => {
              setDrawerExpanded(!drawerExpanded);
            }}
          >
            <span>CLOSE</span> <XMark />
          </button>
        </div>
        <ul className="product-listing">
          <li>
            <div>
              <input
                type="radio"
                name="sort"
                value="recommended"
                defaultChecked
                onChange={() => {
                  setSortByRecommended(true);
                  setSortByPriceAsc(false);
                  setSortByPriceDesc(false);
                }}
              />
              <div>recommended</div>
            </div>
          </li>
          <li>
            <div>
              <input
                type="radio"
                name="sort"
                value="priceAsc"
                onChange={() => {
                  setSortByPriceAsc(true);
                  setSortByPriceDesc(false);
                  setSortByRecommended(false);
                }}
              />
              <div>Price - lowest first</div>
            </div>
          </li>
          <li>
            <div>
              <input
                type="radio"
                name="sort"
                value="priceDesc"
                onChange={() => {
                  setSortByPriceDesc(true);
                  setSortByPriceAsc(false);
                  setSortByRecommended(false);
                }}
              />
              <div>Price - highest first</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SortDrawer;
