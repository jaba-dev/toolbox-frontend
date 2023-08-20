import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import FAQ from "./pages/Faq/FAQ";
import useWindowWidth from "./components/Hooks/useWindowWidth";
import AllProducts from "./pages/AllProducts/AllProducts";
import Product from "./pages/Product/Product";
import SearchPage from "./pages/SearchPage/SearchPage";
import HandTools from "./pages/HandTools/HandTools";
import Hammers from "./pages/Hammers/Hammers";
import Delivery from "./pages/Delivery/Delivery";
import PaymentMethods from "./pages/PaymentMethods/PaymentMethods";
import HowToBuy from "./pages/HowToBuy/HowToBuy";
import OurStores from "./pages/OurStores/OurStores";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import ReturnWarranty from "./pages/ReturnWarranty/ReturnWarranty";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Profile from "./pages/Profile/Profile";
import useLocalStorageOrDatabase from "./components/Hooks/useLocalStorage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import PowerTools from "./pages/PowerTools/PowerTools";
import CircularSaws from "./pages/CircularSaws/CircularSaws";
import AngleGrinders from "./pages/AngleGrinders/AngleGrinders";
import Drills from "./pages/Drills/Drills";
import MultiTools from "./pages/MultiTools/MultiTools";
import OtherPowerTools from "./pages/OtherPowerTools/OtherPowerTools";
import Screwdrivers from "./pages/Screwdrivers/Screwdrivers";
import MeasuringTapes from "./pages/MeasuringTapes/MeasuringTapes";
import OtherHandTools from "./pages/OtherHandTools/OtherHandTools";
import Pliers from "./pages/Pliers/Pliers";
import Handsaws from "./pages/Handsaws/Handsaws";
import HandScrewdrivers from "./pages/HandScrewdrivers/HandScrewdrivers";

export const AppContext = React.createContext();
function App() {
  const baseURL = "https://toolbox-backend-api.onrender.com";
  // const baseURL = "http://localhost:8080";
  const publicURL = "https://toolbox-online.onrender.com";
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [cartUpdate, setCartUpdate] = useState(false);
  const [deleteCart, setDeleteCart] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [globalSpinner, setGlobalSpinner] = useState(false);

  const logout = () => {
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setGlobalSpinner(true);
    setIsLoggingOut(true);
    setIsLoggedIn(false);
    setTimeout(() => {
      setGlobalSpinner(false);
    }, 1500);
  };
  const [cart, setCart] = useLocalStorageOrDatabase(
    "cart",
    [],
    isLoggedIn,
    token,
    userId,
    baseURL,
    cartUpdate,
    deleteCart,
    isLoggingOut,
    isLoggingIn,
    logout
  );
  const [prevSearchValue, setPrevSearchValue] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(
    cart.reduce((acc, next) => {
      return acc + next.quantity;
    }, 0)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const [initialState, setInitialState] = useState(false);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  useEffect(() => {
    if (isLoggingOut === true) {
      setTimeout(() => {
        setIsLoggingOut(false);
      }, 300);
    }
  }, [isLoggingOut]);

  useEffect(() => {
    if (isLoggingIn === true) {
      setTimeout(() => {
        setIsLoggingIn(false);
      }, 300);
    }
  }, [isLoggingIn]);

  useEffect(() => {
    const storedToken = getCookie("token");
    const storedUserId = getCookie("userId");
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${baseURL}/api/users/retrieve-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          logout();
        })
        .then((data) => {
          setCart(data.cart);
          setProfileInfo(data.user);
        })
        .catch((err) => {
          Navigate("/");
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (token && userId && isLoggedIn === false) {
      document.cookie = `token=${token}; Secure; SameSite=Strict; Path=/`;
      document.cookie = `userId=${userId}; Secure; SameSite=Strict; Path=/`;
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          windowWidth,
          isLoggedIn,
          baseURL,
          publicURL,
          initialState,
          setInitialState,
          cartUpdate,
          setCartUpdate,
          totalQuantity,
          setTotalQuantity,
          cart,
          setCart,
          prevSearchValue,
          setPrevSearchValue,
          isModalOpen,
          setIsModalOpen,
          setToken,
          setUserId,
          userCart,
          setUserCart,
          setDeleteCart,
          logout,
          isLoggingOut,
          isLoggingIn,
          setIsLoggingIn,
          profileInfo,
          globalSpinner,
          setGlobalSpinner,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/our-stores" element={<OurStores />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/how-to-buy" element={<HowToBuy />} />
          <Route path="/return-warranty" element={<ReturnWarranty />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/search-page">
            <Route index element={<SearchPage />} />
            <Route path=":id" element={<Product />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/tools">
            <Route index element={<AllProducts />} />
            <Route path=":id" element={<Product />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="/hand-tools">
            <Route index element={<HandTools />} />
            <Route path="hammers" element={<Hammers />} />
            <Route path="hammers/:id" element={<Product />} />
            <Route path="measuring-tapes" element={<MeasuringTapes />} />
            <Route path="other-hand-tools" element={<OtherHandTools />} />
            <Route path="pliers" element={<Pliers />} />
            <Route path="saws" element={<Handsaws />} />
            <Route path="screwdrivers" element={<HandScrewdrivers />} />
            <Route path=":id" element={<Product />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="/power-tools">
            <Route index element={<PowerTools />} />
            <Route path="angle-grinders" element={<AngleGrinders />} />
            <Route path="drills" element={<Drills />} />
            <Route path="multi-tools" element={<MultiTools />} />
            <Route path="other-power-tools" element={<OtherPowerTools />} />
            <Route path="screwdrivers" element={<Screwdrivers />} />
            <Route path="circular-saws" element={<CircularSaws />} />
            <Route path="circular-saws/:id" element={<Product />} />
            <Route path=":id" element={<Product />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="/error-page" element={<ErrorPage />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
