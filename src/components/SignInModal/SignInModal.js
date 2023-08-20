import React, { useContext, useState } from "react";
import "./signinmodal.css";
import { AppContext } from "../../App";
import { ReactComponent as XMark } from "../../assets/icons/xmark.svg";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";

const spinnerStyles = {
  position: "absolute",
  top: 0,
  riht: 0,
  width: "100%",
  height: "100vh",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
};

function SignInModal({ setIsModalOpen, isModalOpen }) {
  const { baseURL, setToken, setUserId, setIsLoggingIn } =
    useContext(AppContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^[\w@-]{8,20}$/;
  const [submitInfo, setSubmitInfo] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const signIn = async () => {
    try {
      const user = {
        email: email.toLowerCase(),
        password: password.toLowerCase(),
      };
      const response = await fetch(`${baseURL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setEmail("");
        setPassword("");
        setSpinner(false);
        const data = await response.json();
        setSuccess(data.message);
        setToken(data.token);
        setUserId(data.user._id);
        setIsLoggingIn(true);
        setTimeout(() => {
          setSuccess("");
          setIsModalOpen(false);
        }, 2000);
      } else {
        setSpinner(false);
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong");
      }
    } catch (error) {
      setSpinner(false);
      setError("An error occurred while processing your request");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitInfo("");
    setError("");
    if (isPasswordValid && isEmailValid) {
      setSpinner(true);
      signIn();
    } else if (!email || !password) {
      setSubmitInfo("please fill all necessary fields!");
    } else {
      setSubmitInfo(
        "please fill all the necessary fields and make sure they are valid!"
      );
    }
  };

  return (
    <div className={`sign-in-modal ${isModalOpen ? "modal-active" : ""}`}>
      <div className="sign-in-container">
        <div className="sign-in-header">
          <span>Sign in</span>
          <button
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
          >
            <XMark />
          </button>
        </div>
        <div className="sign-in-form-container">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div
              className={`sign-in-email-container ${
                isEmailValid
                  ? "valid-email"
                  : email.length > 0
                  ? "invalid-email"
                  : ""
              } `}
            >
              <label htmlFor="email">Email</label>
              <input
                className={
                  email.length > 0 && isEmailValid
                    ? "valid"
                    : email.length > 0 && !isEmailValid
                    ? "invalid"
                    : ""
                }
                type="text"
                id="email"
                value={email}
                onChange={(e) => {
                  const trimmedValue = e.target.value.trim();
                  setEmail(trimmedValue);
                  setIsEmailValid(emailRegex.test(trimmedValue));
                }}
                onInput={(e) => {
                  const trimmedValue = e.target.value.trim();
                  setEmail(trimmedValue);
                  setIsEmailValid((prevIsValid) =>
                    emailRegex.test(trimmedValue)
                  );
                }}
              />
            </div>
            <div
              className={`sign-in-password-container ${
                isPasswordValid
                  ? "valid-pass"
                  : password.length > 0
                  ? "invalid-pass"
                  : ""
              }`}
            >
              <label htmlFor="password">Password</label>
              <input
                className={
                  password.length > 0 && isPasswordValid
                    ? "valid"
                    : password.length > 0 && !isPasswordValid
                    ? "invalid"
                    : ""
                }
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  const trimmedValue = e.target.value.trim();
                  setPassword(trimmedValue);
                  setIsPasswordValid(passwordRegex.test(trimmedValue));
                }}
                onInput={(e) => {
                  const trimmedValue = e.target.value.trim();
                  setPassword(trimmedValue);
                  setIsPasswordValid((prevIsValid) =>
                    passwordRegex.test(trimmedValue)
                  );
                }}
              />
            </div>
            {submitInfo.length > 0 ? (
              <p className="submit-info">{submitInfo}</p>
            ) : (
              ""
            )}
            {error.length > 0 ? <p className="error-info">{error}</p> : ""}
            {success.length > 0 ? (
              <p className="success-info">{success}</p>
            ) : (
              ""
            )}
            <div className="sign-in-login-link">
              <Link to="/signup" onClick={toggleModal}>
                Register for a new account
              </Link>
            </div>
            <div className="sign-in-button-container">
              <button type="submit">Sign in</button>
            </div>
          </form>
        </div>
      </div>
      {spinner && <Spinner styles={spinnerStyles} />}
    </div>
  );
}

export default SignInModal;
