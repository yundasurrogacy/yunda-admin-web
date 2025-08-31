'use client'

import React, { useState } from 'react'
import { Card, Table, Tag, Button, Space, Input, Row, Col, Statistic, Modal, Descriptions, Avatar } from 'antd'
import {
  TeamOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  PhoneOutlined,
  MailOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  HeartOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockIntendedParentApplications } from '@/data/mockData'
import { ApplicationStatus, IntendedParentApplication } from '@/types/application'

const ParentsListPage = () => {
  // 只显示已批准的准父母
  const approvedParents = mockIntendedParentApplications.filter(app => app.status === ApplicationStatus.APPROVED)
  const [searchText, setSearchText] = useState('')
  const [budgetFilter, setBudgetFilter] = useState<'all' | 'under-100k' | '100k-150k' | '150k-200k' | 'over-200k'>('all')
  const [selectedParent, setSelectedParent] = useState<IntendedParentApplication | null>(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  // 筛选数据
  const filteredParents = approvedParents.filter(parent => {
    const matchSearch = searchText === '' || 
      parent.coupleNames.toLowerCase().includes(searchText.toLowerCase()) ||
      parent.primaryEmail.toLowerCase().includes(searchText.toLowerCase()) ||
      `${parent.location.city}, ${parent.location.state}`.toLowerCase().includes(searchText.toLowerCase())
    
    const matchBudget = budgetFilter === 'all' || 
      (budgetFilter === 'under-100k' && parent.budget.max < 100000) ||
      (budgetFilter === '100k-150k' && parent.budget.min >= 100000 && parent.budget.max <= 150000) ||
      (budgetFilter === '150k-200k' && parent.budget.min >= 150000 && parent.budget.max <= 200000) ||
      (budgetFilter === 'over-200k' && parent.budget.min > 200000)
    
    return matchSearch && matchBudget
  })

  const handleViewDetails = (parent: IntendedParentApplication) => {
    setSelectedParent(parent)
    setIsDetailModalVisible(true)
  }

  // 统计数据
  const totalParents = approvedParents.length
  const urgentParents = approvedParents.filter(p => p.expectedTimeline.includes('6个月内') || p.expectedTimeline.includes('立即')).length
  const highBudgetParents = approvedParents.filter(p => p.budget.max >= 150000).length

  const columns = [
    {
      title: '准父母',
      key: 'profile',
      render: (record: IntendedParentApplication) => (
        <div className="flex items-center space-x-3">
          <Avatar size={40} icon={<TeamOutlined />} />
          <div>
            <div className="font-medium">{record.coupleNames}</div>
            <div className="text-sm text-gray-500">{record.ageRange}</div>
          </div>
        </div>
      ),
    },
    {
      title: '联系方式',
      key: 'contact',
      render: (record: IntendedParentApplication) => (
        <div>
          <div className="flex items-center space-x-1 text-sm">
            <MailOutlined className="text-gray-400" />
            <span>{record.primaryEmail}</span>
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
      render: (record: IntendedParentApplication) => 
        `${record.location.city}, ${record.location.state}`,
    },
    {
      title: '关系状态',
      dataIndex: 'relationshipStatus',
      key: 'relationshipStatus',
    },
    {
      title: '预算范围',
      key: 'budget',
      render: (record: IntendedParentApplication) => (
        <div>
          <div className="font-medium text-green-600">
            ${record.budget.min.toLocaleString()} - ${record.budget.max.toLocaleString()}
          </div>
          <Tag color={record.budget.max >= 150000 ? 'gold' : 'blue'}>
            {record.budget.max >= 150000 ? '高预算' : '标准预算'}
          </Tag>
        </div>
      ),
      sorter: (a: IntendedParentApplication, b: IntendedParentApplication) => a.budget.max - b.budget.max,
    },
    {
      title: '期望时间',
      dataIndex: 'expectedTimeline',
      key: 'timeline',
      render: (timeline: string) => {
        const isUrgent = timeline.includes('6个月内') || timeline.includes('立即')
        return (
          <div>
            <div className="text-sm">{timeline}</div>
            <Tag color={isUrgent ? 'red' : 'blue'}>
              {isUrgent ? '紧急' : '正常'}
            </Tag>
          </div>
        )
      },
    },
    {
      title: '尝试次数',
      dataIndex: 'previousAttempts',
      key: 'attempts',
      render: (attempts: number) => (
        <span className="font-medium">{attempts}次</span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (record: IntendedParentApplication) => (
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
      icon: <TeamOutlined />,
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
      icon: <TeamOutlined />,
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
      icon: <TeamOutlined />,
      label: '案例管理',
      path: '/admin/super-admin/cases',
    },
    {
      key: 'account-management',
      icon: <TeamOutlined />,
      label: '账号管理',
      path: '/admin/super-admin/accounts',
    },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">准父母列表</h1>
          <p className="text-gray-600">查看所有已审核通过的准父母信息，支持筛选和搜索</p>
        </div>

        {/* 统计概览 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="总准父母数"
                value={totalParents}
                suffix="对"
                valueStyle={{ color: '#1890ff' }}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="紧急需求"
                value={urgentParents}
                suffix="对"
                valueStyle={{ color: '#ff4d4f' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="高预算客户"
                value={highBudgetParents}
                suffix="对"
                valueStyle={{ color: '#722ed1' }}
                prefix={<DollarOutlined />}
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
            <Col xs={24} sm={12} md={16}>
              <Space wrap>
                <span className="text-sm text-gray-600">预算筛选:</span>
                <Button 
                  size="small"
                  type={budgetFilter === 'all' ? 'primary' : 'default'}
                  onClick={() => setBudgetFilter('all')}
                >
                  全部
                </Button>
                <Button 
                  size="small"
                  type={budgetFilter === 'under-100k' ? 'primary' : 'default'}
                  onClick={() => setBudgetFilter('under-100k')}
                >
                  10万以下
                </Button>
                <Button 
                  size="small"
                  type={budgetFilter === '100k-150k' ? 'primary' : 'default'}
                  onClick={() => setBudgetFilter('100k-150k')}
                >
                  10-15万
                </Button>
                <Button 
                  size="small"
                  type={budgetFilter === '150k-200k' ? 'primary' : 'default'}
                  onClick={() => setBudgetFilter('150k-200k')}
                >
                  15-20万
                </Button>
                <Button 
                  size="small"
                  type={budgetFilter === 'over-200k' ? 'primary' : 'default'}
                  onClick={() => setBudgetFilter('over-200k')}
                >
                  20万以上
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* 准父母列表 */}
        <Card title={`准父母列表 (${filteredParents.length}对)`}>
          <Table 
            columns={columns} 
            dataSource={filteredParents}
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
          title="准父母详细信息"
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
          {selectedParent && (
            <div className="space-y-6">
              {/* 基本信息 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">基本信息</h3>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="姓名">{selectedParent.coupleNames}</Descriptions.Item>
                  <Descriptions.Item label="年龄范围">{selectedParent.ageRange}</Descriptions.Item>
                  <Descriptions.Item label="关系状态">{selectedParent.relationshipStatus}</Descriptions.Item>
                  <Descriptions.Item label="位置">
                    {`${selectedParent.location.city}, ${selectedParent.location.state}, ${selectedParent.location.country}`}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              {/* 联系信息 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">联系信息</h3>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="主要邮箱">{selectedParent.primaryEmail}</Descriptions.Item>
                  <Descriptions.Item label="备用邮箱">{selectedParent.secondaryEmail || '无'}</Descriptions.Item>
                  <Descriptions.Item label="电话">{selectedParent.phone}</Descriptions.Item>
                  <Descriptions.Item label="预算范围">
                    ${selectedParent.budget.min.toLocaleString()} - ${selectedParent.budget.max.toLocaleString()}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              {/* 生育信息 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">生育历史</h3>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="期望时间线">{selectedParent.expectedTimeline}</Descriptions.Item>
                  <Descriptions.Item label="之前尝试次数">{selectedParent.previousAttempts}次</Descriptions.Item>
                  <Descriptions.Item label="生育历史" span={2}>
                    {selectedParent.fertilityHistory}
                  </Descriptions.Item>
                  <Descriptions.Item label="医疗要求" span={2}>
                    {selectedParent.medicalRequirements}
                  </Descriptions.Item>
                  <Descriptions.Item label="法律问题" span={2}>
                    {selectedParent.legalQuestions}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              {/* 偏好设置 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">代孕母亲偏好</h3>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="年龄范围">
                    {selectedParent.preferredSurrogateProfile.ageRange}
                  </Descriptions.Item>
                  <Descriptions.Item label="位置偏好">
                    {selectedParent.preferredSurrogateProfile.location}
                  </Descriptions.Item>
                  <Descriptions.Item label="经验要求">
                    {selectedParent.preferredSurrogateProfile.experience ? '需要有经验' : '无经验要求'}
                  </Descriptions.Item>
                  <Descriptions.Item label="其他要求" span={2}>
                    {selectedParent.preferredSurrogateProfile.other}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              {/* 审核信息 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">审核信息</h3>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="申请时间">
                    {new Date(selectedParent.submittedAt).toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="审核时间">
                    {selectedParent.reviewedAt ? new Date(selectedParent.reviewedAt).toLocaleString() : '未审核'}
                  </Descriptions.Item>
                  <Descriptions.Item label="审核备注" span={2}>
                    {selectedParent.reviewNotes || '无'}
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

export default ParentsListPage
