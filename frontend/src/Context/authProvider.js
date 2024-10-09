import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("Admin")
    return storedUser ? JSON.parse(storedUser) : undefined
  })

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>{children}</AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext)
