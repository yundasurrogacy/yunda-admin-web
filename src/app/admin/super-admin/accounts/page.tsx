'use client'

import React, { useState } from 'react'
import { Card, Table, Tag, Button, Space, Input, Row, Col, Statistic, Modal, Form, Select, message, Avatar } from 'antd'
import {
  SettingOutlined,
  UserOutlined,
  TeamOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { UserRole } from '@/types/auth'

const { Option } = Select

interface Account {
  id: string
  name: string
  email: string
  role: UserRole
  status: 'active' | 'inactive' | 'suspended'
  lastLogin: string
  createdAt: string
}

const AccountManagementPage = () => {
  // 模拟账号数据
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: '1',
      name: '张小明',
      email: 'zhang@example.com',
      role: UserRole.SURROGATE,
      status: 'active',
      lastLogin: '2024-02-01T10:30:00Z',
      createdAt: '2024-01-15T08:00:00Z',
    },
    {
      id: '2',
      name: 'David & Emma Smith',
      email: 'david.smith@example.com',
      role: UserRole.INTENDED_PARENT,
      status: 'active',
      lastLogin: '2024-02-01T15:20:00Z',
      createdAt: '2024-01-20T14:30:00Z',
    },
    {
      id: '3',
      name: '优质代理服务',
      email: 'agency@example.com',
      role: UserRole.THIRD_PARTY,
      status: 'active',
      lastLogin: '2024-02-01T09:15:00Z',
      createdAt: '2024-01-10T11:00:00Z',
    },
    {
      id: '4',
      name: '李小红',
      email: 'li@example.com',
      role: UserRole.SURROGATE,
      status: 'inactive',
      lastLogin: '2024-01-28T16:45:00Z',
      createdAt: '2024-01-12T09:30:00Z',
    },
  ])

  const [searchText, setSearchText] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all')
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [createForm] = Form.useForm()
  const [editForm] = Form.useForm()

  // 筛选数据
  const filteredAccounts = accounts.filter(account => {
    const matchSearch = searchText === '' || 
      account.name.toLowerCase().includes(searchText.toLowerCase()) ||
      account.email.toLowerCase().includes(searchText.toLowerCase())
    
    const matchRole = roleFilter === 'all' || account.role === roleFilter
    const matchStatus = statusFilter === 'all' || account.status === statusFilter
    
    return matchSearch && matchRole && matchStatus
  })

  // 统计数据
  const totalAccounts = accounts.length
  const activeAccounts = accounts.filter(a => a.status === 'active').length
  const surrogateAccounts = accounts.filter(a => a.role === UserRole.SURROGATE).length
  const parentAccounts = accounts.filter(a => a.role === UserRole.INTENDED_PARENT).length

  const getRoleLabel = (role: UserRole): string => {
    const labels = {
      [UserRole.SUPER_ADMIN]: '超级管理员',
      [UserRole.SURROGATE]: '代孕母亲',
      [UserRole.INTENDED_PARENT]: '准父母',
      [UserRole.THIRD_PARTY]: '代理机构',
    }
    return labels[role]
  }

  const getRoleColor = (role: UserRole): string => {
    const colors = {
      [UserRole.SUPER_ADMIN]: 'red',
      [UserRole.SURROGATE]: 'green',
      [UserRole.INTENDED_PARENT]: 'blue',
      [UserRole.THIRD_PARTY]: 'purple',
    }
    return colors[role]
  }

  const getStatusColor = (status: string): string => {
    const colors: { [key: string]: string } = {
      active: 'green',
      inactive: 'orange',
      suspended: 'red',
    }
    return colors[status] || 'default'
  }

  const getStatusLabel = (status: string): string => {
    const labels: { [key: string]: string } = {
      active: '活跃',
      inactive: '未激活',
      suspended: '已暂停',
    }
    return labels[status] || status
  }

  const handleCreateAccount = (values: any) => {
    const newAccount: Account = {
      id: String(Date.now()),
      name: values.name,
      email: values.email,
      role: values.role,
      status: 'active',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    setAccounts([...accounts, newAccount])
    setIsCreateModalVisible(false)
    createForm.resetFields()
    message.success('账号创建成功！')
  }

  const handleEditAccount = (values: any) => {
    if (!selectedAccount) return

    const updatedAccounts = accounts.map(account =>
      account.id === selectedAccount.id
        ? { ...account, ...values }
        : account
    )

    setAccounts(updatedAccounts)
    setIsEditModalVisible(false)
    editForm.resetFields()
    message.success('账号信息更新成功！')
  }

  const handleToggleStatus = (accountId: string) => {
    const updatedAccounts = accounts.map(account =>
      account.id === accountId
        ? { 
            ...account, 
            status: account.status === 'active' ? 'suspended' : 'active' as any 
          }
        : account
    )

    setAccounts(updatedAccounts)
    message.success('账号状态更新成功！')
  }

  const handleDeleteAccount = (accountId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '您确定要删除这个账号吗？此操作不可撤销。',
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const updatedAccounts = accounts.filter(account => account.id !== accountId)
        setAccounts(updatedAccounts)
        message.success('账号删除成功！')
      },
    })
  }

  const columns = [
    {
      title: '用户',
      key: 'user',
      render: (record: Account) => (
        <div className="flex items-center space-x-3">
          <Avatar 
            size={40} 
            icon={record.role === UserRole.INTENDED_PARENT ? <TeamOutlined /> : <UserOutlined />} 
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => (
        <Tag color={getRoleColor(role)}>{getRoleLabel(role)}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>
      ),
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (record: Account) => (
        <Space>
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedAccount(record)
              editForm.setFieldsValue(record)
              setIsEditModalVisible(true)
            }}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={record.status === 'active' ? <LockOutlined /> : <UnlockOutlined />}
            onClick={() => handleToggleStatus(record.id)}
          >
            {record.status === 'active' ? '暂停' : '激活'}
          </Button>
          <Button 
            type="link" 
            size="small" 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteAccount(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ]

  const menuItems = [
    {
      key: 'surrogate-applications',
      icon: <SettingOutlined />,
      label: '代孕母申请表',
      path: '/admin/super-admin/surrogate-applications',
    },
    {
      key: 'parent-applications',
      icon: <SettingOutlined />,
      label: '准父母申请表',
      path: '/admin/super-admin/parent-applications',
    },
    {
      key: 'surrogate-list',
      icon: <SettingOutlined />,
      label: '代孕母亲',
      path: '/admin/super-admin/surrogates',
    },
    {
      key: 'parent-list',
      icon: <SettingOutlined />,
      label: '准父母',
      path: '/admin/super-admin/parents',
    },
    {
      key: 'case-management',
      icon: <SettingOutlined />,
      label: '案例管理',
      path: '/admin/super-admin/cases',
    },
    {
      key: 'account-management',
      icon: <SettingOutlined />,
      label: '账号管理',
      path: '/admin/super-admin/accounts',
    },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">账号管理</h1>
          <p className="text-gray-600">管理系统用户账号，包括创建、编辑、暂停和删除操作</p>
        </div>

        {/* 统计概览 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="总账号数"
                value={totalAccounts}
                suffix="个"
                valueStyle={{ color: '#1890ff' }}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="活跃账号"
                value={activeAccounts}
                suffix="个"
                valueStyle={{ color: '#52c41a' }}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="代孕母亲"
                value={surrogateAccounts}
                suffix="个"
                valueStyle={{ color: '#722ed1' }}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic
                title="准父母"
                value={parentAccounts}
                suffix="个"
                valueStyle={{ color: '#faad14' }}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* 搜索和筛选 */}
        <Card>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="搜索姓名或邮箱"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Space wrap>
                <span className="text-sm text-gray-600">角色:</span>
                <Button 
                  size="small"
                  type={roleFilter === 'all' ? 'primary' : 'default'}
                  onClick={() => setRoleFilter('all')}
                >
                  全部
                </Button>
                <Button 
                  size="small"
                  type={roleFilter === UserRole.SURROGATE ? 'primary' : 'default'}
                  onClick={() => setRoleFilter(UserRole.SURROGATE)}
                >
                  代孕母亲
                </Button>
                <Button 
                  size="small"
                  type={roleFilter === UserRole.INTENDED_PARENT ? 'primary' : 'default'}
                  onClick={() => setRoleFilter(UserRole.INTENDED_PARENT)}
                >
                  准父母
                </Button>
                <Button 
                  size="small"
                  type={roleFilter === UserRole.THIRD_PARTY ? 'primary' : 'default'}
                  onClick={() => setRoleFilter(UserRole.THIRD_PARTY)}
                >
                  代理机构
                </Button>
              </Space>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsCreateModalVisible(true)}
              >
                创建账号
              </Button>
            </Col>
          </Row>
        </Card>

        {/* 账号列表 */}
        <Card title={`账号列表 (${filteredAccounts.length}个)`}>
          <Table 
            columns={columns} 
            dataSource={filteredAccounts}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `显示 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
            }}
          />
        </Card>

        {/* 创建账号模态框 */}
        <Modal
          title="创建新账号"
          open={isCreateModalVisible}
          onCancel={() => setIsCreateModalVisible(false)}
          footer={null}
          width={500}
        >
          <Form
            form={createForm}
            layout="vertical"
            onFinish={handleCreateAccount}
          >
            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input placeholder="请输入邮箱地址" />
            </Form.Item>

            <Form.Item
              label="角色"
              name="role"
              rules={[{ required: true, message: '请选择角色' }]}
            >
              <Select placeholder="请选择角色">
                <Option value={UserRole.SURROGATE}>代孕母亲</Option>
                <Option value={UserRole.INTENDED_PARENT}>准父母</Option>
                <Option value={UserRole.THIRD_PARTY}>代理机构</Option>
              </Select>
            </Form.Item>

            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsCreateModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                创建账号
              </Button>
            </div>
          </Form>
        </Modal>

        {/* 编辑账号模态框 */}
        <Modal
          title="编辑账号"
          open={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          footer={null}
          width={500}
        >
          <Form
            form={editForm}
            layout="vertical"
            onFinish={handleEditAccount}
          >
            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input placeholder="请输入邮箱地址" />
            </Form.Item>

            <Form.Item
              label="角色"
              name="role"
              rules={[{ required: true, message: '请选择角色' }]}
            >
              <Select placeholder="请选择角色">
                <Option value={UserRole.SURROGATE}>代孕母亲</Option>
                <Option value={UserRole.INTENDED_PARENT}>准父母</Option>
                <Option value={UserRole.THIRD_PARTY}>代理机构</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="状态"
              name="status"
              rules={[{ required: true, message: '请选择状态' }]}
            >
              <Select placeholder="请选择状态">
                <Option value="active">活跃</Option>
                <Option value="inactive">未激活</Option>
                <Option value="suspended">已暂停</Option>
              </Select>
            </Form.Item>

            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsEditModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default AccountManagementPage
