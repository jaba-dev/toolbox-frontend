import React, { useState, useRef, useEffect } from "react";
import styles from "./productaccordion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function ProductAccordion({ description, specifications, initialState }) {
  const [firstExpanded, setFirstEcpanded] = useState(false);
  const [secondExpanded, setSecondExpanded] = useState(false);
  const firstContentRef = useRef(null);
  const secondContentRef = useRef(null);
  const specValues = Object.values(specifications);
  const specKeys = Object.keys(specifications);
  useEffect(() => {
    setFirstEcpanded(false);
    setSecondExpanded(false);
  }, [initialState]);
  return (
    <div className={styles.accordion}>
      <button
        className={`${styles.accordionButton} ${
          firstExpanded && styles.accordionButtonActive
        }`}
        onClick={() => {
          setFirstEcpanded(!firstExpanded);
        }}
      >
        <span>Description</span>
        <FontAwesomeIcon icon={faChevronDown} />
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
        <div>
          <p>{description}</p>
        </div>
      </div>
      <button
        className={`${styles.accordionButton} ${
          secondExpanded && styles.accordionButtonActive
        }`}
        onClick={() => {
          setSecondExpanded(!secondExpanded);
        }}
      >
        <span>specifications</span>
        <FontAwesomeIcon icon={faChevronDown} />
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
        <div>
          <table className={styles.table}>
            <tbody>
              {specKeys.map((key, index) => {
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{specValues[index]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductAccordion;
