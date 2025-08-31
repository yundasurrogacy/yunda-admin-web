'use client'

import React, { useState } from 'react'
import { Card, Table, Tag, Button, Modal, Avatar, Input, Space, Row, Col, Descriptions } from 'antd'
import {
  ContainerOutlined,
  FileTextOutlined,
  UserOutlined,
  TeamOutlined,
  EyeOutlined,
  SearchOutlined,
  MessageOutlined,
  HeartOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSurrogacyCases } from '@/data/mockData'

const { Search } = Input

const AgencySurrogatesPage = () => {
  const [selectedSurrogate, setSelectedSurrogate] = useState<any>(null)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [searchText, setSearchText] = useState('')

  // 获取分配给当前代理机构的案例相关的代孕母亲
  const assignedCases = mockSurrogacyCases.filter(
    caseItem => caseItem.assignedAgency?.agencyId === 'agency-001'
  )

  const surrogates = assignedCases.map(caseItem => ({
    ...caseItem.surrogate,
    caseId: caseItem.id,
    caseNumber: caseItem.caseNumber,
    caseStatus: caseItem.status,
    intendedParents: caseItem.intendedParents.names,
    startDate: caseItem.startDate,
  }))

  const filteredSurrogates = surrogates.filter(surrogate =>
    surrogate.name.toLowerCase().includes(searchText.toLowerCase()) ||
    surrogate.caseNumber.toLowerCase().includes(searchText.toLowerCase())
  )

  const handleViewDetails = (surrogate: any) => {
    setSelectedSurrogate(surrogate)
    setIsDetailModalVisible(true)
  }

  const getStatusColor = (status: string): string => {
    const colorMap = {
      'active': 'green',
      'matched': 'blue',
      'inactive': 'orange',
    }
    return colorMap[status as keyof typeof colorMap] || 'default'
  }

  const getStatusLabel = (status: string): string => {
    const labelMap = {
      'active': '活跃',
      'matched': '已匹配',
      'inactive': '非活跃',
    }
    return labelMap[status as keyof typeof labelMap] || status
  }

  const columns = [
    {
      title: '代孕母亲',
      key: 'surrogate',
      render: (record: any) => (
        <div className="flex items-center space-x-3">
          <Avatar size={40} icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-sm text-gray-500">{record.age}岁</div>
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
      title: '准父母',
      dataIndex: 'intendedParents',
      key: 'intendedParents',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusLabel(status)}
        </Tag>
      ),
    },
    {
      title: '经验',
      dataIndex: 'experience',
      key: 'experience',
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">代孕母亲</h1>
          <p className="text-gray-600">管理您负责案例的代孕母亲信息</p>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <div className="text-2xl font-bold text-blue-600">{surrogates.length}</div>
              <div className="text-gray-600">总人数</div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {surrogates.filter(s => s.status === 'active').length}
              </div>
              <div className="text-gray-600">活跃状态</div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {surrogates.filter(s => s.status === 'matched').length}
              </div>
              <div className="text-gray-600">已匹配</div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {surrogates.filter(s => s.experience.includes('成功')).length}
              </div>
              <div className="text-gray-600">有经验</div>
            </Card>
          </Col>
        </Row>

        {/* 搜索和过滤 */}
        <Card>
          <Space size="middle">
            <Search
              placeholder="搜索代孕母亲姓名或案例编号"
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
            <Button type="primary" icon={<MessageOutlined />}>
              群发消息
            </Button>
          </Space>
        </Card>

        {/* 代孕母亲列表 */}
        <Card title="代孕母亲列表">
          <Table 
            columns={columns} 
            dataSource={filteredSurrogates}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total, range) => 
                `显示 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
            }}
          />
        </Card>

        {/* 详情模态框 */}
        <Modal
          title={`代孕母亲详情 - ${selectedSurrogate?.name}`}
          open={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          width={800}
          footer={[
            <Button key="contact" type="primary" icon={<MessageOutlined />}>
              发送消息
            </Button>,
            <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
              关闭
            </Button>,
          ]}
        >
          {selectedSurrogate && (
            <div className="space-y-6">
              {/* 基本信息 */}
              <div className="flex items-center space-x-4">
                <Avatar size={80} icon={<UserOutlined />} />
                <div>
                  <h3 className="text-xl font-semibold">{selectedSurrogate.name}</h3>
                  <p className="text-gray-600">{selectedSurrogate.age}岁</p>
                  <Tag color={getStatusColor(selectedSurrogate.status)}>
                    {getStatusLabel(selectedSurrogate.status)}
                  </Tag>
                </div>
              </div>

              {/* 详细信息 */}
              <Descriptions column={2} bordered>
                <Descriptions.Item label="关联案例">{selectedSurrogate.caseNumber}</Descriptions.Item>
                <Descriptions.Item label="准父母">{selectedSurrogate.intendedParents}</Descriptions.Item>
                <Descriptions.Item label="电子邮箱">{selectedSurrogate.email}</Descriptions.Item>
                <Descriptions.Item label="所在地区">
                  {selectedSurrogate.location.city}, {selectedSurrogate.location.state}
                </Descriptions.Item>
                <Descriptions.Item label="代孕经验">{selectedSurrogate.experience}</Descriptions.Item>
                <Descriptions.Item label="期望补偿">
                  ${selectedSurrogate.expectedCompensation?.toLocaleString()}
                </Descriptions.Item>
                <Descriptions.Item label="开始时间" span={2}>
                  {new Date(selectedSurrogate.startDate).toLocaleDateString()}
                </Descriptions.Item>
              </Descriptions>

              {/* 健康信息 */}
              <Card title="健康状况" size="small">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <HeartOutlined className="text-red-500" />
                      <span className="font-medium">整体健康状况</span>
                    </div>
                    <div className="mt-1 text-green-600">优秀</div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <CalendarOutlined className="text-blue-500" />
                      <span className="font-medium">上次检查</span>
                    </div>
                    <div className="mt-1 text-gray-600">3天前</div>
                  </div>
                </div>
              </Card>

              {/* 联系方式 */}
              <Card title="联系方式" size="small">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MailOutlined className="text-blue-500" />
                    <span>{selectedSurrogate.email}</span>
                    <Button type="link" size="small">发送邮件</Button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PhoneOutlined className="text-green-500" />
                    <span>+1 (555) 123-4567</span>
                    <Button type="link" size="small">拨打电话</Button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageOutlined className="text-purple-500" />
                    <span>站内消息</span>
                    <Button type="link" size="small">发送消息</Button>
                  </div>
                </div>
              </Card>

              {/* 最近活动 */}
              <Card title="最近活动" size="small">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>• 上传了健康检查报告</span>
                    <span className="text-gray-500">2小时前</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>• 发布了生活动态</span>
                    <span className="text-gray-500">1天前</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>• 回复了准父母的消息</span>
                    <span className="text-gray-500">2天前</span>
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

export default AgencySurrogatesPage
