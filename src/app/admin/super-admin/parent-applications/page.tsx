'use client'

import React, { useState } from 'react'
import { Card, Table, Tag, Button, Space, message, Modal, Descriptions, Input, Row, Col, Statistic } from 'antd'
import {
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  FilterOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockIntendedParentApplications } from '@/data/mockData'
import { ApplicationStatus, IntendedParentApplication } from '@/types/application'

const { TextArea } = Input

const ParentApplicationsPage = () => {
  const [applications, setApplications] = useState(mockIntendedParentApplications)
  const [selectedApplication, setSelectedApplication] = useState<IntendedParentApplication | null>(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false)
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve')
  const [reviewNotes, setReviewNotes] = useState('')
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all')

  // 统计数据
  const pendingCount = applications.filter(app => app.status === ApplicationStatus.PENDING).length
  const approvedCount = applications.filter(app => app.status === ApplicationStatus.APPROVED).length
  const rejectedCount = applications.filter(app => app.status === ApplicationStatus.REJECTED).length

  // 筛选数据
  const filteredApplications = applications.filter(app => {
    const matchSearch = searchText === '' || 
      app.coupleNames.toLowerCase().includes(searchText.toLowerCase()) ||
      app.primaryEmail.toLowerCase().includes(searchText.toLowerCase())
    const matchStatus = statusFilter === 'all' || app.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleViewDetails = (application: IntendedParentApplication) => {
    setSelectedApplication(application)
    setIsDetailModalVisible(true)
  }

  const handleReview = (application: IntendedParentApplication, action: 'approve' | 'reject') => {
    setSelectedApplication(application)
    setReviewAction(action)
    setReviewNotes('')
    setIsReviewModalVisible(true)
  }

  const handleSubmitReview = () => {
    if (!selectedApplication) return

    const updatedApplications = applications.map(app =>
      app.id === selectedApplication.id
        ? {
            ...app,
            status: reviewAction === 'approve' ? ApplicationStatus.APPROVED : ApplicationStatus.REJECTED,
            reviewedAt: new Date().toISOString(),
            reviewedBy: 'admin-001',
            reviewNotes: reviewNotes
          }
        : app
    )

    setApplications(updatedApplications)
    setIsReviewModalVisible(false)
    
    message.success(
      `准父母申请已${reviewAction === 'approve' ? '批准' : '拒绝'}，邮件通知已发送给 ${selectedApplication.primaryEmail}`
    )
  }

  const columns = [
    {
      title: '申请人',
      key: 'applicant',
      render: (record: IntendedParentApplication) => (
        <div>
          <div className="font-medium">{record.coupleNames}</div>
          <div className="text-sm text-gray-500">{record.primaryEmail}</div>
        </div>
      ),
    },
    {
      title: '年龄范围',
      dataIndex: 'ageRange',
      key: 'ageRange',
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
      render: (record: IntendedParentApplication) => 
        `$${record.budget.min.toLocaleString()} - $${record.budget.max.toLocaleString()}`,
    },
    {
      title: '期望时间',
      dataIndex: 'expectedTimeline',
      key: 'expectedTimeline',
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
      title: '申请时间',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
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
            查看
          </Button>
          {record.status === ApplicationStatus.PENDING && (
            <>
              <Button 
                type="link" 
                size="small" 
                icon={<CheckCircleOutlined />}
                onClick={() => handleReview(record, 'approve')}
              >
                批准
              </Button>
              <Button 
                type="link" 
                size="small" 
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => handleReview(record, 'reject')}
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">准父母申请表审核</h1>
          <p className="text-gray-600">审核准父母的申请，管理申请状态和发送通知</p>
        </div>

        {/* 统计概览 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="待审核申请"
                value={pendingCount}
                suffix="份"
                valueStyle={{ color: '#faad14' }}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="已批准申请"
                value={approvedCount}
                suffix="份"
                valueStyle={{ color: '#52c41a' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="已拒绝申请"
                value={rejectedCount}
                suffix="份"
                valueStyle={{ color: '#ff4d4f' }}
                prefix={<CloseCircleOutlined />}
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
              <Space>
                <Button 
                  type={statusFilter === 'all' ? 'primary' : 'default'}
                  onClick={() => setStatusFilter('all')}
                >
                  全部
                </Button>
                <Button 
                  type={statusFilter === ApplicationStatus.PENDING ? 'primary' : 'default'}
                  onClick={() => setStatusFilter(ApplicationStatus.PENDING)}
                >
                  待审核
                </Button>
                <Button 
                  type={statusFilter === ApplicationStatus.APPROVED ? 'primary' : 'default'}
                  onClick={() => setStatusFilter(ApplicationStatus.APPROVED)}
                >
                  已批准
                </Button>
                <Button 
                  type={statusFilter === ApplicationStatus.REJECTED ? 'primary' : 'default'}
                  onClick={() => setStatusFilter(ApplicationStatus.REJECTED)}
                >
                  已拒绝
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* 申请列表 */}
        <Card title="准父母申请列表">
          <Table 
            columns={columns} 
            dataSource={filteredApplications}
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
          title="准父母申请详情"
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
              关闭
            </Button>,
          ]}
          width={800}
        >
          {selectedApplication && (
            <Descriptions column={2} bordered>
              <Descriptions.Item label="姓名">{selectedApplication.coupleNames}</Descriptions.Item>
              <Descriptions.Item label="主要邮箱">{selectedApplication.primaryEmail}</Descriptions.Item>
              <Descriptions.Item label="备用邮箱">{selectedApplication.secondaryEmail || '无'}</Descriptions.Item>
              <Descriptions.Item label="电话">{selectedApplication.phone}</Descriptions.Item>
              <Descriptions.Item label="年龄范围">{selectedApplication.ageRange}</Descriptions.Item>
              <Descriptions.Item label="关系状态">{selectedApplication.relationshipStatus}</Descriptions.Item>
              <Descriptions.Item label="位置" span={2}>
                {`${selectedApplication.location.city}, ${selectedApplication.location.state}, ${selectedApplication.location.country}`}
              </Descriptions.Item>
              <Descriptions.Item label="预算范围" span={2}>
                ${selectedApplication.budget.min.toLocaleString()} - ${selectedApplication.budget.max.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="期望时间线" span={2}>
                {selectedApplication.expectedTimeline}
              </Descriptions.Item>
              <Descriptions.Item label="生育历史" span={2}>
                {selectedApplication.fertilityHistory}
              </Descriptions.Item>
              <Descriptions.Item label="之前尝试次数" span={2}>
                {selectedApplication.previousAttempts}次
              </Descriptions.Item>
              <Descriptions.Item label="偏好代孕母亲资料" span={2}>
                <div>
                  <p><strong>年龄:</strong> {selectedApplication.preferredSurrogateProfile.ageRange}</p>
                  <p><strong>位置:</strong> {selectedApplication.preferredSurrogateProfile.location}</p>
                  <p><strong>经验要求:</strong> {selectedApplication.preferredSurrogateProfile.experience ? '有经验' : '无要求'}</p>
                  <p><strong>其他要求:</strong> {selectedApplication.preferredSurrogateProfile.other}</p>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="医疗要求" span={2}>
                {selectedApplication.medicalRequirements}
              </Descriptions.Item>
              <Descriptions.Item label="法律问题" span={2}>
                {selectedApplication.legalQuestions}
              </Descriptions.Item>
              <Descriptions.Item label="申请时间" span={2}>
                {new Date(selectedApplication.submittedAt).toLocaleString()}
              </Descriptions.Item>
              {selectedApplication.reviewedAt && (
                <>
                  <Descriptions.Item label="审核时间" span={2}>
                    {new Date(selectedApplication.reviewedAt).toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="审核备注" span={2}>
                    {selectedApplication.reviewNotes || '无'}
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>
          )}
        </Modal>

        {/* 审核模态框 */}
        <Modal
          title={`${reviewAction === 'approve' ? '批准' : '拒绝'}申请`}
          open={isReviewModalVisible}
          onOk={handleSubmitReview}
          onCancel={() => setIsReviewModalVisible(false)}
          okText="确认"
          cancelText="取消"
        >
          <div className="space-y-4">
            <p>
              您确定要<strong>{reviewAction === 'approve' ? '批准' : '拒绝'}</strong>
              <strong>{selectedApplication?.coupleNames}</strong>的准父母申请吗？
            </p>
            <div>
              <label className="block text-sm font-medium mb-2">审核备注</label>
              <TextArea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder={`请输入${reviewAction === 'approve' ? '批准' : '拒绝'}的原因或备注...`}
                rows={4}
              />
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default ParentApplicationsPage




