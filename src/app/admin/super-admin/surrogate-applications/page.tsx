'use client'

import React, { useState } from 'react'
import { Card, Table, Tag, Button, Space, message, Modal, Descriptions, Input, Row, Col, Statistic } from 'antd'
import {
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  FilterOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSurrogateApplications } from '@/data/mockData'
import { ApplicationStatus, SurrogateApplication } from '@/types/application'

const { TextArea } = Input

const SurrogateApplicationsPage = () => {
  const [applications, setApplications] = useState(mockSurrogateApplications)
  const [selectedApplication, setSelectedApplication] = useState<SurrogateApplication | null>(null)
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
      app.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      app.email.toLowerCase().includes(searchText.toLowerCase())
    const matchStatus = statusFilter === 'all' || app.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleViewDetails = (application: SurrogateApplication) => {
    setSelectedApplication(application)
    setIsDetailModalVisible(true)
  }

  const handleReview = (application: SurrogateApplication, action: 'approve' | 'reject') => {
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
      `代孕母亲申请已${reviewAction === 'approve' ? '批准' : '拒绝'}，邮件通知已发送给 ${selectedApplication.email}`
    )
  }

  const columns = [
    {
      title: '申请人',
      key: 'applicant',
      render: (record: SurrogateApplication) => (
        <div>
          <div className="font-medium">{record.fullName}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '位置',
      key: 'location',
      render: (record: SurrogateApplication) => 
        `${record.location.city}, ${record.location.state}`,
    },
    {
      title: '子女数',
      dataIndex: 'numberOfChildren',
      key: 'numberOfChildren',
    },
    {
      title: '代孕经验',
      dataIndex: 'previousSurrogacyExperience',
      key: 'experience',
      render: (hasExperience: boolean) => (
        <Tag color={hasExperience ? 'green' : 'blue'}>
          {hasExperience ? '有经验' : '首次'}
        </Tag>
      ),
    },
    {
      title: '期望报酬',
      dataIndex: 'expectedCompensation',
      key: 'compensation',
      render: (amount: number) => `$${amount.toLocaleString()}`,
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
      render: (record: SurrogateApplication) => (
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">代孕母申请表审核</h1>
          <p className="text-gray-600">审核代孕母亲的申请，管理申请状态和发送通知</p>
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
                prefix={<UserOutlined />}
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
        <Card title="代孕母亲申请列表">
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
          title="代孕母亲申请详情"
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
              <Descriptions.Item label="姓名">{selectedApplication.fullName}</Descriptions.Item>
              <Descriptions.Item label="邮箱">{selectedApplication.email}</Descriptions.Item>
              <Descriptions.Item label="电话">{selectedApplication.phone}</Descriptions.Item>
              <Descriptions.Item label="年龄">{selectedApplication.age}岁</Descriptions.Item>
              <Descriptions.Item label="出生日期">{selectedApplication.dateOfBirth}</Descriptions.Item>
              <Descriptions.Item label="婚姻状况">{selectedApplication.maritalStatus}</Descriptions.Item>
              <Descriptions.Item label="子女数量">{selectedApplication.numberOfChildren}个</Descriptions.Item>
              <Descriptions.Item label="代孕经验">
                {selectedApplication.previousSurrogacyExperience ? '有经验' : '首次'}
              </Descriptions.Item>
              <Descriptions.Item label="位置" span={2}>
                {`${selectedApplication.location.city}, ${selectedApplication.location.state}, ${selectedApplication.location.country}`}
              </Descriptions.Item>
              <Descriptions.Item label="期望报酬" span={2}>
                ${selectedApplication.expectedCompensation.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="可开始日期" span={2}>
                {selectedApplication.availabilityDate}
              </Descriptions.Item>
              <Descriptions.Item label="医疗历史" span={2}>
                {selectedApplication.medicalHistory}
              </Descriptions.Item>
              <Descriptions.Item label="动机" span={2}>
                {selectedApplication.motivation}
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
              <strong>{selectedApplication?.fullName}</strong>的代孕母亲申请吗？
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

export default SurrogateApplicationsPage

