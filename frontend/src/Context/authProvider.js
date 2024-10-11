import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("Admin")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const logOut = () => {
    localStorage.removeItem("Admin");
    setAuthUser(null);
    toast.success("Logged out successfully!");
  }
  return (
    <AuthContext.Provider value={[authUser, setAuthUser, logOut]}>{children}</AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext)
