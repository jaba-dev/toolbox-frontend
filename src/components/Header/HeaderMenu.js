import { NavLink, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import {
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import "./headermenu.css";
import CartItems from "./CartItems";
import SearchBar from "./SearchBar";
import ProductCategories from "./ProductCategories";
import SignInModal from "../SignInModal/SignInModal";
import useFetch from "../Hooks/useFetch";
import Spinner from "../Spinner/Spinner";

function HeaderMenu() {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState(
    ProductCategories()
  );
  const [spinner, setSpinner] = useState(false);
  const {
    baseURL,
    initialState,
    totalQuantity,
    isModalOpen,
    setIsModalOpen,
    isLoggedIn,
    logout,
    globalSpinner,
  } = useContext(AppContext);
  const { data, loading, error } = useFetch(`${baseURL}/api/products`, {});
  const [cartItemsExpanded, setCartItemsExpanded] = useState(false);
  const [headerMenuState, setHeaderMenuState] = useState({
    account_bottom: false,
    cart_bottom: false,
    categories_bottom: false,
  });
  const updateProductCategories = (id) => {
    let newProductCategories = productCategories;
    newProductCategories.forEach((item, innerId) => {
      if (id === innerId) {
        item.expanded = !item.expanded;
      } else {
        item.expanded = false;
      }
    });
    setProductCategories([...newProductCategories]);
  };

  useEffect(() => {
    // if (loading) {
    //   console.log(loading);
    // }
    if (data) {
      setProducts(data);
    }
    // if (error) {
    //   console.log(error);
    // }
  }, [data, loading, error]);

  useEffect(() => {
    setHeaderMenuState(
      {
        account_bottom: false,
        cart_bottom: false,
        categories_bottom: false,
      },
      []
    );
  }, [initialState]);
  useEffect(() => {
    if (!cartItemsExpanded) {
      setHeaderMenuState({
        account_bottom: false,
        cart_bottom: false,
        categories_bottom: false,
      });
      document.body.classList.remove("popup-open");
    }
  }, [cartItemsExpanded]);
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="menu">
        <div
          className={
            !headerMenuState.categories_bottom
              ? "categories"
              : "categories_active"
          }
        >
          <div
            className="categories_top"
            onClick={() => {
              setHeaderMenuState({
                ...headerMenuState,
                categories_bottom: !headerMenuState.categories_bottom,
                account_bottom: false,
                cart_bottom: false,
              });
            }}
          >
            <FaBars />
            <NavLink>Categories</NavLink>
            <FaChevronDown
              className={
                headerMenuState.categories_bottom ? "flip_chevron" : ""
              }
            />
          </div>
          <div
            className={
              headerMenuState.categories_bottom ? "categories_bottom" : "hide"
            }
          >
            {productCategories.map((item, id) => {
              return (
                <div className="product_categories" key={id}>
                  <div
                    className="product_categories_top"
                    onClick={() => {
                      updateProductCategories(id);
                    }}
                  >
                    <Link to={`/${item.url}`}>{item.title}</Link>
                    {item.expanded ? <FaChevronDown /> : <FaChevronRight />}
                  </div>
                  {item.expanded &&
                    item.subCategories.map((subItem, subId) => {
                      return (
                        <div className="sub_category" key={subId}>
                          <Link to={`/${item.url}/${subItem.url}`}>
                            {subItem.title}
                          </Link>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
        <SearchBar data={products} />
        <div
          className={
            !headerMenuState.account_bottom ? "account" : "account_active"
          }
          onClick={() => {
            setHeaderMenuState({
              account_bottom: !headerMenuState.account_bottom,
              cart_bottom: false,
              categories_bottom: false,
            });
          }}
        >
          <div className="account_top">
            <FaUserCircle />
            <span>Account</span>
            <FaChevronDown
              className={
                headerMenuState.account_bottom ? "flip_chevron" : "chevron_hide"
              }
            />
          </div>
          <div
            className={
              headerMenuState.account_bottom ? "account_bottom" : "hide"
            }
          >
            {isLoggedIn === false ? (
              <Link
                className="sign_in_link"
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                }}
              >
                Sign in
              </Link>
            ) : (
              <Link
                className="sign_in_link"
                onClick={() => {
                  logout();
                }}
              >
                Sign out
              </Link>
            )}
            {isLoggedIn === false ? (
              <Link className="sign_up_link" to="/signup">
                Sign up
              </Link>
            ) : (
              <Link className="sign_up_link" to="/profile">
                My profile
              </Link>
            )}
          </div>
        </div>
        <div
          className={!headerMenuState.cart_bottom ? "cart" : "cart_active"}
          onClick={() => {
            setHeaderMenuState({
              account_bottom: false,
              cart_bottom: !headerMenuState.cart_bottom,
              categories_bottom: false,
            });
            setCartItemsExpanded(!cartItemsExpanded);
            document.body.classList.add("popup-open");
          }}
        >
          <div className="cart_top">
            {totalQuantity > 0 && (
              <span className="quantity">{totalQuantity}</span>
            )}
            <FaShoppingCart />
            <span>Cart</span>
            <FaChevronDown
              className={
                headerMenuState.cart_bottom ? "flip_chevron" : "chevron_hide"
              }
            />
          </div>
        </div>
      </div>
      <CartItems
        cartItemsExpanded={cartItemsExpanded}
        setCartItemsExpanded={setCartItemsExpanded}
      />
      <SignInModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      {globalSpinner && (
        <Spinner
          styles={{
            position: "fixed",
            top: 0,
            height: "100vh",
            width: "100%",
            margin: 0,
          }}
        />
      )}
    </>
  );
}

export default HeaderMenu;
