import React, { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("Admin")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const [courseID, setCourseId] = useState(() => {
    const storedCourseId = localStorage.getItem("courseTodo")
    return storedCourseId ? JSON.parse(storedCourseId) : null
  })

  return (
    <AuthContext.Provider value={[authUser, setAuthUser, courseID, setCourseId]}>{children}</AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext)
