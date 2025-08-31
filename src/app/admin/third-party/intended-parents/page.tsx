'use client'

import React, { useState } from 'react'
import { Card, Table, Tag, Button, Modal, Avatar, Input, Space, Row, Col, Descriptions, Statistic } from 'antd'
import {
  ContainerOutlined,
  FileTextOutlined,
  UserOutlined,
  TeamOutlined,
  EyeOutlined,
  SearchOutlined,
  MessageOutlined,
  DollarOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined,
  HeartOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSurrogacyCases } from '@/data/mockData'

const { Search } = Input

const AgencyIntendedParentsPage = () => {
  const [selectedParent, setSelectedParent] = useState<any>(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [searchText, setSearchText] = useState('')

  // 获取分配给当前代理机构的案例相关的准父母
  const assignedCases = mockSurrogacyCases.filter(
    caseItem => caseItem.assignedAgency?.agencyId === 'agency-001'
  )

  const intendedParents = assignedCases.map(caseItem => ({
    ...caseItem.intendedParents,
    caseId: caseItem.id,
    caseNumber: caseItem.caseNumber,
    caseStatus: caseItem.status,
    surrogateName: caseItem.surrogate.name,
    startDate: caseItem.startDate,
  }))

  const filteredParents = intendedParents.filter(parent =>
    parent.names.toLowerCase().includes(searchText.toLowerCase()) ||
    parent.caseNumber.toLowerCase().includes(searchText.toLowerCase())
  )

  const handleViewDetails = (parent: any) => {
    setSelectedParent(parent)
    setIsDetailModalVisible(true)
  }

  const getUrgencyColor = (urgency: string): string => {
    const colorMap = {
      'high': 'red',
      'medium': 'orange',
      'low': 'green',
    }
    return colorMap[urgency as keyof typeof colorMap] || 'default'
  }

  const getUrgencyLabel = (urgency: string): string => {
    const labelMap = {
      'high': '高',
      'medium': '中',
      'low': '低',
    }
    return labelMap[urgency as keyof typeof labelMap] || urgency
  }

  const columns = [
    {
      title: '准父母',
      key: 'parents',
      render: (record: any) => (
        <div className="flex items-center space-x-3">
          <Avatar size={40} icon={<TeamOutlined />} />
          <div>
            <div className="font-medium">{record.names}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: '案例编号',
      dataIndex: 'caseNumber',
      key: 'caseNumber',
      render: (caseNumber: string) => (
        <span className="font-mono text-blue-600">{caseNumber}</span>
      ),
    },
    {
      title: '地区',
      key: 'location',
      render: (record: any) => (
        <span>{record.location.city}, {record.location.state}</span>
      ),
    },
    {
      title: '代孕母亲',
      dataIndex: 'surrogateName',
      key: 'surrogateName',
    },
    {
      title: '预算范围',
      key: 'budget',
      render: (record: any) => (
        <span>
          ${record.budget.min?.toLocaleString()} - ${record.budget.max?.toLocaleString()}
        </span>
      ),
    },
    {
      title: '紧急程度',
      dataIndex: 'urgency',
      key: 'urgency',
      render: (urgency: string) => (
        <Tag color={getUrgencyColor(urgency)}>
          {getUrgencyLabel(urgency)}
        </Tag>
      ),
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <div className="space-x-2">
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          >
            查看
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<MessageOutlined />}
          >
            联系
          </Button>
        </div>
      ),
    },
  ]

  const menuItems = [
    {
      key: 'case-management',
      icon: <FileTextOutlined />,
      label: '案例管理',
      path: '/admin/third-party/case-management',
    },
    {
      key: 'surrogates',
      icon: <UserOutlined />,
      label: '代孕母亲',
      path: '/admin/third-party/surrogates',
    },
    {
      key: 'intended-parents',
      icon: <TeamOutlined />,
      label: '准父母',
      path: '/admin/third-party/intended-parents',
    },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">准父母</h1>
          <p className="text-gray-600">管理您负责案例的准父母客户资料</p>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <Statistic
                title="总客户数"
                value={intendedParents.length}
                valueStyle={{ color: '#1890ff' }}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <Statistic
                title="高优先级"
                value={intendedParents.filter(p => p.urgency === 'high').length}
                valueStyle={{ color: '#ff4d4f' }}
                prefix={<HeartOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <Statistic
                title="平均预算"
                value={Math.round(intendedParents.reduce((sum, p) => sum + (p.budget.max || 0), 0) / intendedParents.length)}
                prefix={<DollarOutlined />}
                suffix="K"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <Statistic
                title="本月新增"
                value={2}
                valueStyle={{ color: '#722ed1' }}
                prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* 搜索和过滤 */}
        <Card>
          <Space size="middle">
            <Search
              placeholder="搜索准父母姓名或案例编号"
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
            <Button type="primary" icon={<MessageOutlined />}>
              群发消息
            </Button>
            <Button icon={<DollarOutlined />}>
              财务报表
            </Button>
          </Space>
        </Card>

        {/* 准父母列表 */}
        <Card title="准父母列表">
          <Table 
            columns={columns} 
            dataSource={filteredParents}
            rowKey="email"
            pagination={{
              pageSize: 10,
              showTotal: (total, range) => 
                `显示 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
            }}
          />
        </Card>

        {/* 详情模态框 */}
        <Modal
          title={`准父母详情 - ${selectedParent?.names}`}
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          width={900}
          footer={[
            <Button key="contact" type="primary" icon={<MessageOutlined />}>
              发送消息
            </Button>,
            <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
              关闭
            </Button>,
          ]}
        >
          {selectedParent && (
            <div className="space-y-6">
              {/* 基本信息 */}
              <div className="flex items-center space-x-4">
                <Avatar size={80} icon={<TeamOutlined />} />
                <div>
                  <h3 className="text-xl font-semibold">{selectedParent.names}</h3>
                  <p className="text-gray-600">{selectedParent.email}</p>
                  <Tag color={getUrgencyColor(selectedParent.urgency)}>
                    {getUrgencyLabel(selectedParent.urgency)}优先级
                  </Tag>
                </div>
              </div>

              {/* 详细信息 */}
              <Descriptions column={2} bordered>
                <Descriptions.Item label="关联案例">{selectedParent.caseNumber}</Descriptions.Item>
                <Descriptions.Item label="代孕母亲">{selectedParent.surrogateName}</Descriptions.Item>
                <Descriptions.Item label="主要联系邮箱">{selectedParent.email}</Descriptions.Item>
                <Descriptions.Item label="所在地区">
                  {selectedParent.location.city}, {selectedParent.location.state}
                </Descriptions.Item>
                <Descriptions.Item label="预期时间线">{selectedParent.timeline}</Descriptions.Item>
                <Descriptions.Item label="紧急程度">
                  <Tag color={getUrgencyColor(selectedParent.urgency)}>
                    {getUrgencyLabel(selectedParent.urgency)}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="开始时间" span={2}>
                  {new Date(selectedParent.startDate).toLocaleDateString()}
                </Descriptions.Item>
              </Descriptions>

              {/* 财务信息 */}
              <Card title="财务信息" size="small">
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Statistic
                      title="预算下限"
                      value={selectedParent.budget.min}
                      prefix={<DollarOutlined />}
                      valueStyle={{ color: '#52c41a' }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="预算上限"
                      value={selectedParent.budget.max}
                      prefix={<DollarOutlined />}
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="预算范围"
                      value={selectedParent.budget.max - selectedParent.budget.min}
                      prefix={<DollarOutlined />}
                      valueStyle={{ color: '#722ed1' }}
                    />
                  </Col>
                </Row>
              </Card>

              {/* 特殊要求 */}
              <Card title="特殊要求和偏好" size="small">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-gray-700">{selectedParent.preferences || '暂无特殊要求'}</p>
                </div>
              </Card>

              {/* 联系方式 */}
              <Card title="联系方式" size="small">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MailOutlined className="text-blue-500" />
                    <span>{selectedParent.email}</span>
                    <Button type="link" size="small">发送邮件</Button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PhoneOutlined className="text-green-500" />
                    <span>+1 (555) 987-6543</span>
                    <Button type="link" size="small">拨打电话</Button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageOutlined className="text-purple-500" />
                    <span>站内消息</span>
                    <Button type="link" size="small">发送消息</Button>
                  </div>
                </div>
              </Card>

              {/* 沟通记录 */}
              <Card title="最近沟通记录" size="small">
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-400 pl-3 py-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">电话沟通</span>
                      <span className="text-sm text-gray-500">2小时前</span>
                    </div>
                    <p className="text-sm text-gray-600">咨询代孕母亲的健康状况更新，表示满意当前进展</p>
                  </div>
                  
                  <div className="border-l-4 border-green-400 pl-3 py-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">邮件往来</span>
                      <span className="text-sm text-gray-500">昨天</span>
                    </div>
                    <p className="text-sm text-gray-600">讨论法律协议的细节问题，已解答相关疑问</p>
                  </div>
                  
                  <div className="border-l-4 border-orange-400 pl-3 py-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">会议安排</span>
                      <span className="text-sm text-gray-500">2天前</span>
                    </div>
                    <p className="text-sm text-gray-600">安排了与代孕母亲的三方会议，确认下一步计划</p>
                  </div>
                </div>
              </Card>

              {/* 服务进度 */}
              <Card title="服务进度跟踪" size="small">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-lg font-bold text-green-600">95%</div>
                    <div className="text-sm text-gray-600">客户满意度</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-lg font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">沟通次数</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded">
                    <div className="text-lg font-bold text-purple-600">3</div>
                    <div className="text-sm text-gray-600">问题解决</div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default AgencyIntendedParentsPage
