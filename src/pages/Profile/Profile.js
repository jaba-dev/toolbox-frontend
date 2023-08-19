import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import RootLayout from "../../components/Layouts/RootLayout";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "./profile.css";
function Profile() {
  const { isLoggedIn, profileInfo } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (profileInfo !== null) {
      setUsername(profileInfo.username);
      setEmail(profileInfo.email);
    }
  }, []);
  if (isLoggedIn) {
    return (
      <RootLayout>
        <Breadcrumbs />
        <div className="profile">
          <h1>Profile details</h1>
          <div className="profile-info">
            <p>your username: {username}</p>
            <p>your email: {email}</p>
          </div>
        </div>
      </RootLayout>
    );
  }
  return (
    <RootLayout>
      <Breadcrumbs />
      <div className="profile">
        <h1>Profile details</h1>
        <div className="profile-info">
          <h2>You have logged out.</h2>
        </div>
      </div>
    </RootLayout>
  );
}

export default Profile;
