'use client'

import React, { useState } from 'react'
import { Card, Table, Tag, Button, Space, Input, Row, Col, Statistic, Modal, Form, Select, message, Descriptions, Steps } from 'antd'
import {
  FileOutlined,
  EyeOutlined,
  SearchOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSurrogacyCases, mockSurrogateApplications, mockIntendedParentApplications } from '@/data/mockData'
import { CaseStatus, SurrogacyCase, ApplicationStatus } from '@/types/application'

const { Option } = Select

const CaseManagementPage = () => {
  const [cases, setCases] = useState(mockSurrogacyCases)
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false)
  const [selectedCase, setSelectedCase] = useState<SurrogacyCase | null>(null)
  const [createForm] = Form.useForm()
  const [assignForm] = Form.useForm()
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'all'>('all')

  // 获取已批准的代孕母亲和准父母
  const approvedSurrogates = mockSurrogateApplications.filter(app => app.status === ApplicationStatus.APPROVED)
  const approvedParents = mockIntendedParentApplications.filter(app => app.status === ApplicationStatus.APPROVED)

  // 模拟代理机构列表
  const agencies = [
    { id: 'agency-001', name: '优质代理服务', agent: '张经理' },
    { id: 'agency-002', name: '专业代孕机构', agent: '李经理' },
    { id: 'agency-003', name: '信誉代理公司', agent: '王经理' },
  ]

  // 筛选数据
  const filteredCases = cases.filter(caseItem => {
    const matchSearch = searchText === '' || 
      caseItem.caseNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      caseItem.intendedParents.names.toLowerCase().includes(searchText.toLowerCase()) ||
      caseItem.surrogate.name.toLowerCase().includes(searchText.toLowerCase())
    
    const matchStatus = statusFilter === 'all' || caseItem.status === statusFilter
    
    return matchSearch && matchStatus
  })

  // 统计数据
  const totalCases = cases.length
  const activeCases = cases.filter(c => c.status !== CaseStatus.COMPLETED).length
  const assignedCases = cases.filter(c => c.assignedAgency).length

  const handleCreateCase = (values: any) => {
    const selectedSurrogate = approvedSurrogates.find(s => s.id === values.surrogateId)
    const selectedParent = approvedParents.find(p => p.id === values.parentId)

    if (!selectedSurrogate || !selectedParent) {
      message.error('选择的代孕母亲或准父母不存在')
      return
    }

    const newCase: SurrogacyCase = {
      id: `case-${Date.now()}`,
      caseNumber: `YD-2024-${String(cases.length + 1).padStart(3, '0')}`,
      intendedParents: {
        applicationId: selectedParent.id,
        names: selectedParent.coupleNames,
        email: selectedParent.primaryEmail,
        location: selectedParent.location,
        budget: selectedParent.budget,
        urgency: 'medium',
      },
      surrogate: {
        applicationId: selectedSurrogate.id,
        name: selectedSurrogate.fullName,
        email: selectedSurrogate.email,
        age: selectedSurrogate.age,
        location: selectedSurrogate.location,
        experience: selectedSurrogate.medicalHistory || '无相关经验',
        status: 'matched',
        expectedCompensation: 50000,
        availableFrom: new Date().toISOString(),
      },
      status: CaseStatus.CREATED,
      createdAt: new Date().toISOString(),
      startDate: new Date().toISOString(),
      createdBy: 'admin-001',
      timeline: [
        {
          id: 'timeline-001',
          stage: CaseStatus.CREATED,
          completedAt: new Date().toISOString(),
          notes: '案例创建成功',
          completedBy: 'admin-001',
        },
      ],
      documents: [],
      notes: [],
    }

    setCases([...cases, newCase])
    setIsCreateModalVisible(false)
    createForm.resetFields()
    message.success(`案例 ${newCase.caseNumber} 创建成功！`)
  }

  const handleAssignAgency = (values: any) => {
    if (!selectedCase) return

    const selectedAgency = agencies.find(a => a.id === values.agencyId)
    if (!selectedAgency) {
      message.error('选择的代理机构不存在')
      return
    }

    const updatedCases = cases.map(caseItem =>
      caseItem.id === selectedCase.id
        ? {
            ...caseItem,
            assignedAgency: {
              agencyId: selectedAgency.id,
              agencyName: selectedAgency.name,
              agentName: selectedAgency.agent,
            },
            status: CaseStatus.ASSIGNED_TO_AGENCY,
            assignedAt: new Date().toISOString(),
            timeline: [
              ...caseItem.timeline,
              {
                id: `timeline-${Date.now()}`,
                stage: CaseStatus.ASSIGNED_TO_AGENCY,
                completedAt: new Date().toISOString(),
                notes: `分配给 ${selectedAgency.name}`,
                completedBy: 'admin-001',
              },
            ],
          }
        : caseItem
    )

    setCases(updatedCases)
    setIsAssignModalVisible(false)
    assignForm.resetFields()
    message.success(`案例已分配给 ${selectedAgency.name}`)
  }

  const getStatusLabel = (status: CaseStatus): string => {
    const labels = {
      [CaseStatus.CREATED]: '已创建',
      [CaseStatus.ASSIGNED_TO_AGENCY]: '已分配',
      [CaseStatus.DOCUMENT_COLLECTION]: '文件收集中',
      [CaseStatus.LEGAL_REVIEW]: '法律审核',
      [CaseStatus.MEDICAL_PREPARATION]: '医疗准备',
      [CaseStatus.EMBRYO_TRANSFER]: '胚胎移植',
      [CaseStatus.PREGNANCY_MONITORING]: '妊娠监测',
      [CaseStatus.DELIVERY]: '分娩',
      [CaseStatus.COMPLETED]: '已完成',
    }
    return labels[status] || '未知状态'
  }

  const getStatusColor = (status: CaseStatus): string => {
    const colors = {
      [CaseStatus.CREATED]: 'blue',
      [CaseStatus.ASSIGNED_TO_AGENCY]: 'cyan',
      [CaseStatus.DOCUMENT_COLLECTION]: 'orange',
      [CaseStatus.LEGAL_REVIEW]: 'purple',
      [CaseStatus.MEDICAL_PREPARATION]: 'geekblue',
      [CaseStatus.EMBRYO_TRANSFER]: 'magenta',
      [CaseStatus.PREGNANCY_MONITORING]: 'lime',
      [CaseStatus.DELIVERY]: 'gold',
      [CaseStatus.COMPLETED]: 'green',
    }
    return colors[status] || 'default'
  }

  const columns = [
    {
      title: '案例编号',
      dataIndex: 'caseNumber',
      key: 'caseNumber',
      render: (caseNumber: string) => (
        <span className="font-mono text-blue-600 font-medium">{caseNumber}</span>
      ),
    },
    {
      title: '准父母',
      key: 'intendedParents',
      render: (record: SurrogacyCase) => (
        <div>
          <div className="font-medium">{record.intendedParents.names}</div>
          <div className="text-sm text-gray-500">{record.intendedParents.email}</div>
        </div>
      ),
    },
    {
      title: '代孕母亲',
      key: 'surrogate',
      render: (record: SurrogacyCase) => (
        <div>
          <div className="font-medium">{record.surrogate.name}</div>
          <div className="text-sm text-gray-500">{record.surrogate.email}</div>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: CaseStatus) => (
        <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>
      ),
    },
    {
      title: '分配机构',
      key: 'assignedAgency',
      render: (record: SurrogacyCase) => (
        record.assignedAgency ? (
          <div>
            <div className="font-medium">{record.assignedAgency.agencyName}</div>
            <div className="text-sm text-gray-500">{record.assignedAgency.agentName}</div>
          </div>
        ) : (
          <Tag color="orange">未分配</Tag>
        )
      ),
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
      render: (record: SurrogacyCase) => (
        <Space>
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedCase(record)
              setIsDetailModalVisible(true)
            }}
          >
            查看
          </Button>
          {!record.assignedAgency && (
            <Button 
              type="link" 
              size="small" 
              icon={<SendOutlined />}
              onClick={() => {
                setSelectedCase(record)
                setIsAssignModalVisible(true)
              }}
            >
              分配机构
            </Button>
          )}
        </Space>
      ),
    },
  ]

  const menuItems = [
    {
      key: 'surrogate-applications',
      icon: <FileOutlined />,
      label: '代孕母申请表',
      path: '/admin/super-admin/surrogate-applications',
    },
    {
      key: 'parent-applications',
      icon: <FileOutlined />,
      label: '准父母申请表',
      path: '/admin/super-admin/parent-applications',
    },
    {
      key: 'surrogate-list',
      icon: <FileOutlined />,
      label: '代孕母亲',
      path: '/admin/super-admin/surrogates',
    },
    {
      key: 'parent-list',
      icon: <FileOutlined />,
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
      icon: <FileOutlined />,
      label: '账号管理',
      path: '/admin/super-admin/accounts',
    },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">案例管理</h1>
          <p className="text-gray-600">创建新案例、分配代理机构、跟踪案例进度</p>
        </div>

        {/* 统计概览 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="总案例数"
                value={totalCases}
                suffix="个"
                valueStyle={{ color: '#1890ff' }}
                prefix={<FileOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="活跃案例"
                value={activeCases}
                suffix="个"
                valueStyle={{ color: '#52c41a' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="已分配案例"
                value={assignedCases}
                suffix="个"
                valueStyle={{ color: '#722ed1' }}
                prefix={<SendOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* 搜索和筛选 */}
        <Card>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="搜索案例编号、准父母或代孕母亲"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Space wrap>
                <Button 
                  size="small"
                  type={statusFilter === 'all' ? 'primary' : 'default'}
                  onClick={() => setStatusFilter('all')}
                >
                  全部状态
                </Button>
                <Button 
                  size="small"
                  type={statusFilter === CaseStatus.CREATED ? 'primary' : 'default'}
                  onClick={() => setStatusFilter(CaseStatus.CREATED)}
                >
                  已创建
                </Button>
                <Button 
                  size="small"
                  type={statusFilter === CaseStatus.ASSIGNED_TO_AGENCY ? 'primary' : 'default'}
                  onClick={() => setStatusFilter(CaseStatus.ASSIGNED_TO_AGENCY)}
                >
                  已分配
                </Button>
                <Button 
                  size="small"
                  type={statusFilter === CaseStatus.PREGNANCY_MONITORING ? 'primary' : 'default'}
                  onClick={() => setStatusFilter(CaseStatus.PREGNANCY_MONITORING)}
                >
                  妊娠监测
                </Button>
              </Space>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsCreateModalVisible(true)}
              >
                创建新案例
              </Button>
            </Col>
          </Row>
        </Card>

        {/* 案例列表 */}
        <Card title={`案例列表 (${filteredCases.length}个)`}>
          <Table 
            columns={columns} 
            dataSource={filteredCases}
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

        {/* 创建案例模态框 */}
        <Modal
          title="创建新案例"
          open={isCreateModalVisible}
          onCancel={() => setIsCreateModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form
            form={createForm}
            layout="vertical"
            onFinish={handleCreateCase}
          >
            <Form.Item
              label="选择准父母"
              name="parentId"
              rules={[{ required: true, message: '请选择准父母' }]}
            >
              <Select placeholder="选择准父母">
                {approvedParents.map(parent => (
                  <Option key={parent.id} value={parent.id}>
                    {parent.coupleNames} ({parent.primaryEmail})
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="选择代孕母亲"
              name="surrogateId"
              rules={[{ required: true, message: '请选择代孕母亲' }]}
            >
              <Select placeholder="选择代孕母亲">
                {approvedSurrogates.map(surrogate => (
                  <Option key={surrogate.id} value={surrogate.id}>
                    {surrogate.fullName} ({surrogate.age}岁, {surrogate.location.city})
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsCreateModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                创建案例
              </Button>
            </div>
          </Form>
        </Modal>

        {/* 分配代理机构模态框 */}
        <Modal
          title="分配代理机构"
          open={isAssignModalVisible}
          onCancel={() => setIsAssignModalVisible(false)}
          footer={null}
          width={500}
        >
          <Form
            form={assignForm}
            layout="vertical"
            onFinish={handleAssignAgency}
          >
            <p className="mb-4">
              案例编号: <strong>{selectedCase?.caseNumber}</strong>
            </p>

            <Form.Item
              label="选择代理机构"
              name="agencyId"
              rules={[{ required: true, message: '请选择代理机构' }]}
            >
              <Select placeholder="选择代理机构">
                {agencies.map(agency => (
                  <Option key={agency.id} value={agency.id}>
                    {agency.name} - {agency.agent}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsAssignModalVisible(false)}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                分配
              </Button>
            </div>
          </Form>
        </Modal>

        {/* 案例详情模态框 */}
        <Modal
          title="案例详情"
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
              关闭
            </Button>,
          ]}
          width={800}
        >
          {selectedCase && (
            <div className="space-y-6">
              {/* 基本信息 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">基本信息</h3>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="案例编号">{selectedCase.caseNumber}</Descriptions.Item>
                  <Descriptions.Item label="当前状态">
                    <Tag color={getStatusColor(selectedCase.status)}>
                      {getStatusLabel(selectedCase.status)}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="创建时间">
                    {new Date(selectedCase.createdAt).toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="创建人">{selectedCase.createdBy}</Descriptions.Item>
                </Descriptions>
              </div>

              {/* 参与方信息 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">参与方信息</h3>
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="准父母">{selectedCase.intendedParents.names}</Descriptions.Item>
                  <Descriptions.Item label="准父母邮箱">{selectedCase.intendedParents.email}</Descriptions.Item>
                  <Descriptions.Item label="代孕母亲">{selectedCase.surrogate.name}</Descriptions.Item>
                  <Descriptions.Item label="代孕母亲邮箱">{selectedCase.surrogate.email}</Descriptions.Item>
                  {selectedCase.assignedAgency && (
                    <>
                      <Descriptions.Item label="代理机构">{selectedCase.assignedAgency.agencyName}</Descriptions.Item>
                      <Descriptions.Item label="负责人">{selectedCase.assignedAgency.agentName}</Descriptions.Item>
                    </>
                  )}
                </Descriptions>
              </div>

              {/* 进度时间线 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">进度时间线</h3>
                <div className="bg-gray-50 p-4 rounded">
                  {selectedCase.timeline.map((item, index) => (
                    <div key={item.id} className="flex items-start space-x-3 mb-3 last:mb-0">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{getStatusLabel(item.stage)}</span>
                          <span className="text-sm text-gray-500">
                            {item.completedAt ? new Date(item.completedAt).toLocaleString() : '进行中'}
                          </span>
                        </div>
                        {item.notes && (
                          <div className="text-sm text-gray-600 mt-1">{item.notes}</div>
                        )}
                        {item.completedBy && (
                          <div className="text-xs text-gray-500 mt-1">操作人: {item.completedBy}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default CaseManagementPage
