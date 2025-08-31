'use client'

import React, { useState } from 'react'
import { Card, Table, Tag, Button, Space, Input, Row, Col, Statistic, Modal, Descriptions, Avatar } from 'antd'
import {
  UserOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  PhoneOutlined,
  MailOutlined,
  HeartOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSurrogateApplications } from '@/data/mockData'
import { ApplicationStatus, SurrogateApplication } from '@/types/application'

const SurrogatesListPage = () => {
  // 只显示已批准的代孕母亲
  const approvedSurrogates = mockSurrogateApplications.filter(app => app.status === ApplicationStatus.APPROVED)
  const [searchText, setSearchText] = useState('')
  const [ageFilter, setAgeFilter] = useState<'all' | '20-25' | '26-30' | '31-35' | '36-40'>('all')
  const [experienceFilter, setExperienceFilter] = useState<'all' | 'experienced' | 'first-time'>('all')
  const [selectedSurrogate, setSelectedSurrogate] = useState<SurrogateApplication | null>(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  // 筛选数据
  const filteredSurrogates = approvedSurrogates.filter(surrogate => {
    const matchSearch = searchText === '' || 
      surrogate.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      surrogate.email.toLowerCase().includes(searchText.toLowerCase()) ||
      `${surrogate.location.city}, ${surrogate.location.state}`.toLowerCase().includes(searchText.toLowerCase())
    
    const matchAge = ageFilter === 'all' || 
      (ageFilter === '20-25' && surrogate.age >= 20 && surrogate.age <= 25) ||
      (ageFilter === '26-30' && surrogate.age >= 26 && surrogate.age <= 30) ||
      (ageFilter === '31-35' && surrogate.age >= 31 && surrogate.age <= 35) ||
      (ageFilter === '36-40' && surrogate.age >= 36 && surrogate.age <= 40)
    
    const matchExperience = experienceFilter === 'all' ||
      (experienceFilter === 'experienced' && surrogate.previousSurrogacyExperience) ||
      (experienceFilter === 'first-time' && !surrogate.previousSurrogacyExperience)
    
    return matchSearch && matchAge && matchExperience
  })

  const handleViewDetails = (surrogate: SurrogateApplication) => {
    setSelectedSurrogate(surrogate)
    setIsDetailModalVisible(true)
  }

  // 统计数据
  const totalSurrogates = approvedSurrogates.length
  const experiencedSurrogates = approvedSurrogates.filter(s => s.previousSurrogacyExperience).length
  const availableSurrogates = approvedSurrogates.filter(s => new Date(s.availabilityDate) <= new Date()).length

  const columns = [
    {
      title: '代孕母亲',
      key: 'profile',
      render: (record: SurrogateApplication) => (
        <div className="flex items-center space-x-3">
          <Avatar size={40} icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.fullName}</div>
            <div className="text-sm text-gray-500">{record.age}岁</div>
          </div>
        </div>
      ),
    },
    {
      title: '联系方式',
      key: 'contact',
      render: (record: SurrogateApplication) => (
        <div>
          <div className="flex items-center space-x-1 text-sm">
            <MailOutlined className="text-gray-400" />
            <span>{record.email}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <PhoneOutlined className="text-gray-400" />
            <span>{record.phone}</span>
          </div>
        </div>
      ),
    },
    {
      title: '位置',
      key: 'location',
      render: (record: SurrogateApplication) => 
        `${record.location.city}, ${record.location.state}`,
    },
    {
      title: '家庭情况',
      key: 'family',
      render: (record: SurrogateApplication) => (
        <div>
          <div className="text-sm">{record.maritalStatus}</div>
          <div className="text-sm text-gray-500">{record.numberOfChildren}个孩子</div>
        </div>
      ),
    },
    {
      title: '代孕经验',
      dataIndex: 'previousSurrogacyExperience',
      key: 'experience',
      render: (hasExperience: boolean) => (
        <Tag color={hasExperience ? 'green' : 'blue'} icon={hasExperience ? <CheckCircleOutlined /> : undefined}>
          {hasExperience ? '有经验' : '首次代孕'}
        </Tag>
      ),
    },
    {
      title: '期望报酬',
      dataIndex: 'expectedCompensation',
      key: 'compensation',
      render: (amount: number) => (
        <span className="font-medium text-green-600">${amount.toLocaleString()}</span>
      ),
      sorter: (a: SurrogateApplication, b: SurrogateApplication) => a.expectedCompensation - b.expectedCompensation,
    },
    {
      title: '可开始时间',
      dataIndex: 'availabilityDate',
      key: 'availability',
      render: (date: string) => {
        const availableDate = new Date(date)
        const isAvailable = availableDate <= new Date()
        return (
          <div>
            <div className="text-sm">{availableDate.toLocaleDateString()}</div>
            <Tag color={isAvailable ? 'green' : 'orange'}>
              {isAvailable ? '可开始' : '待开始'}
            </Tag>
          </div>
        )
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (record: SurrogateApplication) => (
        <Space>
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            查看详情
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<HeartOutlined />}
          >
            匹配推荐
          </Button>
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
      icon: <UserOutlined />,
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
      icon: <UserOutlined />,
      label: '准父母',
      path: '/admin/super-admin/parents',
    },
    {
      key: 'case-management',
      icon: <UserOutlined />,
      label: '案例管理',
      path: '/admin/super-admin/cases',
    },
    {
      key: 'account-management',
      icon: <UserOutlined />,
      label: '账号管理',
      path: '/admin/super-admin/accounts',
    },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">代孕母亲列表</h1>
          <p className="text-gray-600">查看所有已审核通过的代孕母亲信息，支持筛选和搜索</p>
        </div>

        {/* 统计概览 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="总代孕母亲数"
                value={totalSurrogates}
                suffix="位"
                valueStyle={{ color: '#1890ff' }}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="有经验代孕母亲"
                value={experiencedSurrogates}
                suffix="位"
                valueStyle={{ color: '#52c41a' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="当前可开始"
                value={availableSurrogates}
                suffix="位"
                valueStyle={{ color: '#722ed1' }}
                prefix={<HeartOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* 搜索和筛选 */}
        <Card>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="搜索姓名、邮箱或位置"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Space wrap>
                <span className="text-sm text-gray-600">年龄:</span>
                <Button 
                  size="small"
                  type={ageFilter === 'all' ? 'primary' : 'default'}
                  onClick={() => setAgeFilter('all')}
                >
                  全部
                </Button>
                <Button 
                  size="small"
                  type={ageFilter === '20-25' ? 'primary' : 'default'}
                  onClick={() => setAgeFilter('20-25')}
                >
                  20-25岁
                </Button>
                <Button 
                  size="small"
                  type={ageFilter === '26-30' ? 'primary' : 'default'}
                  onClick={() => setAgeFilter('26-30')}
                >
                  26-30岁
                </Button>
                <Button 
                  size="small"
                  type={ageFilter === '31-35' ? 'primary' : 'default'}
                  onClick={() => setAgeFilter('31-35')}
                >
                  31-35岁
                </Button>
                <Button 
                  size="small"
                  type={ageFilter === '36-40' ? 'primary' : 'default'}
                  onClick={() => setAgeFilter('36-40')}
                >
                  36-40岁
                </Button>
              </Space>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Space wrap>
                <span className="text-sm text-gray-600">经验:</span>
                <Button 
                  size="small"
                  type={experienceFilter === 'all' ? 'primary' : 'default'}
                  onClick={() => setExperienceFilter('all')}
                >
                  全部
                </Button>
                <Button 
                  size="small"
                  type={experienceFilter === 'experienced' ? 'primary' : 'default'}
                  onClick={() => setExperienceFilter('experienced')}
                >
                  有经验
                </Button>
                <Button 
                  size="small"
                  type={experienceFilter === 'first-time' ? 'primary' : 'default'}
                  onClick={() => setExperienceFilter('first-time')}
                >
                  首次
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* 代孕母亲列表 */}
        <Card title={`代孕母亲列表 (${filteredSurrogates.length}位)`}>
          <Table 
            columns={columns} 
            dataSource={filteredSurrogates}
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

        {/* 详情模态框 */}
        <Modal
          title="代孕母亲详细信息"
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
              关闭
            </Button>,
            <Button key="match" type="primary" icon={<HeartOutlined />}>
              推荐匹配
            </Button>,
          ]}
          width={800}
        >
          {selectedSurrogate && (
            <div className="space-y-6">
              {/* 基本信息 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">基本信息</h3>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="姓名">{selectedSurrogate.fullName}</Descriptions.Item>
                  <Descriptions.Item label="年龄">{selectedSurrogate.age}岁</Descriptions.Item>
                  <Descriptions.Item label="出生日期">{selectedSurrogate.dateOfBirth}</Descriptions.Item>
                  <Descriptions.Item label="婚姻状况">{selectedSurrogate.maritalStatus}</Descriptions.Item>
                  <Descriptions.Item label="子女数量">{selectedSurrogate.numberOfChildren}个</Descriptions.Item>
                  <Descriptions.Item label="代孕经验">
                    {selectedSurrogate.previousSurrogacyExperience ? '有经验' : '首次代孕'}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              {/* 联系信息 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">联系信息</h3>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="邮箱">{selectedSurrogate.email}</Descriptions.Item>
                  <Descriptions.Item label="电话">{selectedSurrogate.phone}</Descriptions.Item>
                  <Descriptions.Item label="位置" span={2}>
                    {`${selectedSurrogate.location.city}, ${selectedSurrogate.location.state}, ${selectedSurrogate.location.country}`}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              {/* 代孕信息 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">代孕相关信息</h3>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="期望报酬">
                    ${selectedSurrogate.expectedCompensation.toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="可开始日期">
                    {selectedSurrogate.availabilityDate}
                  </Descriptions.Item>
                  <Descriptions.Item label="医疗历史" span={2}>
                    {selectedSurrogate.medicalHistory}
                  </Descriptions.Item>
                  <Descriptions.Item label="动机说明" span={2}>
                    {selectedSurrogate.motivation}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              {/* 审核信息 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">审核信息</h3>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="申请时间">
                    {new Date(selectedSurrogate.submittedAt).toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="审核时间">
                    {selectedSurrogate.reviewedAt ? new Date(selectedSurrogate.reviewedAt).toLocaleString() : '未审核'}
                  </Descriptions.Item>
                  <Descriptions.Item label="审核备注" span={2}>
                    {selectedSurrogate.reviewNotes || '无'}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default SurrogatesListPage
