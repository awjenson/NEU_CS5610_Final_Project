import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Checks if user is already logged in when app loads
  // useEffect is a hook that is used to run a function when a component is mounted.
  // You need to use the useEffect hook to fetch the user data from the server.
  // useEffect is named because it is a "side effect" of the component.
  // A side effect is anything that is happening outside of React itself.
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Using the Fetch API, you access the JSON data on the web -
        //   either from your own server or from a third-party JSON API.
        // fetch() is a side effect (anything that is happening outside of React itself),
        //   so it needs to be inside a useEffect hook.

        
        const res = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
          // credentials: "include" is used to include the credentials (username and password) in the request.
          // This is used to check if the user is already logged in.
          credentials: "include",
        });

        // If the request is successful, the user is logged in and the user data is set.
        if (res.ok) {
          setIsAuthenticated(true);
          const data = await res.json();
          setUser(data);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  // End of useEffect hook

  // The login function is used to log in a user.
  // It takes a username and password as arguments.
  // It then makes a POST request to the server to log in the user.
  // If the request is successful, the user is logged in and the user data is set.
  // If the request is not successful, the user is not logged in and the user data is not set.

  // The login function returns a promise.
  const login = async (username, password) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const userData = await res.json();
      setIsAuthenticated(true);
      setUser(userData);
    } else {
      setIsAuthenticated(false);
      setUser(null);

      // New code to handle login errors
      const errorData = await res.json();
      throw new Error(errorData.error);
    }
  };

  const logout = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
  };

  const register = async (username, password, name) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, name }),
    });

    if (res.ok) {
      const userData = await res.json();
      setIsAuthenticated(true);
      setUser(userData);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Return the AuthContext.Provider component.
  // The AuthContext.Provider component is used to provide the authentication context to the app.
  // The value prop is used to pass the authentication context to the app.
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthUser = () => useContext(AuthContext);
