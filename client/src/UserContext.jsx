import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('https://air-al0p.onrender.com/profile');
        setUser(data);
        setReady(true);
      } catch (error) {
        // Handle error, e.g., user is not authenticated
        console.error('Error fetching user profile:', error);
        setUser(null);
        setReady(true);
      }
    };

    if (!user) {
      fetchUserProfile();
    }
  }, [user]);

  const logout = () => {
    // Perform logout actions, e.g., clear user info, redirect, etc.
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, ready, logout }}>
      {children}
    </UserContext.Provider>
  );
}
