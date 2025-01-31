import React, { createContext, useState } from "react";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const JWTuser = JSON.parse(localStorage.getItem("JWTUser"));
  const [user, setUser] = useState(JWTuser || null);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(!!JWTuser);

  return (
    <UserContext.Provider
      value={{ user, setUser, userIsLoggedIn, setUserIsLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
