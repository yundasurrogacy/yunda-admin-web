// 演示用户服务 - 简化版本

export interface CreateUserByPhoneParams {
  phone: string
}

export interface User {
  id: string
  phone: string
  name?: string
  email?: string
}

// 模拟创建用户函数
export async function createUserByPhone(params: CreateUserByPhoneParams): Promise<User | null> {
  try {
    // 这里是演示代码，实际应该调用真实API
    const newUser: User = {
      id: `user_${Date.now()}`,
      phone: params.phone,
      name: `用户_${params.phone.slice(-4)}`,
    }

    console.log('Creating user:', newUser)
    return newUser
  } catch (error) {
    console.error('Failed to create user:', error)
    return null
  }
}

// 模拟获取用户函数
export async function getUserById(id: string): Promise<User | null> {
  try {
    // 这里是演示代码，实际应该调用真实API
    const user: User = {
      id,
      phone: '+1234567890',
      name: '演示用户',
      email: 'demo@example.com',
    }

    return user
  } catch (error) {
    console.error('Failed to get user:', error)
    return null
  }
}

// 模拟根据手机号获取用户函数
export async function getUserByPhone(phone: string): Promise<User | null> {
  try {
    // 这里是演示代码，实际应该调用真实API
    const user: User = {
      id: `user_${phone.slice(-4)}`,
      phone,
      name: `用户_${phone.slice(-4)}`,
    }

    return user
  } catch (error) {
    console.error('Failed to get user by phone:', error)
    return null
  }
}

const userService = {
  createUserByPhone,
  getUserById,
  getUserByPhone,
}

export default userService