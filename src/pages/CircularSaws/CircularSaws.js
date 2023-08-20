import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";
import Pagination from "../../components/Pagination/Pagination";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductList from "../../components/ProductList/ProductList";
import ProductListingHeader from "../../components/ProductListingHeader/ProductListingHeader";
import SortDrawer from "../../components/SortDrawer/SortDrawer";
import useFetch from "../../components/Hooks/useFetch";
import RootLayout from "../../components/Layouts/RootLayout";
import Spinner from "../../components/Spinner/Spinner";
import FilterDrawer from "../../components/FilterDrawer/FilterDrawer";
function CircularSaws() {
  const { baseURL, windowWidth, cartUpdate, setCartUpdate, cart, setCart } =
    useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [drawerExpanded, setDrawerExpanded] = useState(false);
  const [sortByRecommended, setSortByRecommended] = useState(true);
  const [sortByPriceAsc, setSortByPriceAsc] = useState(false);
  const [sortByPriceDesc, setSortByPriceDesc] = useState(false);
  const [filterDrawerExpanded, setFilterDrawerExpanded] = useState(false);
  const { data, loading, error } = useFetch(`${baseURL}/api/products`, {});

  const addToCart = (articleNumber) => {
    const existingItem = cart.find(
      (item) => item.articleNumber === articleNumber
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.articleNumber === articleNumber
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { articleNumber, quantity: 1 }]);
    }
  };

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

  useEffect(() => {
    // if (loading) {
    //   console.log(loading);
    // }
    if (data) {
      setProducts(data);
      const filteredData = data.filter((item) => {
        if (
          item.name.toLowerCase().includes("circular") &&
          item.categories.includes("power tools")
        ) {
          return item;
        }
      });
      setProducts(filteredData);
    }
    // if (error) {
    //   console.log(error);
    // }
  }, [data, loading, error]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => [setCurrentPage(pageNumber)];
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
      <ProductListingHeader
        filterDrawerExpanded={filterDrawerExpanded}
        setFilterDrawerExpanded={setFilterDrawerExpanded}
        windowWidth={windowWidth}
        drawerExpanded={drawerExpanded}
        setDrawerExpanded={setDrawerExpanded}
        products={products}
      />
      <ProductList
        currentProducts={currentProducts}
        addToCart={addToCart}
        setCartUpdate={setCartUpdate}
        cartUpdate={cartUpdate}
        baseURL={baseURL}
      />
      {products.length > 10 ? (
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      ) : (
        ""
      )}
      <FilterDrawer
        filterDrawerExpanded={filterDrawerExpanded}
        setFilterDrawerExpanded={setFilterDrawerExpanded}
      />
      <SortDrawer
        drawerExpanded={drawerExpanded}
        setDrawerExpanded={setDrawerExpanded}
        sortByPriceAsc={sortByPriceAsc}
        setSortByPriceAsc={setSortByPriceAsc}
        sortByPriceDesc={sortByPriceDesc}
        setSortByPriceDesc={setSortByPriceDesc}
        setSortByRecommended={setSortByRecommended}
        sortedByRecommended={sortByRecommended}
      />
    </RootLayout>
  );
}

export default CircularSaws;
