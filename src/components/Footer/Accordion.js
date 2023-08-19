import React from "react";
import styles from "./accordion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../../App";

function Accordion() {
  const { initialState, isLoggedIn, isModalOpen, setIsModalOpen } =
    useContext(AppContext);
  const [firstExpanded, setFirstExpanded] = useState(false);
  const [secondExpanded, setSecondExpanded] = useState(false);
  const [thirdExpanded, setThirdExpanded] = useState(false);
  const firstContentRef = useRef(null);
  const secondContentRef = useRef(null);
  const thirdContentRef = useRef(null);
  const { windowWidth } = useContext(AppContext);
  useEffect(() => {
    setFirstExpanded(false);
    setSecondExpanded(false);
    setThirdExpanded(false);
  }, [initialState]);

  return (
    <div className={styles.accordion}>
      <button
        className={`${styles.accordionButton} {${
          firstExpanded ? styles.accordionButtonActive : ""
        }`}
        onClick={() => {
          setFirstExpanded(!firstExpanded);
          setSecondExpanded(false);
          setThirdExpanded(false);
        }}
      >
        <span>My account</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`${styles.chevron} ${
            firstExpanded ? styles.chevronActive : ""
          }`}
        />
      </button>
      <div
        ref={firstContentRef}
        style={{
          maxHeight: `${
            firstExpanded ? firstContentRef.current.scrollHeight + "px" : "0"
          }`,
        }}
        className={`${styles.accordionContent} ${
          firstExpanded ? styles.accordionContentActive : ""
        } `}
      >
        <ul>
          <li>
            {isLoggedIn === false ? (
              <Link
                onClick={() => {
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

      <button
        className={`${styles.accordionButton} {${
          secondExpanded ? styles.accordionButtonActive : ""
        }`}
        onClick={() => {
          setSecondExpanded(!secondExpanded);
          setFirstExpanded(false);
          setThirdExpanded(false);
        }}
      >
        <span>Services</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`${styles.chevron} ${
            secondExpanded ? styles.chevronActive : ""
          }`}
        />
      </button>
      <div
        ref={secondContentRef}
        style={{
          maxHeight: `${
            secondExpanded ? secondContentRef.current.scrollHeight + "px" : "0"
          }`,
        }}
        className={`${styles.accordionContent} ${
          secondExpanded ? styles.accordionContentActive : ""
        } `}
      >
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

      <button
        className={`${styles.accordionButton} {${
          thirdExpanded ? styles.accordionButtonActive : ""
        }`}
        onClick={() => {
          setThirdExpanded(!thirdExpanded);
          setFirstExpanded(false);
          setSecondExpanded(false);
        }}
      >
        <span>Contact us</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`${styles.chevron} ${
            thirdExpanded ? styles.chevronActive : ""
          }`}
        />
      </button>
      <div
        ref={thirdContentRef}
        style={{
          maxHeight: `${
            thirdExpanded ? thirdContentRef.current.scrollHeight + "px" : "0"
          }`,
        }}
        className={`${styles.accordionContent} ${
          thirdExpanded ? styles.accordionContentActive : ""
        } `}
      >
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
  );
}

export default Accordion;
