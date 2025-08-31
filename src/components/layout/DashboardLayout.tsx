'use client'

import React, { useState } from 'react'
import { Layout, Menu, Avatar, Dropdown, Button, Typography, Space, Tag } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  DashboardOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { ROLE_CONFIG } from '@/constants/roles'
import { UserRole } from '@/types/auth'

const { Header, Sider, Content } = Layout
const { Title, Text } = Typography

interface DashboardLayoutProps {
  children: React.ReactNode
  menuItems?: Array<{
    key: string
    icon?: React.ReactNode
    label: string
    path: string
  }>
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  menuItems = [] 
}) => {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleMenuClick = (path: string) => {
    router.push(path)
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ]

  const getRoleConfig = (role: UserRole) => {
    return ROLE_CONFIG[role] || {
      label: '未知角色',
      color: '#999',
      icon: '❓'
    }
  }

  if (!user) {
    return null
  }

  const roleConfig = getRoleConfig(user.role)

  return (
    <Layout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="bg-white shadow-md"
        width={250}
      >
        <div className="p-4 text-center border-b">
          <div className="flex items-center justify-center mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
              <span className="text-xl text-white font-bold">Y</span>
            </div>
            {!collapsed && (
              <Title level={4} className="ml-2 mb-0 text-gray-800">
                Yunda
              </Title>
            )}
          </div>
          {!collapsed && (
            <Text className="text-gray-600 text-sm">代孕服务管理系统</Text>
          )}
        </div>

        <Menu
          mode="inline"
          className="border-r-0 mt-4"
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: '仪表板',
              onClick: () => handleMenuClick('/admin/dashboard'),
            },
            ...menuItems.map(item => ({
              ...item,
              onClick: () => handleMenuClick(item.path),
            })),
          ]}
        />
      </Sider>

      <Layout>
        <Header className="bg-white shadow-sm px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-600"
            />
            <div className="ml-4 flex items-center">
              <span className="text-2xl mr-2">{roleConfig.icon}</span>
              <div>
                <Text strong className="text-gray-800">{roleConfig.label}</Text>
                <br />
                <Text className="text-gray-500 text-sm">{user.name}</Text>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Tag color={roleConfig.color} className="mr-0">
              {roleConfig.label}
            </Tag>
            
            <Dropdown
              menu={{
                items: userMenuItems,
              }}
              placement="bottomRight"
            >
              <Space className="cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                <Avatar size="small" icon={<UserOutlined />} />
                <span className="text-gray-700">{user.name}</span>
              </Space>
            </Dropdown>
          </div>
        </Header>

        <Content className="p-6 bg-gray-50 overflow-auto">
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
