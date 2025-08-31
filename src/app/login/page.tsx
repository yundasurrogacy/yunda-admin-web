'use client'

import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, message, Card, Tag } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { UserRole } from '@/types/auth'
import { ROLE_CONFIG, DEMO_ACCOUNTS } from '@/constants/roles'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const router = useRouter()
  const { login, isAuthenticated, user } = useAuth()

  // 如果已经登录，直接跳转到对应的仪表板
  useEffect(() => {
    if (isAuthenticated && user) {
      const dashboardRoute = getDashboardRoute(user.role)
      router.push(dashboardRoute)
    }
  }, [isAuthenticated, user, router])

  const getDashboardRoute = (role: UserRole): string => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return '/admin/super-admin'
      case UserRole.SURROGATE:
        return '/admin/surrogate'
      case UserRole.INTENDED_PARENT:
        return '/admin/intended-parent'
      case UserRole.THIRD_PARTY:
        return '/admin/third-party'
      default:
        return '/admin/dashboard'
    }
  }

  const handleFinish = async (values: any) => {
    setLoading(true)
    
    try {
      const success = await login(values.email, values.password)
      
      if (success) {
        message.success('登录成功！正在跳转...')
        // 跳转逻辑在 useEffect 中处理
      } else {
        message.error('邮箱或密码错误，请检查后重试')
      }
    } catch {
      message.error('登录失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (account: typeof DEMO_ACCOUNTS[0]) => {
    form.setFieldsValue({
      email: account.email,
      password: account.password,
      rememberMe: true
    })
    setSelectedRole(account.role)
    message.info(`已填入 ${account.name} 的演示账号`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Yunda Surrogacy</h1>
          <p className="text-lg text-gray-600">专业的代孕服务机构管理系统</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card title="选择您的角色" className="shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(ROLE_CONFIG).map(([role, config]) => (
                  <div
                    key={role}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedRole === role
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRole(role as UserRole)}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{config.icon}</div>
                      <div className="font-semibold text-gray-800 mb-1">{config.label}</div>
                      <div className="text-xs text-gray-600 leading-relaxed">
                        {config.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="演示账号" className="shadow-lg">
              <div className="space-y-3">
                {DEMO_ACCOUNTS.map((account) => (
                  <div
                    key={account.role}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedRole === account.role
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleDemoLogin(account)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Tag color={ROLE_CONFIG[account.role].color}>
                          {ROLE_CONFIG[account.role].label}
                        </Tag>
                        <span className="font-medium">{account.name}</span>
                      </div>
                      <Button size="small" type="link">
                        使用此账号
                      </Button>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <div>邮箱: {account.email}</div>
                      <div>密码: {account.password}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md shadow-xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">欢迎回来</h2>
                <p className="text-gray-600">
                  {selectedRole
                    ? `以 ${ROLE_CONFIG[selectedRole].label} 身份登录`
                    : '请选择您的角色并登录'}
                </p>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                autoComplete="off"
                size="large"
              >
                <Form.Item
                  label="邮箱地址"
                  name="email"
                  rules={[
                    { required: true, message: '请输入邮箱地址' },
                    { type: 'email', message: '请输入有效的邮箱地址' }
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="请输入您的邮箱"
                  />
                </Form.Item>

                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="请输入您的密码"
                  />
                </Form.Item>

                <Form.Item name="rememberMe" valuePropName="checked">
                  <div className="flex items-center justify-between">
                    <Checkbox>记住我</Checkbox>
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      忘记密码？
                    </a>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-12 text-lg font-medium"
                    loading={loading}
                    disabled={!selectedRole}
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>

              {selectedRole && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <span className="text-lg">{ROLE_CONFIG[selectedRole].icon}</span>
                    <span className="font-medium">
                      当前选择: {ROLE_CONFIG[selectedRole].label}
                    </span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    {ROLE_CONFIG[selectedRole].description}
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-500">
          <p>© 2024 Yunda Surrogacy. 保留所有权利。</p>
          <p className="mt-2">
            这是一个演示系统，用于展示代孕服务机构管理平台的功能
          </p>
        </div>
      </div>
    </div>
  )
}
