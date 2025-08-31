import { UserRole } from '@/types/auth'

export const ROLE_CONFIG = {
  [UserRole.SUPER_ADMIN]: {
    label: '超级管理员',
    description: '系统最高权限，管理所有用户和系统配置',
    color: '#ff4d4f',
    icon: '👑'
  },
  [UserRole.SURROGATE]: {
    label: '代孕母亲',
    description: '代孕服务提供者，查看自己的代孕旅程和健康信息',
    color: '#52c41a',
    icon: '🤱'
  },
  [UserRole.INTENDED_PARENT]: {
    label: '准父母',
    description: '代孕服务需求方，管理代孕流程和文件',
    color: '#1890ff',
    icon: '👨‍👩‍👧‍👦'
  },
  [UserRole.THIRD_PARTY]: {
    label: '代理机构',
    description: '第三方代理机构，负责客户对接和文件处理协调',
    color: '#722ed1',
    icon: '🤝'
  }
}

export const DEMO_ACCOUNTS = [
  {
    role: UserRole.SUPER_ADMIN,
    email: 'admin@yunda.com',
    password: 'admin123',
    name: '超级管理员'
  },
  {
    role: UserRole.SURROGATE,
    email: 'surrogate@yunda.com',
    password: 'surrogate123',
    name: '代孕母亲'
  },
  {
    role: UserRole.INTENDED_PARENT,
    email: 'parent@yunda.com',
    password: 'parent123',
    name: '准父母'
  },
  {
    role: UserRole.THIRD_PARTY,
    email: 'agency@yunda.com',
    password: 'agency123',
    name: '代理机构'
  }
]
