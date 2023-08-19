import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import "./footer.css";
import Accordion from "./Accordion";
import Subscription from "./Subscription";
function Footer() {
  const {
    windowWidth,
    initialState,
    setInitialState,
    isLoggedIn,
    isModalOpen,
    setIsModalOpen,
    baseURL,
  } = useContext(AppContext);

  if (windowWidth >= 768) {
    return (
      <footer
        className="footer"
        onClick={() => {
          setInitialState(!initialState);
        }}
      >
        <div className="footer_top">
          <div className="footer_top_left">
            <h4>Stay Connected</h4>
            <p>Be the first to know all about all the news!</p>
            <Subscription />
          </div>
          <div className="footer_top_right">
            <h4>Get Social</h4>
            <p>Like us on Social Media</p>
            <div>
              <a href="#" target="_blank">
                <FaFacebook />
              </a>
              <a href="#" target="_blank">
                <FaInstagram />
              </a>
              <a href="#" target="_blank">
                <FaLinkedin />
              </a>
              <a href="#" target="_blank">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="my_account">
            <h5>My account</h5>
            <ul>
              <li>
                {isLoggedIn === false ? (
                  <Link
                    onClick={() => {
                      console.log("clicking");
                      setIsModalOpen(!isModalOpen);
                    }}
                  >
                    Sign in
                  </Link>
                ) : (
                  <Link to="/profile">My profile</Link>
                )}
              </li>
              {isLoggedIn === false ? (
                <li>
                  <Link to="/signup">Create account</Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          <div className="services">
            <h5>Services</h5>
            <ul>
              <li>
                <Link to="/payment-methods">Payment Methods</Link>
              </li>
              <li>
                <Link to="/delivery">Delivery</Link>
              </li>
              <li>
                <Link to="/return-warranty">Return-Warranty</Link>
              </li>
              <li>
                <Link to="/terms-conditions">Terms And Conditions</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="contact_us">
            <h5>Contact Us</h5>
            <ul>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>Main Street #17</li>
              <li>
                <a href="tel:032 29 03 27">032 29 03 27</a>
              </li>
              <li>
                <a href="tel:032 2 19 00 52">032 2 19 00 52 Online Shop</a>
              </li>
              <li>
                <a href="tel:032 91 10 34">032 91 10 34</a>
              </li>
              <li>Mon-Fri 08:30 - 22:30 Sat-Sun 09:30-18:30</li>
              <li>
                <a href="mailto:orders@toolbox.com.io">orders@toolbox.com.io</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer className="footer">
      <div
        className="footer_top"
        onClick={() => setInitialState(!initialState)}
      >
        <div className="footer_top_left">
          <h4>Stay Connected</h4>
          <p>Be the first to know all about all the news!</p>
          <Subscription />
        </div>
        <div className="footer_top_right">
          <h4>Get Social</h4>
          <p>Like us on Social Media</p>
          <div>
            <a href="https://www.facebook.com/fakeprofile" target="_blank">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/fakeprofile" target="_blank">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/fakeprofile" target="_blank">
              <FaLinkedin />
            </a>
            <a href="https://www.youtube.com/fakechannel" target="_blank">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
      <Accordion />
    </footer>
  );
}

export default Footer;
