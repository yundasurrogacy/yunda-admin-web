'use client'

import React, { useState } from 'react'
import { Card, Progress, Tag, Descriptions, Timeline, Button, Modal, Table, Row, Col, Avatar } from 'antd'
import {
  CalendarOutlined,
  HeartOutlined,
  FileImageOutlined,
  FileTextOutlined,
  UserOutlined,
  EyeOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSurrogacyCases } from '@/data/mockData'
import { CaseStatus } from '@/types/application'

const SurrogateMyCasePage = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [isFileModalVisible, setIsFileModalVisible] = useState(false)

  const currentCase = mockSurrogacyCases[0] // 模拟当前案例

  const getProgressPercent = (status: CaseStatus): number => {
    const progressMap = {
      [CaseStatus.CREATED]: 12.5,
      [CaseStatus.ASSIGNED_TO_AGENCY]: 25,
      [CaseStatus.DOCUMENT_COLLECTION]: 37.5,
      [CaseStatus.LEGAL_REVIEW]: 50,
      [CaseStatus.MEDICAL_PREPARATION]: 62.5,
      [CaseStatus.EMBRYO_TRANSFER]: 75,
      [CaseStatus.PREGNANCY_MONITORING]: 87.5,
      [CaseStatus.DELIVERY]: 95,
      [CaseStatus.COMPLETED]: 100,
    }
    return progressMap[status] || 0
  }

  const getStatusColor = (status: CaseStatus): string => {
    const colorMap = {
      [CaseStatus.CREATED]: 'blue',
      [CaseStatus.ASSIGNED_TO_AGENCY]: 'cyan',
      [CaseStatus.DOCUMENT_COLLECTION]: 'orange',
      [CaseStatus.LEGAL_REVIEW]: 'purple',
      [CaseStatus.MEDICAL_PREPARATION]: 'geekblue',
      [CaseStatus.EMBRYO_TRANSFER]: 'magenta',
      [CaseStatus.PREGNANCY_MONITORING]: 'volcano',
      [CaseStatus.DELIVERY]: 'red',
      [CaseStatus.COMPLETED]: 'green',
    }
    return colorMap[status] || 'default'
  }

  const getStatusLabel = (status: CaseStatus): string => {
    const labelMap = {
      [CaseStatus.CREATED]: '案例创建',
      [CaseStatus.ASSIGNED_TO_AGENCY]: '分配机构',
      [CaseStatus.DOCUMENT_COLLECTION]: '文件收集',
      [CaseStatus.LEGAL_REVIEW]: '法律审核',
      [CaseStatus.MEDICAL_PREPARATION]: '医疗准备',
      [CaseStatus.EMBRYO_TRANSFER]: '胚胎移植',
      [CaseStatus.PREGNANCY_MONITORING]: '妊娠监测',
      [CaseStatus.DELIVERY]: '分娩',
      [CaseStatus.COMPLETED]: '已完成',
    }
    return labelMap[status] || status
  }

  const timelineEvents = [
    {
      id: '1',
      date: '2024-01-28',
      title: '案例创建',
      description: '与David & Emma Smith夫妇成功匹配',
      status: 'completed',
    },
    {
      id: '2', 
      date: '2024-01-29',
      title: '分配代理机构',
      description: '案例已分配给代理机构处理',
      status: 'completed',
    },
    {
      id: '3',
      date: '2024-02-01',
      title: '文件收集中',
      description: '正在收集和审核必要文件',
      status: 'current',
    },
    {
      id: '4',
      date: '预计 2024-02-15',
      title: '法律审核',
      description: '法律协议审核与签署',
      status: 'pending',
    },
    {
      id: '5',
      date: '预计 2024-03-01',
      title: '医疗准备',
      description: '全面医疗检查与准备',
      status: 'pending',
    },
  ]

  // 案例相关文件
  const caseFiles = [
    {
      id: '1',
      name: '代孕协议.pdf',
      type: '法律文件',
      uploadedBy: '代理机构',
      uploadedAt: '2024-01-28',
      status: 'completed',
      size: '1.8 MB',
    },
    {
      id: '2',
      name: '医疗检查报告.pdf',
      type: '医疗文件',
      uploadedBy: '医疗机构',
      uploadedAt: '2024-01-30',
      status: 'completed',
      size: '2.3 MB',
    },
    {
      id: '3',
      name: '保险证明.pdf',
      type: '保险文件',
      uploadedBy: '准父母',
      uploadedAt: '2024-02-01',
      status: 'completed',
      size: '1.2 MB',
    },
    {
      id: '4',
      name: '胚胎移植计划.pdf',
      type: '医疗文件',
      uploadedBy: '医疗机构',
      uploadedAt: '',
      status: 'pending',
      size: '',
    },
  ]

  const fileColumns = [
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: any) => (
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-sm text-gray-500">{record.type}</div>
        </div>
      ),
    },
    {
      title: '上传者',
      dataIndex: 'uploadedBy',
      key: 'uploadedBy',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        status === 'completed' ? (
          <Tag color="green" icon={<CheckCircleOutlined />}>已完成</Tag>
        ) : (
          <Tag color="orange" icon={<ClockCircleOutlined />}>待上传</Tag>
        )
      ),
    },
    {
      title: '上传时间',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      render: (date: string) => date || '-',
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        record.status === 'completed' ? (
          <div className="space-x-2">
            <Button 
              type="link" 
              size="small" 
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedFile(record)
                setIsFileModalVisible(true)
              }}
            >
              查看
            </Button>
            <Button 
              type="link" 
              size="small" 
              icon={<DownloadOutlined />}
            >
              下载
            </Button>
          </div>
        ) : (
          <span className="text-gray-400">待上传</span>
        )
      ),
    },
  ]

  const menuItems = [
    {
      key: 'my-case',
      icon: <CalendarOutlined />,
      label: '我的案例',
      path: '/admin/surrogate/my-case',
    },
    {
      key: 'my-social',
      icon: <FileImageOutlined />,
      label: '我的动态',
      path: '/admin/surrogate/my-social',
    },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">我的案例</h1>
          <p className="text-gray-600">查看案例详情、进度和相关文件</p>
        </div>

        {/* 案例基本信息 */}
        <Card title="案例信息">
          <Descriptions column={2} bordered>
            <Descriptions.Item label="案例编号">{currentCase?.caseNumber}</Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {currentCase?.createdAt ? new Date(currentCase.createdAt).toLocaleDateString() : ''}
            </Descriptions.Item>
            <Descriptions.Item label="准父母">{currentCase?.intendedParents.names}</Descriptions.Item>
            <Descriptions.Item label="当前状态">
              <Tag color={getStatusColor(currentCase?.status || CaseStatus.DOCUMENT_COLLECTION)}>
                {getStatusLabel(currentCase?.status || CaseStatus.DOCUMENT_COLLECTION)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="代理机构">{currentCase?.assignedAgency?.agencyName}</Descriptions.Item>
            <Descriptions.Item label="负责人">{currentCase?.assignedAgency?.agentName}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 进度展示 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="案例进度">
              <div className="mb-4">
                <Progress 
                  percent={getProgressPercent(currentCase?.status || CaseStatus.DOCUMENT_COLLECTION)} 
                  status="active"
                  strokeColor={{
                    from: '#108ee9',
                    to: '#87d068',
                  }}
                />
              </div>
              <div className="text-center text-gray-600">
                当前阶段: {getStatusLabel(currentCase?.status || CaseStatus.DOCUMENT_COLLECTION)}
                <br />
                ({getProgressPercent(currentCase?.status || CaseStatus.DOCUMENT_COLLECTION)}% 完成)
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="准父母信息">
              <div className="flex items-center space-x-4">
                <Avatar size={64} icon={<UserOutlined />} />
                <div>
                  <div className="font-semibold text-lg">{currentCase?.intendedParents.names}</div>
                  <div className="text-gray-600">
                    {currentCase?.intendedParents.location.city}, {currentCase?.intendedParents.location.state}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    预算: ${currentCase?.intendedParents.budget.min?.toLocaleString()} - ${currentCase?.intendedParents.budget.max?.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button type="primary" icon={<UserOutlined />}>
                  联系准父母
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        {/* 时间线 */}
        <Card title="案例进度时间线">
          <Timeline>
            {timelineEvents.map(event => (
              <Timeline.Item
                key={event.id}
                dot={
                  event.status === 'completed' ? (
                    <CheckCircleOutlined className="text-green-500" />
                  ) : event.status === 'current' ? (
                    <ClockCircleOutlined className="text-blue-500" />
                  ) : (
                    <div className="w-3 h-3 bg-gray-300 rounded-full" />
                  )
                }
                color={
                  event.status === 'completed' ? 'green' :
                  event.status === 'current' ? 'blue' : 'gray'
                }
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{event.title}</span>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>

        {/* 案例相关文件 */}
        <Card title="案例相关文件" extra={<InfoCircleOutlined className="text-blue-500" />}>
          <div className="mb-4 p-3 bg-blue-50 rounded">
            <div className="text-sm text-blue-800">
              <InfoCircleOutlined className="mr-2" />
              这些文件由管理员和代理机构负责上传和管理，您可以查看和下载。
            </div>
          </div>
          <Table 
            columns={fileColumns} 
            dataSource={caseFiles}
            rowKey="id"
            pagination={false}
            size="middle"
          />
        </Card>

        {/* 文件查看模态框 */}
        <Modal
          title={`查看文件 - ${selectedFile?.name}`}
          open={isFileModalVisible}
          onCancel={() => setIsFileModalVisible(false)}
          width={800}
          footer={[
            <Button key="download" type="primary" icon={<DownloadOutlined />}>
              下载文件
            </Button>,
            <Button key="close" onClick={() => setIsFileModalVisible(false)}>
              关闭
            </Button>,
          ]}
        >
          {selectedFile && (
            <div className="space-y-4">
              <Descriptions column={2} bordered size="small">
                <Descriptions.Item label="文件名">{selectedFile.name}</Descriptions.Item>
                <Descriptions.Item label="文件类型">{selectedFile.type}</Descriptions.Item>
                <Descriptions.Item label="上传者">{selectedFile.uploadedBy}</Descriptions.Item>
                <Descriptions.Item label="文件大小">{selectedFile.size}</Descriptions.Item>
                <Descriptions.Item label="上传时间" span={2}>{selectedFile.uploadedAt}</Descriptions.Item>
              </Descriptions>
              
              <div className="border rounded p-4 bg-gray-50 text-center">
                <FileTextOutlined className="text-4xl text-gray-400 mb-2" />
                <p className="text-gray-600">文件预览功能</p>
                <p className="text-sm text-gray-500">点击下载按钮获取完整文件</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default SurrogateMyCasePage
