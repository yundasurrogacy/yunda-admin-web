'use client'

import React, { useState } from 'react'
import { Card, Upload, Button, Progress, Tag, Table, Space, Modal, message, Row, Col, Statistic } from 'antd'
import {
  CalendarOutlined,
  HeartOutlined,
  FileTextOutlined,
  MessageOutlined,
  UploadOutlined,
  DownloadOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSurrogacyCases } from '@/data/mockData'

const SurrogateCaseFilesPage = () => {
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false)
  const [selectedFileType, setSelectedFileType] = useState<string>('')

  const currentCase = mockSurrogacyCases[0] // 模拟当前案例

  // 模拟文件数据
  const fileCategories = [
    {
      key: 'medical',
      title: '医疗文件',
      icon: <HeartOutlined />,
      color: '#52c41a',
      files: [
        {
          id: '1',
          name: '血检报告_2024-01-15.pdf',
          type: '血检报告',
          uploadedAt: '2024-01-15',
          status: 'approved',
          size: '2.3 MB',
          required: true,
        },
        {
          id: '2',
          name: '超声波检查_2024-01-20.pdf',
          type: '超声波检查',
          uploadedAt: '2024-01-20',
          status: 'pending',
          size: '5.1 MB',
          required: true,
        },
        {
          id: '3',
          name: '体检报告.pdf',
          type: '全面体检',
          uploadedAt: '',
          status: 'missing',
          size: '',
          required: true,
        },
      ]
    },
    {
      key: 'legal',
      title: '法律文件',
      icon: <FileTextOutlined />,
      color: '#1890ff',
      files: [
        {
          id: '4',
          name: '代孕协议.pdf',
          type: '代孕协议',
          uploadedAt: '2024-01-28',
          status: 'approved',
          size: '1.8 MB',
          required: true,
        },
        {
          id: '5',
          name: '知情同意书.pdf',
          type: '知情同意书',
          uploadedAt: '',
          status: 'missing',
          size: '',
          required: true,
        },
      ]
    },
    {
      key: 'identity',
      title: '身份证明',
      icon: <CheckCircleOutlined />,
      color: '#722ed1',
      files: [
        {
          id: '6',
          name: '身份证.pdf',
          type: '身份证',
          uploadedAt: '2024-01-25',
          status: 'approved',
          size: '0.8 MB',
          required: true,
        },
        {
          id: '7',
          name: '户口本.pdf',
          type: '户口本',
          uploadedAt: '2024-01-25',
          status: 'pending',
          size: '1.2 MB',
          required: false,
        },
      ]
    },
    {
      key: 'other',
      title: '其他文件',
      icon: <FileTextOutlined />,
      color: '#faad14',
      files: [
        {
          id: '8',
          name: '保险证明.pdf',
          type: '保险证明',
          uploadedAt: '2024-01-26',
          status: 'approved',
          size: '1.5 MB',
          required: false,
        },
      ]
    },
  ]

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'approved':
        return <Tag color="green" icon={<CheckCircleOutlined />}>已批准</Tag>
      case 'pending':
        return <Tag color="orange" icon={<ClockCircleOutlined />}>待审核</Tag>
      case 'rejected':
        return <Tag color="red" icon={<ExclamationCircleOutlined />}>已拒绝</Tag>
      case 'missing':
        return <Tag color="red" icon={<ExclamationCircleOutlined />}>待上传</Tag>
      default:
        return <Tag>未知状态</Tag>
    }
  }

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`)
      setIsUploadModalVisible(false)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`)
    }
  }

  // 统计数据
  const allFiles = fileCategories.flatMap(cat => cat.files)
  const totalFiles = allFiles.length
  const approvedFiles = allFiles.filter(f => f.status === 'approved').length
  const pendingFiles = allFiles.filter(f => f.status === 'pending').length
  const missingFiles = allFiles.filter(f => f.status === 'missing').length

  const columns = [
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: any) => (
        <div>
          <div className="font-medium">{name || record.type}</div>
          <div className="text-sm text-gray-500">{record.type}</div>
        </div>
      ),
    },
    {
      title: '必需性',
      key: 'required',
      render: (record: any) => (
        record.required ? (
          <Tag color="red">必需</Tag>
        ) : (
          <Tag color="blue">可选</Tag>
        )
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '上传时间',
      dataIndex: 'uploadedAt',
      key: 'uploadedAt',
      render: (date: string) => date || '-',
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      key: 'size',
      render: (size: string) => size || '-',
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space>
          {record.status === 'missing' ? (
            <Button 
              type="primary" 
              size="small" 
              icon={<UploadOutlined />}
              onClick={() => {
                setSelectedFileType(record.type)
                setIsUploadModalVisible(true)
              }}
            >
              上传
            </Button>
          ) : (
            <>
              <Button 
                type="link" 
                size="small" 
                icon={<EyeOutlined />}
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
            </>
          )}
        </Space>
      ),
    },
  ]

  const menuItems = [
    {
      key: 'journey',
      icon: <CalendarOutlined />,
      label: '我的旅程',
      path: '/admin/surrogate/journey',
    },
    {
      key: 'social',
      icon: <FileTextOutlined />,
      label: '生活动态',
      path: '/admin/surrogate/social',
    },
    {
      key: 'health',
      icon: <HeartOutlined />,
      label: '健康记录',
      path: '/admin/surrogate/health',
    },
    {
      key: 'case-files',
      icon: <FileTextOutlined />,
      label: '案例文件',
      path: '/admin/surrogate/case-files',
    },
    {
      key: 'messages',
      icon: <MessageOutlined />,
      label: '消息中心',
      path: '/admin/surrogate/messages',
    },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">案例文件</h1>
          <p className="text-gray-600">查看和管理您的案例相关文件，上传必需的文档</p>
        </div>

        {/* 案例信息 */}
        <Card title="案例信息">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-gray-600">案例编号：</span>
              <span className="font-medium">{currentCase?.caseNumber}</span>
            </div>
            <div>
              <span className="text-gray-600">准父母：</span>
              <span className="font-medium">{currentCase?.intendedParents.names}</span>
            </div>
            <div>
              <span className="text-gray-600">当前状态：</span>
              <Tag color="blue">文件收集中</Tag>
            </div>
          </div>
        </Card>

        {/* 文件统计 */}
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="总文件数"
                value={totalFiles}
                suffix="个"
                valueStyle={{ color: '#1890ff' }}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="已批准"
                value={approvedFiles}
                suffix="个"
                valueStyle={{ color: '#52c41a' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="待审核"
                value={pendingFiles}
                suffix="个"
                valueStyle={{ color: '#faad14' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="待上传"
                value={missingFiles}
                suffix="个"
                valueStyle={{ color: '#ff4d4f' }}
                prefix={<ExclamationCircleOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* 进度条 */}
        <Card title="文件完成进度">
          <div className="mb-4">
            <Progress 
              percent={Math.round((approvedFiles / totalFiles) * 100)} 
              status="active"
              strokeColor={{
                from: '#108ee9',
                to: '#87d068',
              }}
            />
          </div>
          <div className="text-center text-gray-600">
            已完成 {approvedFiles} / {totalFiles} 个文件 
            ({Math.round((approvedFiles / totalFiles) * 100)}%)
          </div>
        </Card>

        {/* 文件分类 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {fileCategories.map(category => (
            <Card 
              key={category.key}
              title={
                <div className="flex items-center space-x-2">
                  <span style={{ color: category.color }}>{category.icon}</span>
                  <span>{category.title}</span>
                </div>
              }
              extra={
                <Button 
                  type="primary" 
                  size="small" 
                  icon={<UploadOutlined />}
                  onClick={() => setIsUploadModalVisible(true)}
                >
                  上传文件
                </Button>
              }
            >
              <div className="space-y-3">
                {category.files.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex-1">
                      <div className="font-medium">{file.name || file.type}</div>
                      <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <span>{file.type}</span>
                        {file.required && <Tag color="red">必需</Tag>}
                        {file.size && <span>{file.size}</span>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusTag(file.status)}
                      {file.status === 'missing' ? (
                        <Button 
                          type="primary" 
                          size="small" 
                          icon={<UploadOutlined />}
                          onClick={() => {
                            setSelectedFileType(file.type)
                            setIsUploadModalVisible(true)
                          }}
                        >
                          上传
                        </Button>
                      ) : (
                        <Button 
                          type="link" 
                          size="small" 
                          icon={<EyeOutlined />}
                        >
                          查看
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* 所有文件列表 */}
        <Card title="所有文件列表">
          <Table 
            columns={columns} 
            dataSource={allFiles}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showTotal: (total, range) => 
                `显示 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
            }}
          />
        </Card>

        {/* 上传文件模态框 */}
        <Modal
          title={`上传文件${selectedFileType ? ` - ${selectedFileType}` : ''}`}
          open={isUploadModalVisible}
          onCancel={() => setIsUploadModalVisible(false)}
          footer={null}
          width={500}
        >
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded">
              <h4 className="font-medium text-blue-800 mb-2">上传要求</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 文件格式：PDF、JPG、PNG</li>
                <li>• 文件大小：不超过 10MB</li>
                <li>• 确保文件清晰可读</li>
                <li>• 个人信息请确保准确无误</li>
              </ul>
            </div>
            
            <Upload.Dragger
              name="file"
              action="/api/upload"
              onChange={handleUpload}
              showUploadList={true}
              accept=".pdf,.jpg,.jpeg,.png"
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
              <p className="ant-upload-hint">
                支持单个文件上传，严禁上传违规文件
              </p>
            </Upload.Dragger>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default SurrogateCaseFilesPage
