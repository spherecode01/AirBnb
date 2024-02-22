/*import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const { user, setUser, logout } = useContext(UserContext);
  const [loading, setLoading] = useState(true);  // Introduce loading state
  const { subpage } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);

        if (error.response && error.response.status === 401) {
          setUser(null);
          localStorage.removeItem('token');
        }
      } finally {
        setLoading(false);  // Set loading state to false when the request completes
      }
    };

    if (!user && localStorage.getItem('token')) {
      fetchUserProfile();
    } else {
      setLoading(false);  // If the user is already present, set loading state to false
    }
  }, [user, setUser]);

  if (loading) {
    return 'Loading...';  // Display "Loading..." while waiting for user data
  }

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  );
}*/

//Right Code ||||

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const { user, setUser, logout, loading } = useContext(UserContext);
  const { subpage } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/user/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);

        if (error.response && error.response.status === 401) {
          setUser(null);
          localStorage.removeItem('token');
        }
      }
    };

    if (!user && localStorage.getItem('token')) {
      fetchUserProfile();
    }
  }, [user, setUser]);

  if (loading) {
    return 'Loading...';
  }

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  );
}



