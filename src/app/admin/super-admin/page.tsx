'use client'

import React from 'react'
import { Card, Row, Col, Statistic, Table, Tag, Progress, Button, Space, message } from 'antd'
import {
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  DollarOutlined,
  BellOutlined,
  SettingOutlined,
  BarChartOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSurrogateApplications, mockIntendedParentApplications, mockSurrogacyCases } from '@/data/mockData'
import { ApplicationStatus } from '@/types/application'

const SuperAdminDashboard = () => {
  // 统计数据
  const pendingSurrogateApps = mockSurrogateApplications.filter(app => app.status === ApplicationStatus.PENDING).length
  const pendingParentApps = mockIntendedParentApplications.filter(app => app.status === ApplicationStatus.PENDING).length
  const activeCases = mockSurrogacyCases.length
  
  const statistics = [
    {
      title: '待审核代孕母亲申请',
      value: pendingSurrogateApps,
      prefix: <UserOutlined />,
      suffix: '份',
      valueStyle: { color: '#faad14' },
    },
    {
      title: '待审核准父母申请',
      value: pendingParentApps,
      prefix: <TeamOutlined />,
      suffix: '份',
      valueStyle: { color: '#1890ff' },
    },
    {
      title: '活跃案例',
      value: activeCases,
      prefix: <FileOutlined />,
      suffix: '个',
      valueStyle: { color: '#3f8600' },
    },
    {
      title: '本月新申请',
      value: mockSurrogateApplications.length + mockIntendedParentApplications.length,
      prefix: <BellOutlined />,
      suffix: '份',
      valueStyle: { color: '#722ed1' },
    },
  ]

  const handleApproveApplication = (id: string, type: 'surrogate' | 'parent') => {
    message.success(`${type === 'surrogate' ? '代孕母亲' : '准父母'}申请已批准，邮件通知已发送`)
  }

  const handleRejectApplication = (id: string, type: 'surrogate' | 'parent') => {
    message.warning(`${type === 'surrogate' ? '代孕母亲' : '准父母'}申请已拒绝，邮件通知已发送`)
  }

  // 代孕母亲申请表格列
  const surrogateColumns = [
    {
      title: '姓名',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '位置',
      key: 'location',
      render: (record: any) => `${record.location.city}, ${record.location.state}`,
    },
    {
      title: '经验',
      dataIndex: 'previousSurrogacyExperience',
      key: 'experience',
      render: (hasExperience: boolean) => (
        <Tag color={hasExperience ? 'green' : 'blue'}>
          {hasExperience ? '有经验' : '首次'}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: ApplicationStatus) => {
        const colorMap = {
          [ApplicationStatus.PENDING]: 'orange',
          [ApplicationStatus.APPROVED]: 'green',
          [ApplicationStatus.REJECTED]: 'red',
          [ApplicationStatus.UNDER_REVIEW]: 'blue',
        }
        const labelMap = {
          [ApplicationStatus.PENDING]: '待审核',
          [ApplicationStatus.APPROVED]: '已批准',
          [ApplicationStatus.REJECTED]: '已拒绝',
          [ApplicationStatus.UNDER_REVIEW]: '审核中',
        }
        return <Tag color={colorMap[status]}>{labelMap[status]}</Tag>
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space>
          <Button type="link" size="small" icon={<EyeOutlined />}>
            查看
          </Button>
          {record.status === ApplicationStatus.PENDING && (
            <>
              <Button 
                type="link" 
                size="small" 
                icon={<CheckCircleOutlined />}
                onClick={() => handleApproveApplication(record.id, 'surrogate')}
              >
                批准
              </Button>
              <Button 
                type="link" 
                size="small" 
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => handleRejectApplication(record.id, 'surrogate')}
              >
                拒绝
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ]

  // 准父母申请表格列
  const parentColumns = [
    {
      title: '姓名',
      dataIndex: 'coupleNames',
      key: 'coupleNames',
    },
    {
      title: '主要邮箱',
      dataIndex: 'primaryEmail',
      key: 'primaryEmail',
    },
    {
      title: '位置',
      key: 'location',
      render: (record: any) => `${record.location.city}, ${record.location.state}`,
    },
    {
      title: '预算范围',
      key: 'budget',
      render: (record: any) => `$${record.budget.min.toLocaleString()} - $${record.budget.max.toLocaleString()}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: ApplicationStatus) => {
        const colorMap = {
          [ApplicationStatus.PENDING]: 'orange',
          [ApplicationStatus.APPROVED]: 'green',
          [ApplicationStatus.REJECTED]: 'red',
          [ApplicationStatus.UNDER_REVIEW]: 'blue',
        }
        const labelMap = {
          [ApplicationStatus.PENDING]: '待审核',
          [ApplicationStatus.APPROVED]: '已批准',
          [ApplicationStatus.REJECTED]: '已拒绝',
          [ApplicationStatus.UNDER_REVIEW]: '审核中',
        }
        return <Tag color={colorMap[status]}>{labelMap[status]}</Tag>
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space>
          <Button type="link" size="small" icon={<EyeOutlined />}>
            查看
          </Button>
          {record.status === ApplicationStatus.PENDING && (
            <>
              <Button 
                type="link" 
                size="small" 
                icon={<CheckCircleOutlined />}
                onClick={() => handleApproveApplication(record.id, 'parent')}
              >
                批准
              </Button>
              <Button 
                type="link" 
                size="small" 
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => handleRejectApplication(record.id, 'parent')}
              >
                拒绝
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ]

  const menuItems = [
    {
      key: 'surrogate-applications',
      icon: <UserOutlined />,
      label: '代孕母申请表',
      path: '/admin/super-admin/surrogate-applications',
    },
    {
      key: 'parent-applications',
      icon: <TeamOutlined />,
      label: '准父母申请表',
      path: '/admin/super-admin/parent-applications',
    },
    {
      key: 'surrogate-list',
      icon: <UserOutlined />,
      label: '代孕母亲',
      path: '/admin/super-admin/surrogates',
    },
    {
      key: 'parent-list',
      icon: <TeamOutlined />,
      label: '准父母',
      path: '/admin/super-admin/parents',
    },
    {
      key: 'case-management',
      icon: <FileOutlined />,
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            管理员仪表板
          </h1>
          <p className="text-gray-600">
            欢迎使用代孕服务管理系统，管理申请审核、案例分配和用户信息
          </p>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]}>
          {statistics.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card>
                <Statistic {...stat} />
              </Card>
            </Col>
          ))}
        </Row>

        {/* 最近活动 */}
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card title="最近活动">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>审核通过了 Sarah Johnson 的申请</span>
                  <span className="text-gray-500 ml-auto">2小时前</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>创建了案例 YD-2024-001</span>
                  <span className="text-gray-500 ml-auto">4小时前</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>分配案例给代理机构</span>
                  <span className="text-gray-500 ml-auto">6小时前</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>新用户注册：David & Emma Smith</span>
                  <span className="text-gray-500 ml-auto">1天前</span>
                </div>
              </div>
            </Card>
          </Col>


        </Row>

        {/* 待审核申请 */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card title="待审核代孕母亲申请" extra={<Button type="link">查看全部</Button>}>
              <Table 
                columns={surrogateColumns} 
                dataSource={mockSurrogateApplications.filter(app => app.status === ApplicationStatus.PENDING)} 
                pagination={false}
                size="middle"
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card title="待审核准父母申请" extra={<Button type="link">查看全部</Button>}>
              <Table 
                columns={parentColumns} 
                dataSource={mockIntendedParentApplications.filter(app => app.status === ApplicationStatus.PENDING)} 
                pagination={false}
                size="middle"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  )
}

export default SuperAdminDashboard
