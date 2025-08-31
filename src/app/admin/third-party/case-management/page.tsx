'use client'

import React, { useState } from 'react'
import { Card, Table, Tag, Button, Modal, Progress, Descriptions, Form, Input, Select, message, Row, Col } from 'antd'
import {
  ContainerOutlined,
  FileTextOutlined,
  UserOutlined,
  TeamOutlined,
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UploadOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSurrogacyCases } from '@/data/mockData'
import { CaseStatus } from '@/types/application'

const { Option } = Select
const { TextArea } = Input

const AgencyCaseManagementPage = () => {
  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [isCaseModalVisible, setIsCaseModalVisible] = useState(false)
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false)
  const [form] = Form.useForm()

  // 筛选分配给当前代理机构的案例
  const assignedCases = mockSurrogacyCases.filter(
    caseItem => caseItem.assignedAgency?.agencyId === 'agency-001'
  )

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

  const handleViewCase = (caseItem: any) => {
    setSelectedCase(caseItem)
    setIsCaseModalVisible(true)
  }

  const handleUpdateCase = (caseItem: any) => {
    setSelectedCase(caseItem)
    form.setFieldsValue({
      status: caseItem.status,
      notes: '',
    })
    setIsUpdateModalVisible(true)
  }

  const handleSubmitUpdate = async (values: any) => {
    try {
      // 这里应该调用API更新案例状态
      console.log('Updating case with values:', values)
      message.success('案例状态更新成功')
      setIsUpdateModalVisible(false)
      form.resetFields()
    } catch {
      message.error('更新失败，请重试')
    }
  }

  const columns = [
    {
      title: '案例编号',
      dataIndex: 'caseNumber',
      key: 'caseNumber',
      render: (caseNumber: string) => (
        <span className="font-mono text-blue-600">{caseNumber}</span>
      ),
    },
    {
      title: '准父母',
      key: 'intendedParents',
      render: (record: any) => record.intendedParents.names,
    },
    {
      title: '代孕母亲',
      key: 'surrogate',
      render: (record: any) => record.surrogate.name,
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: CaseStatus) => (
        <Tag color={getStatusColor(status)}>
          {getStatusLabel(status)}
        </Tag>
      ),
    },
    {
      title: '进度',
      dataIndex: 'status',
      key: 'progress',
      render: (status: CaseStatus) => (
        <Progress 
          percent={getProgressPercent(status)} 
          size="small"
          showInfo={false}
        />
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
            onClick={() => handleViewCase(record)}
          >
            查看
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => handleUpdateCase(record)}
          >
            更新
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">案例管理</h1>
          <p className="text-gray-600">管理分配给您的案例，跟踪进度并更新状态</p>
        </div>

        {/* 案例统计 */}
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <div className="text-2xl font-bold text-blue-600">{assignedCases.length}</div>
              <div className="text-gray-600">总案例数</div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {assignedCases.filter(c => c.status === CaseStatus.DOCUMENT_COLLECTION).length}
              </div>
              <div className="text-gray-600">文件收集中</div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {assignedCases.filter(c => c.status === CaseStatus.LEGAL_REVIEW).length}
              </div>
              <div className="text-gray-600">法律审核</div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {assignedCases.filter(c => c.status === CaseStatus.COMPLETED).length}
              </div>
              <div className="text-gray-600">已完成</div>
            </Card>
          </Col>
        </Row>

        {/* 案例列表 */}
        <Card title="分配的案例" extra={<Button type="primary" icon={<UploadOutlined />}>批量上传文件</Button>}>
          <Table 
            columns={columns} 
            dataSource={assignedCases}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total, range) => 
                `显示 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
            }}
          />
        </Card>

        {/* 案例详情模态框 */}
        <Modal
          title={`案例详情 - ${selectedCase?.caseNumber}`}
          open={isCaseModalVisible}
          onCancel={() => setIsCaseModalVisible(false)}
          width={800}
          footer={[
            <Button key="update" type="primary" onClick={() => {
              setIsCaseModalVisible(false)
              handleUpdateCase(selectedCase)
            }}>
              更新状态
            </Button>,
            <Button key="close" onClick={() => setIsCaseModalVisible(false)}>
              关闭
            </Button>,
          ]}
        >
          {selectedCase && (
            <div className="space-y-4">
              <Descriptions column={2} bordered>
                <Descriptions.Item label="案例编号">{selectedCase.caseNumber}</Descriptions.Item>
                <Descriptions.Item label="创建时间">
                  {new Date(selectedCase.startDate).toLocaleDateString()}
                </Descriptions.Item>
                <Descriptions.Item label="准父母">{selectedCase.intendedParents.names}</Descriptions.Item>
                <Descriptions.Item label="代孕母亲">{selectedCase.surrogate.name}</Descriptions.Item>
                <Descriptions.Item label="当前状态">
                  <Tag color={getStatusColor(selectedCase.status)}>
                    {getStatusLabel(selectedCase.status)}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="进度">
                  {getProgressPercent(selectedCase.status)}%
                </Descriptions.Item>
              </Descriptions>

              <div>
                <h4 className="font-medium mb-2">当前阶段</h4>
                <div className="p-3 bg-blue-50 rounded">
                  <div className="flex items-center space-x-2">
                    <ClockCircleOutlined className="text-blue-500" />
                    <span>{selectedCase.currentStage}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">进度条</h4>
                <Progress 
                  percent={getProgressPercent(selectedCase.status)} 
                  status="active"
                  strokeColor={{
                    from: '#108ee9',
                    to: '#87d068',
                  }}
                />
              </div>

              <div>
                <h4 className="font-medium mb-2">待处理任务</h4>
                <div className="space-y-2">
                  <div className="flex items-center p-2 border rounded">
                    <CheckCircleOutlined className="text-green-500 mr-2" />
                    <span>收集身份证明文件</span>
                  </div>
                  <div className="flex items-center p-2 border rounded">
                    <ClockCircleOutlined className="text-orange-500 mr-2" />
                    <span>安排法律顾问会议</span>
                  </div>
                  <div className="flex items-center p-2 border rounded">
                    <ClockCircleOutlined className="text-orange-500 mr-2" />
                    <span>协调医疗检查时间</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* 更新状态模态框 */}
        <Modal
          title={`更新案例状态 - ${selectedCase?.caseNumber}`}
          open={isUpdateModalVisible}
          onCancel={() => setIsUpdateModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmitUpdate}
          >
            <Form.Item
              label="新状态"
              name="status"
              rules={[{ required: true, message: '请选择新状态' }]}
            >
              <Select placeholder="选择新状态">
                <Option value={CaseStatus.DOCUMENT_COLLECTION}>文件收集</Option>
                <Option value={CaseStatus.LEGAL_REVIEW}>法律审核</Option>
                <Option value={CaseStatus.MEDICAL_PREPARATION}>医疗准备</Option>
                <Option value={CaseStatus.EMBRYO_TRANSFER}>胚胎移植</Option>
                <Option value={CaseStatus.PREGNANCY_MONITORING}>妊娠监测</Option>
                <Option value={CaseStatus.DELIVERY}>分娩</Option>
                <Option value={CaseStatus.COMPLETED}>已完成</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="更新说明"
              name="notes"
              rules={[{ required: true, message: '请输入更新说明' }]}
            >
              <TextArea 
                rows={4} 
                placeholder="请描述状态更新的原因和相关信息..."
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsUpdateModalVisible(false)}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  确认更新
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>

        {/* 快速操作 */}
        <Card title="快速操作">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <UploadOutlined className="text-2xl text-blue-500" />
                <div>
                  <div className="font-medium">上传文件</div>
                  <div className="text-sm text-gray-600">为案例上传必需文件</div>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <MessageOutlined className="text-2xl text-green-500" />
                <div>
                  <div className="font-medium">联系客户</div>
                  <div className="text-sm text-gray-600">与准父母或代孕母亲沟通</div>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center space-x-3">
                <EditOutlined className="text-2xl text-purple-500" />
                <div>
                  <div className="font-medium">批量更新</div>
                  <div className="text-sm text-gray-600">批量更新多个案例状态</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default AgencyCaseManagementPage
