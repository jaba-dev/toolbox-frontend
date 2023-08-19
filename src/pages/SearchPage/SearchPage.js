import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ReactComponent as BarsSortIcon } from "../../assets/icons/bars-sort-icon.svg";
import { ReactComponent as Customize } from "../../assets/icons/customize.svg";
import "./searchpage.css";
import SortDrawer from "../../components/SortDrawer/SortDrawer";
import { AppContext } from "../../App";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import useFetch from "../../components/Hooks/useFetch";
import RootLayout from "../../components/Layouts/RootLayout";
import Spinner from "../../components/Spinner/Spinner";

function SearchPage() {
  const { baseURL, prevSearchValue } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [queryParams, setQueryParams] = useState(
    new URLSearchParams(location.search)
  );
  const [drawerExpanded, setDrawerExpanded] = useState(false);
  const [sortByRecommended, setSortByRecommended] = useState(true);
  const [sortByPriceAsc, setSortByPriceAsc] = useState(false);
  const [sortByPriceDesc, setSortByPriceDesc] = useState(false);

  const { data, loading, error } = useFetch(`${baseURL}/api/products`, {});

  useEffect(() => {
    const queryParamValue = queryParams.get("query");
    setSearchQuery(queryParamValue);
    // if (loading) {
    //   console.log(loading);
    // }
    if (data) {
      if (queryParamValue) {
        const searchResults = data.filter((item) => {
          return item.name.toLowerCase().includes(queryParamValue);
        });
        setProducts(searchResults);
      } else if (prevSearchValue) {
        const searchResults = data.filter((item) => {
          return item.name.toLowerCase().includes(prevSearchValue);
        });
        setProducts(searchResults);
      }
    }
    // if (error) {
    //   console.log(error);
    // }
  }, [data, loading, error, queryParams]);

  useEffect(() => {
    setQueryParams(new URLSearchParams(location.search));
  }, [location.search]);
  useEffect(() => {
    if (sortByPriceAsc) {
      setProducts((prevState) => {
        return prevState.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      });
    }
    if (sortByPriceDesc) {
      setProducts((prevState) => {
        return prevState.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      });
    }
    if (sortByRecommended) {
      setProducts((prevState) => {
        return prevState.sort((a, b) => a.id - b.id);
      });
    }
  }, [sortByPriceAsc, sortByPriceDesc, sortByRecommended]);
  if (loading) {
    return (
      <RootLayout>
        <Spinner />
      </RootLayout>
    );
  }
  return (
    <RootLayout>
      <Breadcrumbs />
      <div className="search-page">
        <div className="search-header">
          <div className="search-hits">
            <span>{products.length}</span>
            &nbsp;results on&nbsp;
            <span>{searchQuery || prevSearchValue}</span>
          </div>
          <div className="search-buttons">
            <button>
              <span>FILTER</span>
              <Customize />
            </button>
            <button
              onClick={() => {
                setDrawerExpanded(!drawerExpanded);
              }}
            >
              <span>
                SORT
                <BarsSortIcon className="bar-sort" />
              </span>
            </button>
          </div>
        </div>
        <div className="search-products">
          {products.map((item) => {
            return (
              <div key={item._id} className="product-entity">
                <div className="product-image">
                  <Link to={item._id}>
                    {" "}
                    <img src={item.imageURL} alt={item.name} />
                  </Link>
                </div>
                <div className="product-info">
                  <h2>
                    <Link to={item._id}>{item.name}</Link>
                  </h2>
                  <div className="artnr">{item.articleNumber}</div>
                  <div className="product-breadcrumbs">
                    <ul>
                      {item.categories.map((cat, ind) => {
                        if (cat !== "all products") {
                          return (
                            <li key={ind}>
                              <Link>{cat}</Link>
                              <span>/</span>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
                <div className="product-price">
                  <span>{item.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SortDrawer
        drawerExpanded={drawerExpanded}
        setDrawerExpanded={setDrawerExpanded}
        setSortByPriceAsc={setSortByPriceAsc}
        setSortByPriceDesc={setSortByPriceDesc}
        setSortByRecommended={setSortByRecommended}
      />
    </RootLayout>
  );
}

export default SearchPage;
