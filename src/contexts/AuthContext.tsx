'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, AuthState } from '@/types/auth'
import { DEMO_ACCOUNTS } from '@/constants/roles'

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true
  })

  // 页面加载时检查本地存储的登录状态
  useEffect(() => {
    const checkAuthState = () => {
      try {
        const token = localStorage.getItem('auth_token')
        const userString = localStorage.getItem('auth_user')
        
        if (token && userString) {
          const user = JSON.parse(userString)
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          })
        } else {
          setAuthState(prev => ({
            ...prev,
            isLoading: false
          }))
        }
      } catch (error) {
        console.error('Error checking auth state:', error)
        setAuthState(prev => ({
          ...prev,
          isLoading: false
        }))
      }
    }

    checkAuthState()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 模拟登录验证
      const demoAccount = DEMO_ACCOUNTS.find(
        account => account.email === email && account.password === password
      )

      if (demoAccount) {
        const user: User = {
          id: `user_${Date.now()}`,
          email: demoAccount.email,
          role: demoAccount.role,
          name: demoAccount.name,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        }

        const token = `token_${Date.now()}_${Math.random()}`

        // 保存到本地存储
        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_user', JSON.stringify(user))

        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false
        })

        return true
      }

      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    })
  }

  const setUser = (user: User | null) => {
    setAuthState(prev => ({
      ...prev,
      user,
      isAuthenticated: !!user
    }))
  }

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    setUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
