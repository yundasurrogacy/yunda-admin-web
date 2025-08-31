export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SURROGATE = 'SURROGATE',
  INTENDED_PARENT = 'INTENDED_PARENT',
  THIRD_PARTY = 'THIRD_PARTY'
}

export interface User {
  id: string
  email: string
  role: UserRole
  name: string
  avatar?: string
  createdAt: string
  lastLoginAt: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  user: User
  token: string
  refreshToken: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
