import React, { useState, useContext } from "react";
import { AppContext } from "../../App";
import "./subscription.css";
function Subscription() {
  const { baseURL, setGlobalSpinner } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [submitInfo, setSubmitInfo] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const resetState = () => {
    setEmail("");
    setIsEmailValid(false);
    setSuccess("");
  };
  const subscribe = async () => {
    try {
      setGlobalSpinner(true);
      const response = await fetch(`${baseURL}/api/users/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });
      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message);
        setTimeout(() => {
          resetState();
        }, 6000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong");
      }
    } catch (error) {
      setError("An error occurred while processing your request");
    } finally {
      setGlobalSpinner(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitInfo("");
    setError("");
    if (isEmailValid) {
      subscribe();
    } else if (!email) {
      setSubmitInfo("please fill all necessary fields!");
    } else {
      setSubmitInfo(
        "please fill all the necessary fields and make sure they are valid!"
      );
    }
  };
  return (
    <>
      <form className="newsletter" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => {
            const trimmedValue = e.target.value.trim();
            setEmail(trimmedValue);
            setIsEmailValid(emailRegex.test(trimmedValue));
          }}
        />
        <button className="subscribe" type="submit">
          Subscribe
        </button>
      </form>
      <div className="subscription-info">
        {submitInfo && <p className="submit-info">{submitInfo}</p>}
        {error && <p className="error-info">{error}</p>}
        {success && <p className="success-info">{success}</p>}
      </div>
    </>
  );
}

export default Subscription;
