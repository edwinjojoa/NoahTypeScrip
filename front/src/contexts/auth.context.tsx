import React, { createContext, useContext, useState } from 'react'

import { decodeJwt } from '@utils/jwt.utils'
import { encryptToken } from '@utils/crypto.utils'

interface AuthContextProps {
  user: any
  token: any
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAth debe ser usado dentro de un AuthProvder')
  }
  return context
}

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<any>(null)
  const [user, setUser] = useState<any>(null)

  const login = (tokenResponse: string) => {
    const decodedToken = decodeJwt(tokenResponse)
    setUser(decodedToken)
    setToken({ token })
    const cipherToken = encryptToken(tokenResponse)
    sessionStorage.setItem('token', cipherToken)
    setToken(tokenResponse)
  }

  const logout = () => {
    setToken(null)
    sessionStorage.removeItem('token')
  }

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
}
