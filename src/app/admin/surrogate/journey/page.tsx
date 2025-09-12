'use client'

import React from 'react'
import { Card, Steps, Timeline, Progress, Tag, Button, Row, Col, Descriptions } from 'antd'
import {
  CalendarOutlined,
  HeartOutlined,
  FileTextOutlined,
  MessageOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSurrogacyCases } from '@/data/mockData'
import { CaseStatus } from '@/types/application'

const SurrogateJourneyPage = () => {
  const currentCase = mockSurrogacyCases[0] // 模拟当前案例

  const getStepStatus = (targetStage: CaseStatus, currentStage: CaseStatus) => {
    const stageOrder = [
      CaseStatus.CREATED,
      CaseStatus.ASSIGNED_TO_AGENCY,
      CaseStatus.DOCUMENT_COLLECTION,
      CaseStatus.LEGAL_REVIEW,
      CaseStatus.MEDICAL_PREPARATION,
      CaseStatus.EMBRYO_TRANSFER,
      CaseStatus.PREGNANCY_MONITORING,
      CaseStatus.DELIVERY,
      CaseStatus.COMPLETED,
    ]
    
    const currentIndex = stageOrder.indexOf(currentStage)
    const targetIndex = stageOrder.indexOf(targetStage)
    
    if (targetIndex < currentIndex) return 'finish'
    if (targetIndex === currentIndex) return 'process'
    return 'wait'
  }

  const journeySteps = [
    {
      title: '案例匹配',
      description: '与准父母成功匹配',
      icon: <HeartOutlined />,
      stage: CaseStatus.CREATED,
    },
    {
      title: '文件准备',
      description: '完成所有必要文件',
      icon: <FileTextOutlined />,
      stage: CaseStatus.DOCUMENT_COLLECTION,
    },
    {
      title: '法律审核',
      description: '法律协议签署',
      icon: <CheckCircleOutlined />,
      stage: CaseStatus.LEGAL_REVIEW,
    },
    {
      title: '医疗准备',
      description: '医疗检查与准备',
      icon: <HeartOutlined />,
      stage: CaseStatus.MEDICAL_PREPARATION,
    },
    {
      title: '胚胎移植',
      description: '胚胎移植手术',
      icon: <HeartOutlined />,
      stage: CaseStatus.EMBRYO_TRANSFER,
    },
    {
      title: '妊娠监测',
      description: '定期产检与监测',
      icon: <CalendarOutlined />,
      stage: CaseStatus.PREGNANCY_MONITORING,
    },
    {
      title: '分娩',
      description: '安全分娩',
      icon: <HeartOutlined />,
      stage: CaseStatus.DELIVERY,
    },
    {
      title: '完成',
      description: '代孕旅程完成',
      icon: <CheckCircleOutlined />,
      stage: CaseStatus.COMPLETED,
    },
  ]

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

  const timelineEvents = [
    {
      id: '1',
      time: '2024-01-28',
      title: '成功匹配',
      description: '与David & Emma Smith夫妇成功匹配',
      status: 'completed',
    },
    {
      id: '2', 
      time: '2024-01-29',
      title: '案例分配',
      description: '案例已分配给代理机构处理',
      status: 'completed',
    },
    {
      id: '3',
      time: '2024-02-01',
      title: '文件收集中',
      description: '正在收集和审核必要文件',
      status: 'current',
    },
    {
      id: '4',
      time: '预计 2024-02-15',
      title: '法律审核',
      description: '法律协议审核与签署',
      status: 'pending',
    },
    {
      id: '5',
      time: '预计 2024-03-01',
      title: '医疗准备',
      description: '全面医疗检查与准备',
      status: 'pending',
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">我的代孕旅程</h1>
          <p className="text-gray-600">跟踪您的代孕旅程进度和重要里程碑</p>
        </div>

        {/* 案例基本信息 */}
        <Card title="案例信息">
          <Descriptions column={3} bordered>
            <Descriptions.Item label="案例编号">{currentCase?.caseNumber}</Descriptions.Item>
            <Descriptions.Item label="准父母">{currentCase?.intendedParents.names}</Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {currentCase?.createdAt ? new Date(currentCase.createdAt).toLocaleDateString() : ''}
            </Descriptions.Item>
            <Descriptions.Item label="当前状态">
              <Tag color="blue">文件收集中</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="代理机构">{currentCase?.assignedAgency?.agencyName}</Descriptions.Item>
            <Descriptions.Item label="负责人">{currentCase?.assignedAgency?.agentName}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* 总体进度 */}
        <Card title="总体进度">
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
            当前阶段: 文件收集中 ({getProgressPercent(currentCase?.status || CaseStatus.DOCUMENT_COLLECTION)}% 完成)
          </div>
        </Card>

        {/* 详细步骤 */}
        <Card title="旅程步骤">
          <Steps
            current={2} // 当前在文件收集阶段
            direction="vertical"
            items={journeySteps.map(step => ({
              title: step.title,
              description: step.description,
              icon: step.icon,
              status: getStepStatus(step.stage, CaseStatus.DOCUMENT_COLLECTION),
            }))}
          />
        </Card>

        {/* 时间线 */}
        <Card title="重要事件时间线">
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
                    <span className="text-sm text-gray-500">{event.time}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>

        {/* 下一步行动 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="下一步行动">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded">
                  <div className="font-medium text-blue-800">上传身份证明</div>
                  <div className="text-sm text-blue-600 mt-1">请上传有效身份证明文件</div>
                  <Button type="primary" size="small" className="mt-2">上传文件</Button>
                </div>
                <div className="p-3 bg-orange-50 rounded">
                  <div className="font-medium text-orange-800">完成医疗问卷</div>
                  <div className="text-sm text-orange-600 mt-1">填写详细的医疗历史问卷</div>
                  <Button size="small" className="mt-2">填写问卷</Button>
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="联系信息">
              <div className="space-y-3">
                <div className="flex items-center p-3 border rounded">
                  <UserOutlined className="text-2xl text-blue-500 mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">准父母</div>
                    <div className="text-sm text-gray-600">{currentCase?.intendedParents.names}</div>
                  </div>
                  <Button type="primary" size="small">发消息</Button>
                </div>
                <div className="flex items-center p-3 border rounded">
                  <HeartOutlined className="text-2xl text-green-500 mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">代理机构</div>
                    <div className="text-sm text-gray-600">{currentCase?.assignedAgency?.agentName}</div>
                  </div>
                  <Button size="small">联系</Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  )
}

export default SurrogateJourneyPage



