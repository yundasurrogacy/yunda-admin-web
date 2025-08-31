'use client'

import React from 'react'
import { Card, Row, Col, Table, Tag, Button, Statistic, Progress, Badge } from 'antd'
import {
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  AlertOutlined,
  PhoneOutlined,
  MailOutlined,
  ContainerOutlined,
  SolutionOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSurrogacyCases } from '@/data/mockData'
import { CaseStatus } from '@/types/application'

const ThirdPartyDashboard = () => {
  // 筛选分配给当前代理机构的案例
  const assignedCases = mockSurrogacyCases.filter(c => c.assignedAgency?.agencyId === 'agency-001')
  
  // 将案例数据转换为表格数据
  const clientCases = assignedCases.map(caseItem => ({
    key: caseItem.id,
    caseId: caseItem.caseNumber,
    intendedParents: caseItem.intendedParents.names,
    surrogate: caseItem.surrogate.name,
    status: getStatusLabel(caseItem.status),
    stage: getStageLabel(caseItem.status),
    progress: getProgressPercent(caseItem.status),
    agent: caseItem.assignedAgency?.agentName || '未分配',
  }))

  function getStatusLabel(status: CaseStatus): string {
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

  function getStageLabel(status: CaseStatus): string {
    const stages = {
      [CaseStatus.CREATED]: '初始阶段',
      [CaseStatus.ASSIGNED_TO_AGENCY]: '分配阶段',
      [CaseStatus.DOCUMENT_COLLECTION]: '文件收集阶段',
      [CaseStatus.LEGAL_REVIEW]: '法律审核阶段',
      [CaseStatus.MEDICAL_PREPARATION]: '医疗准备阶段',
      [CaseStatus.EMBRYO_TRANSFER]: '胚胎移植阶段',
      [CaseStatus.PREGNANCY_MONITORING]: '妊娠监测阶段',
      [CaseStatus.DELIVERY]: '分娩阶段',
      [CaseStatus.COMPLETED]: '完成阶段',
    }
    return stages[status] || '未知阶段'
  }

  function getProgressPercent(status: CaseStatus): number {
    const progressMap = {
      [CaseStatus.CREATED]: 10,
      [CaseStatus.ASSIGNED_TO_AGENCY]: 20,
      [CaseStatus.DOCUMENT_COLLECTION]: 35,
      [CaseStatus.LEGAL_REVIEW]: 45,
      [CaseStatus.MEDICAL_PREPARATION]: 60,
      [CaseStatus.EMBRYO_TRANSFER]: 75,
      [CaseStatus.PREGNANCY_MONITORING]: 85,
      [CaseStatus.DELIVERY]: 95,
      [CaseStatus.COMPLETED]: 100,
    }
    return progressMap[status] || 0
  }

  const caseColumns = [
    {
      title: '案例编号',
      dataIndex: 'caseId',
      key: 'caseId',
      render: (caseId: string) => (
        <span className="font-mono text-blue-600">{caseId}</span>
      ),
    },
    {
      title: '准父母',
      dataIndex: 'intendedParents',
      key: 'intendedParents',
    },
    {
      title: '代孕母亲',
      dataIndex: 'surrogate',
      key: 'surrogate',
    },
    {
      title: '当前阶段',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage: string) => {
        const colorMap: Record<string, string> = {
          '匹配阶段': 'orange',
          '法律协议阶段': 'blue',
          '妊娠监测': 'green',
        }
        return <Tag color={colorMap[stage]}>{stage}</Tag>
      },
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
    {
      title: '负责人',
      dataIndex: 'agent',
      key: 'agent',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <div className="space-x-2">
          <Button type="link" size="small">查看</Button>
          <Button type="link" size="small">跟进</Button>
        </div>
      ),
    },
  ]

  const pendingTasks = [
    {
      id: 1,
      type: '文件审核',
      case: 'YD-2024-001',
      description: 'Smith夫妇的医疗保险文件需要审核',
      priority: 'high',
      deadline: '今天',
    },
    {
      id: 2,
      type: '客户沟通',
      case: 'YD-2024-002',
      description: 'Johnson夫妇询问代孕母亲匹配进展',
      priority: 'medium',
      deadline: '明天',
    },
    {
      id: 3,
      type: '协调安排',
      case: 'YD-2024-003',
      description: '安排Brown夫妇与代孕母亲的视频会议',
      priority: 'medium',
      deadline: '本周',
    },
  ]

  const menuItems = [
    {
      key: 'cases',
      icon: <ContainerOutlined />,
      label: '案例管理',
      path: '/admin/third-party/cases',
    },
    {
      key: 'clients',
      icon: <UserOutlined />,
      label: '客户管理',
      path: '/admin/third-party/clients',
    },
    {
      key: 'documents',
      icon: <FileTextOutlined />,
      label: '文件处理',
      path: '/admin/third-party/documents',
    },
    {
      key: 'coordination',
      icon: <TeamOutlined />,
      label: '协调服务',
      path: '/admin/third-party/coordination',
    },
    {
      key: 'communication',
      icon: <MailOutlined />,
      label: '沟通记录',
      path: '/admin/third-party/communication',
    },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            代理机构仪表板
          </h1>
          <p className="text-gray-600">
            客户对接与协调服务 - 案例管理、文件处理和客户沟通
          </p>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="分配的案例"
                value={assignedCases.length}
                suffix="个"
                valueStyle={{ color: '#1890ff' }}
                prefix={<ContainerOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="文件收集阶段"
                value={assignedCases.filter(c => c.status === CaseStatus.DOCUMENT_COLLECTION).length}
                suffix="个"
                valueStyle={{ color: '#faad14' }}
                prefix={<AlertOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="妊娠监测中"
                value={assignedCases.filter(c => c.status === CaseStatus.PREGNANCY_MONITORING).length}
                suffix="个"
                valueStyle={{ color: '#3f8600' }}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="案例完成率"
                value={assignedCases.length > 0 ? Math.round((assignedCases.filter(c => c.status === CaseStatus.COMPLETED).length / assignedCases.length) * 100) : 0}
                suffix="%"
                valueStyle={{ color: '#722ed1' }}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* 今日任务 */}
          <Col xs={24} lg={8}>
            <Card title="今日任务" className="h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                  <div className="flex items-center space-x-2">
                    <AlertOutlined className="text-red-500" />
                    <span>紧急任务</span>
                  </div>
                  <span className="font-semibold text-red-600">2项</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded">
                  <div className="flex items-center space-x-2">
                    <ClockCircleOutlined className="text-orange-500" />
                    <span>待处理</span>
                  </div>
                  <span className="font-semibold text-orange-600">5项</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <div className="flex items-center space-x-2">
                    <PhoneOutlined className="text-blue-500" />
                    <span>客户沟通</span>
                  </div>
                  <span className="font-semibold text-blue-600">3项</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <div className="flex items-center space-x-2">
                    <CheckCircleOutlined className="text-green-500" />
                    <span>已完成</span>
                  </div>
                  <span className="font-semibold text-green-600">7项</span>
                </div>
              </div>
            </Card>
          </Col>

          {/* 快速操作 */}
          <Col xs={24} lg={8}>
            <Card title="快速操作" className="h-full">
              <div className="space-y-3">
                <Button type="primary" block icon={<ContainerOutlined />}>
                  创建新案例
                </Button>
                <Button block icon={<UserOutlined />}>
                  添加新客户
                </Button>
                <Button block icon={<FileTextOutlined />}>
                  处理文件审核
                </Button>
                <Button block icon={<PhoneOutlined />}>
                  安排客户沟通
                </Button>
                <Button block icon={<TeamOutlined />}>
                  协调各方会议
                </Button>
              </div>
            </Card>
          </Col>

          {/* 服务统计 */}
          <Col xs={24} lg={8}>
            <Card title="服务类型统计" className="h-full">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>代孕母亲匹配</span>
                  <Tag color="blue">8次</Tag>
                </div>
                <div className="flex justify-between items-center">
                  <span>文件审核处理</span>
                  <Tag color="green">15次</Tag>
                </div>
                <div className="flex justify-between items-center">
                  <span>客户咨询服务</span>
                  <Tag color="orange">12次</Tag>
                </div>
                <div className="flex justify-between items-center">
                  <span>协调会议安排</span>
                  <Tag color="purple">6次</Tag>
                </div>
                <div className="flex justify-between items-center">
                  <span>进度跟进</span>
                  <Tag color="cyan">20次</Tag>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center font-semibold">
                    <span>总计</span>
                    <span>61次</span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* 待处理任务 */}
          <Col xs={24} lg={12}>
            <Card title="待处理任务" extra={<Button type="link">查看全部</Button>}>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="border rounded p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Tag color={task.priority === 'high' ? 'red' : 'orange'}>
                            {task.type}
                          </Tag>
                          <span className="font-mono text-sm text-gray-500">{task.case}</span>
                        </div>
                        <p className="text-gray-700">{task.description}</p>
                      </div>
                      <Button type="primary" size="small">
                        处理
                      </Button>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <Badge 
                        color={task.priority === 'high' ? 'red' : 'orange'} 
                        text={task.priority === 'high' ? '高优先级' : '中优先级'} 
                      />
                      <span>截止：{task.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* 最近沟通记录 */}
          <Col xs={24} lg={12}>
            <Card title="最近沟通记录" extra={<Button type="link">查看全部</Button>}>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-400 pl-3 py-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Smith夫妇</span>
                    <span className="text-sm text-gray-500">2小时前</span>
                  </div>
                  <p className="text-gray-600 text-sm">咨询代孕母亲的健康状况更新</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <PhoneOutlined className="text-blue-500" />
                    <span className="text-xs text-gray-500">电话沟通</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-green-400 pl-3 py-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Johnson夫妇</span>
                    <span className="text-sm text-gray-500">昨天</span>
                  </div>
                  <p className="text-gray-600 text-sm">讨论法律协议条款修改建议</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <MailOutlined className="text-green-500" />
                    <span className="text-xs text-gray-500">邮件沟通</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-orange-400 pl-3 py-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Brown夫妇</span>
                    <span className="text-sm text-gray-500">2天前</span>
                  </div>
                  <p className="text-gray-600 text-sm">安排与代孕母亲的见面会议</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <SolutionOutlined className="text-orange-500" />
                    <span className="text-xs text-gray-500">会议安排</span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* 案例管理表格 */}
        <Card title="活跃案例" extra={<Button type="primary">创建新案例</Button>}>
          <Table 
            columns={caseColumns} 
            dataSource={clientCases} 
            pagination={{ pageSize: 10 }}
            size="middle"
          />
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default ThirdPartyDashboard
