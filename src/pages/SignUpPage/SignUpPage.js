import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RootLayout from "../../components/Layouts/RootLayout";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "./signuppage.css";
import { AppContext } from "../../App";
import { ReactComponent as XMark } from "../../assets/icons/xmark.svg";
import Spinner from "../../components/Spinner/Spinner";

const spinnerStyles = {
  position: "fixed",
  top: 0,
  width: "100%",
  height: "100vh",
  margin: 0,
};

function SignUpPage() {
  const { baseURL } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [submitInfo, setSubmitInfo] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isTermsComponent, setIsTermsComponent] = useState(false);

  const usernameRegex = /^[a-z\d]{5,12}$/i;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^[\w@-]{8,20}$/;

  const resetState = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsTermsAgreed(false);
    setIsUsernameValid(false);
    setIsEmailValid(false);
    setIsPasswordValid(false);
  };

  const register = async () => {
    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${baseURL}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        resetState();
        setSpinner(false);
        const data = await response.json();
        setSuccess(data.message);
        setTimeout(() => {
          setSuccess("");
          setSpinner(true);
          setTimeout(() => {
            setSpinner(false);
            navigate("/");
          }, 2000);
        }, 4000);
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
    setError("");
    setSubmitInfo("");
    if (
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      password === confirmPassword &&
      isTermsAgreed
    ) {
      setSubmitInfo("");
      setError("");
      setSpinner(true);
      setTimeout(() => {
        register();
      }, 3000);
    } else if (
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      password !== confirmPassword &&
      isTermsAgreed
    ) {
      setSubmitInfo("passwords don't match!");
    } else if (
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      password === confirmPassword &&
      !isTermsAgreed
    ) {
      setSubmitInfo("please agree to the terms and conditions above!");
    } else {
      setSubmitInfo(
        "please fill all the necessary fields and make sure they are valid!"
      );
    }
  };

  useEffect(() => {
    if (spinner) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [spinner]);

  return (
    <RootLayout>
      <Breadcrumbs />
      <div className="sign-up-container">
        <h1>Create new account</h1>
        <form className="sign-up-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="sign-up-username-container">
            <label htmlFor="username">Username</label>
            <input
              className={
                username.length > 0 && isUsernameValid
                  ? "valid"
                  : username.length > 0 && !isUsernameValid
                  ? "invalid"
                  : ""
              }
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.trim());
                setIsUsernameValid(usernameRegex.test(e.target.value.trim()));
              }}
            />
          </div>
          <div className="sign-up-email-container">
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
                setEmail(e.target.value.trim());
                setIsEmailValid(emailRegex.test(e.target.value.trim()));
              }}
            />
          </div>
          <div className="sign-up-password-container">
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
                setPassword(e.target.value.trim());
                setIsPasswordValid(passwordRegex.test(e.target.value.trim()));
              }}
            />
          </div>
          <div className="sign-up-password-confirm-container">
            <label htmlFor="password-confirm">Confirm password</label>
            <input
              className={
                isPasswordValid && password === confirmPassword
                  ? "valid"
                  : isPasswordValid && confirmPassword.length > 0
                  ? "invalid"
                  : ""
              }
              type="password"
              id="password-confirm"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value.trim());
              }}
            />
          </div>
          <div className="sign-up-terms-container">
            <input
              type="checkbox"
              id="accept-terms"
              checked={isTermsAgreed}
              onChange={() => {
                setIsTermsAgreed(!isTermsAgreed);
              }}
            />
            I have read and agree to the{" "}
            <a
              onClick={() => {
                setIsTermsComponent(!isTermsComponent);
              }}
            >
              Terms and Conditions
            </a>
            .
          </div>
          {success.length > 0 ? <p className="success-info">{success}</p> : ""}
          {submitInfo.length > 0 ? (
            <p className="submit-info">{submitInfo}</p>
          ) : (
            ""
          )}
          {error.length > 0 ? <p className="error-info">{error}</p> : ""}
          {isTermsComponent && (
            <TermsComponent
              isTermsComponent={isTermsComponent}
              setIsTermsComponent={setIsTermsComponent}
            />
          )}
          <div className="sign-up-button-container">
            <button type="submit">Sign up</button>
          </div>
        </form>
        {spinner && <Spinner styles={spinnerStyles} />}
      </div>
    </RootLayout>
  );
}

export default SignUpPage;

function TermsComponent({ isTermsComponent, setIsTermsComponent }) {
  return (
    <div className="terms-component">
      <div className="terms-exit">
        <button
          onClick={() => {
            setIsTermsComponent(!isTermsComponent);
          }}
        >
          <XMark />
        </button>
      </div>
      <h1>Terms and Conditions</h1>
      <p>
        Please read these terms and conditions carefully before using our
        services. By accessing or using our website, you agree to be bound by
        these terms and conditions. If you do not agree with any part of these
        terms, please do not use our services.
      </p>

      <h2>1. Use of Services</h2>
      <p>
        Our services are provided for your personal use and are subject to these
        terms and conditions. You may not use our services for any illegal or
        unauthorized purpose.
      </p>

      <h2>2. User Accounts</h2>
      <p>
        You may be required to create a user account to access certain features
        of our services. You are responsible for maintaining the confidentiality
        of your account credentials.
      </p>

      <h2>3. Privacy</h2>
      <p>
        Your use of our services is also governed by our Privacy Policy, which
        can be found on our website.
      </p>

      <h2>4. Content</h2>
      <p>
        You agree not to upload, post, or transmit any content that is unlawful,
        harmful, or infringing.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        All content on our website, including text, graphics, logos, and images,
        is protected by copyright and other intellectual property laws.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        We are not liable for any direct, indirect, incidental, or consequential
        damages arising out of your use of our services.
      </p>

      <h2>7. Governing Law</h2>
      <p>
        These terms and conditions are governed by and construed in accordance
        with the laws of [Your Jurisdiction].
      </p>

      <h2>8. Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms and conditions at any time.
        Changes will be effective upon posting.
      </p>

      <p>
        By using our services, you agree to these terms and conditions. If you
        have any questions or concerns, please contact us at [Contact Email].
      </p>

      <p>Last updated: [Date]</p>
    </div>
  );
}
