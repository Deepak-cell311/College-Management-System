import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("Admin");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [authTeacher, setAuthTeacher] = useState(() => {
    const storedTeacher = localStorage.getItem("Teacher");
    return storedTeacher ? JSON.parse(storedTeacher) : null;
  });

  const logOut = () => {
    localStorage.removeItem("Admin");
    setAuthUser(null);
    toast.success("Logged out successfully!");
  };

  const logOutTeacher = () => {
    localStorage.removeItem("Teacher");
    setAuthTeacher(null);
    toast.success("Logged out successfully!");
  };

  // Debugging output
  useEffect(() => {
    console.log('Auth User:', authUser);
    console.log('Auth Teacher:', authTeacher);
  }, [authUser, authTeacher]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logOut, logOutTeacher, authTeacher, setAuthTeacher }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
