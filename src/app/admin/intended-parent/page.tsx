'use client'

import React from 'react'
import { Card, Row, Col, Timeline, Button, Avatar, Table, Tag, Progress, Statistic } from 'antd'
import {
  CalendarOutlined,
  FileTextOutlined,
  DollarOutlined,
  MessageOutlined,
  UserOutlined,
  HeartOutlined,
  SafetyOutlined,
  BankOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSocialPosts, mockSurrogacyCases } from '@/data/mockData'

const IntendedParentDashboard = () => {
  const currentCase = mockSurrogacyCases[0] // 模拟当前案例
  const surrogatePosts = mockSocialPosts.filter(post => post.caseId === currentCase?.id) // 代孕母亲的动态
  const journeyProgress = [
    {
      color: 'green',
      children: (
        <div>
          <p className="font-semibold">初始咨询完成</p>
          <p className="text-gray-600 text-sm">服务协议签署，信托账户建立</p>
          <p className="text-gray-500 text-xs">2024年1月10日</p>
        </div>
      ),
    },
    {
      color: 'green',
      children: (
        <div>
          <p className="font-semibold">代孕母亲匹配成功</p>
          <p className="text-gray-600 text-sm">通过筛选，双方同意匹配</p>
          <p className="text-gray-500 text-xs">2024年1月18日</p>
        </div>
      ),
    },
    {
      color: 'blue',
      children: (
        <div>
          <p className="font-semibold">法律协议起草中</p>
          <p className="text-gray-600 text-sm">律师团队正在准备合同</p>
          <p className="text-gray-500 text-xs">进行中</p>
        </div>
      ),
    },
    {
      color: 'gray',
      children: (
        <div>
          <p className="font-semibold text-gray-400">胚胎移植</p>
          <p className="text-gray-400 text-sm">等待法律程序完成</p>
        </div>
      ),
    },
  ]

  const documents = [
    {
      key: '1',
      name: '服务协议',
      type: '合同',
      status: '已签署',
      date: '2024-01-10',
    },
    {
      key: '2',
      name: '代孕协议草案',
      type: '合同',
      status: '审核中',
      date: '2024-01-25',
    },
    {
      key: '3',
      name: '医疗保险文件',
      type: '保险',
      status: '待提交',
      date: '2024-01-26',
    },
    {
      key: '4',
      name: '胚胎实验室报告',
      type: '医疗',
      status: '已上传',
      date: '2024-01-22',
    },
  ]

  const documentColumns = [
    {
      title: '文件名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const colorMap: Record<string, string> = {
          '合同': 'blue',
          '保险': 'green',
          '医疗': 'orange',
        }
        return <Tag color={colorMap[type]}>{type}</Tag>
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          '已签署': 'green',
          '已上传': 'green',
          '审核中': 'orange',
          '待提交': 'red',
        }
        return <Tag color={colorMap[status]}>{status}</Tag>
      },
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="link" size="small">查看</Button>
      ),
    },
  ]

  const menuItems = [
    {
      key: 'my-case',
      icon: <CalendarOutlined />,
      label: '我的案例',
      path: '/admin/intended-parent/my-case',
    },
    {
      key: 'surrogate-social',
      icon: <UserOutlined />,
      label: '孕母动态',
      path: '/admin/intended-parent/surrogate-social',
    },
  ]

  return (
    <DashboardLayout menuItems={menuItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            准父母仪表板
          </h1>
          <p className="text-gray-600">
            欢迎回来！跟踪您的代孕旅程进展和重要信息
          </p>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="旅程进度"
                value={35}
                suffix="%"
                valueStyle={{ color: '#1890ff' }}
                prefix={<CalendarOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="信托账户余额"
                value={85000}
                prefix="$"
                valueStyle={{ color: '#3f8600' }}
                suffix="USD"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="待处理文件"
                value={2}
                suffix="份"
                valueStyle={{ color: '#faad14' }}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="预计完成时间"
                value="8个月"
                valueStyle={{ color: '#722ed1' }}
                prefix={<HeartOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* 当前状态 */}
          <Col xs={24} lg={8}>
            <Card title="当前状态" className="h-full">
              <div className="text-center space-y-4">
                <div className="text-3xl">👨‍👩‍👧‍👦</div>
                <div>
                  <p className="text-xl font-semibold text-blue-600">法律协议阶段</p>
                  <p className="text-gray-600">第3阶段，共7个阶段</p>
                </div>
                <Progress percent={35} status="active" />
                <p className="text-sm text-gray-500">
                  预计胚胎移植时间：2024年3月15日
                </p>
              </div>
            </Card>
          </Col>

          {/* 代孕母亲信息 */}
          <Col xs={24} lg={8}>
            <Card title="您的代孕母亲" className="h-full">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar size={64} icon={<UserOutlined />} />
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-gray-600 text-sm">32岁，德州达拉斯</p>
                  <p className="text-gray-500 text-xs">匹配时间：2024年1月18日</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">健康状态:</span>
                  <Tag color="green">优秀</Tag>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">经验:</span>
                  <span>2次成功代孕</span>
                </div>
              </div>
              <div className="space-y-2">
                <Button type="primary" block icon={<MessageOutlined />}>
                  发送消息
                </Button>
                <Button block icon={<FileImageOutlined />}>
                  查看照片墙
                </Button>
              </div>
            </Card>
          </Col>

          {/* 财务概览 */}
          <Col xs={24} lg={8}>
            <Card title="财务概览" extra={<BankOutlined />} className="h-full">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>账户余额</span>
                  <span className="font-semibold text-green-600">$85,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>已支付</span>
                  <span className="font-semibold">$65,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>待支付</span>
                  <span className="font-semibold text-orange-600">$85,000</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">总预算</span>
                    <span className="font-semibold text-lg">$150,000</span>
                  </div>
                </div>
                <Button type="primary" block icon={<DollarOutlined />}>
                  查看详细账单
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* 代孕旅程时间线 */}
          <Col xs={24} lg={12}>
            <Card title="代孕旅程进度" extra={<Button type="link">查看详情</Button>}>
              <Timeline items={journeyProgress} />
            </Card>
          </Col>

          {/* 重要提醒 */}
          <Col xs={24} lg={12}>
            <Card title="重要提醒" extra={<SafetyOutlined />}>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-red-50 rounded border-l-4 border-red-400">
                  <div className="flex-1">
                    <p className="font-medium text-red-800">待签署文件</p>
                    <p className="text-sm text-red-600">医疗保险文件需要您的签署</p>
                  </div>
                  <Button type="primary" size="small">处理</Button>
                </div>
                <div className="flex items-center p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  <div className="flex-1">
                    <p className="font-medium text-yellow-800">预约提醒</p>
                    <p className="text-sm text-yellow-600">法律咨询：明天下午2:00</p>
                  </div>
                  <Button size="small">查看</Button>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <div className="flex-1">
                    <p className="font-medium text-blue-800">新消息</p>
                    <p className="text-sm text-blue-600">代孕母亲发送了健康更新</p>
                  </div>
                  <Button size="small">查看</Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* 文件管理 */}
        <Card title="最近文件" extra={<Button type="link">查看全部</Button>}>
          <Table 
            columns={documentColumns} 
            dataSource={documents} 
            pagination={false}
            size="middle"
          />
        </Card>

        {/* 代孕母亲动态 */}
        <Card title="代孕母亲生活动态" extra={<Button type="link">查看全部</Button>}>
          <div className="space-y-4">
            {surrogatePosts.map((post) => (
              <div key={post.id} className="border rounded p-4 bg-blue-50">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar size={40} icon={<UserOutlined />} />
                    <div>
                      <div className="font-medium">{currentCase?.surrogate.name}</div>
                      <div className="text-sm text-gray-600">
                        <span className="px-2 py-1 bg-white rounded text-xs mr-2">
                          {post.type === 'daily_life' ? '日常生活' : 
                           post.type === 'health_update' ? '健康更新' : 
                           post.type === 'milestone' ? '重要里程碑' : '心情分享'}
                        </span>
                        {new Date(post.postedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <Button type="text" icon={<HeartOutlined />} size="small">
                    {post.likes}
                  </Button>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-800">{post.content}</p>
                  {post.images.length > 0 && (
                    <div className="mt-2 flex space-x-2">
                      {post.images.map((image, index) => (
                        <div key={index} className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                          <FileImageOutlined className="text-gray-400" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-white">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>❤️ {post.likes} 个赞</span>
                    <span>💬 {post.comments.length} 条评论</span>
                  </div>
                  <Button type="link" size="small" icon={<MessageOutlined />}>
                    回复
                  </Button>
                </div>

                {post.comments.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-2 mb-2">
                        <Avatar size="small" icon={<UserOutlined />} />
                        <div className="flex-1 bg-white rounded p-2">
                          <div className="text-sm">
                            <span className="font-medium text-blue-600">{comment.authorName}</span>
                            <span className="ml-2 text-gray-700">{comment.content}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(comment.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {surrogatePosts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileImageOutlined className="text-4xl mb-2 block mx-auto" />
                <p>暂无动态更新</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default IntendedParentDashboard
