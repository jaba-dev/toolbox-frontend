import { useContext } from "react";
import { AppContext } from "../../App";
import { ReactComponent as BarsSortIcon } from "../../assets/icons/bars-sort-icon.svg";
import { ReactComponent as Customize } from "../../assets/icons/customize.svg";
import "./productlistingheader.css";
function ProductListingHeader({
  products,
  setDrawerExpanded,
  drawerExpanded,
  windowWidth,
  filterDrawerExpanded,
  setFilterDrawerExpanded,
}) {
  const { initialState, setInitialState } = useContext(AppContext);
  return (
    <div
      className="productListing-header"
      onClick={() => {
        setInitialState(!initialState);
      }}
    >
      <div>
        <div className="productListing-text">{products.length} PRODUCTS</div>
        <div className="productListing-buttons">
          <button
            onClick={() => {
              setFilterDrawerExpanded(!filterDrawerExpanded);
            }}
          >
            {windowWidth >= 1024 ? "CUSTOMIZE" : <Customize />}
          </button>
          <button
            onClick={() => {
              setDrawerExpanded(!drawerExpanded);
            }}
          >
            {windowWidth >= 1024 ? (
              <span>
                SORT BY &nbsp;-&nbsp;
                <strong>RECOMMENDED</strong>
              </span>
            ) : (
              <BarsSortIcon />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductListingHeader;
