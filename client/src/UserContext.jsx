// UserContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);

        if (error.response && error.response.status === 401) {
          setUser(null);
          localStorage.removeItem("token");
        }
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem("token")) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("token", userData.accessToken);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:4000/user/logout");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
