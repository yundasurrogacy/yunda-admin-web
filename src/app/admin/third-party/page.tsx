'use client'

import React from 'react'
import { Card, Row, Col, Table, Tag, Button, Statistic, Progress } from 'antd'
import {
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
  CheckCircleOutlined,
  AlertOutlined,
  ContainerOutlined,
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

        {/* 重点工作概览 */}
        <Card title="工作概览">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <div className="text-center p-4 bg-blue-50 rounded">
                <div className="text-2xl font-bold text-blue-600">{assignedCases.length}</div>
                <div className="text-blue-800">负责案例</div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="text-center p-4 bg-orange-50 rounded">
                <div className="text-2xl font-bold text-orange-600">3</div>
                <div className="text-orange-800">待处理任务</div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div className="text-center p-4 bg-green-50 rounded">
                <div className="text-2xl font-bold text-green-600">5</div>
                <div className="text-green-800">本周完成</div>
              </div>
            </Col>
          </Row>
        </Card>



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
