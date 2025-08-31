'use client'

import React, { useState } from 'react'
import { Card, Row, Col, Timeline, Progress, Button, Avatar, Upload, message, Input, Select, Space } from 'antd'
import {
  CalendarOutlined,
  HeartOutlined,
  FileImageOutlined,
  MessageOutlined,
  UserOutlined,
  UploadOutlined,
  MedicineBoxOutlined,
  SafetyOutlined,
  PlusOutlined,
  CameraOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSocialPosts, mockSurrogacyCases } from '@/data/mockData'

const { TextArea } = Input
const { Option } = Select

const SurrogateDashboard = () => {
  const [postContent, setPostContent] = useState('')
  const [postType, setPostType] = useState('daily_life')
  const [showPostForm, setShowPostForm] = useState(false)

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败`)
    }
  }

  const handlePublishPost = () => {
    if (!postContent.trim()) {
      message.error('请输入动态内容')
      return
    }
    
    message.success('动态发布成功！准父母已收到通知')
    setPostContent('')
    setPostType('daily_life')
    setShowPostForm(false)
  }

  const currentCase = mockSurrogacyCases[0] // 模拟当前案例
  const myPosts = mockSocialPosts.filter(post => post.surrogateId === 'sa-002') // 模拟当前用户的动态

  const journeyProgress = [
    {
      color: 'green',
      children: (
        <div>
          <p className="font-semibold">初始设置完成</p>
          <p className="text-gray-600 text-sm">账户创建、咨询完成、协议签署</p>
          <p className="text-gray-500 text-xs">2024年1月15日</p>
        </div>
      ),
    },
    {
      color: 'green',
      children: (
        <div>
          <p className="font-semibold">医疗筛选通过</p>
          <p className="text-gray-600 text-sm">身体检查、心理评估、医疗批准</p>
          <p className="text-gray-500 text-xs">2024年1月20日</p>
        </div>
      ),
    },
    {
      color: 'blue',
      children: (
        <div>
          <p className="font-semibold">胚胎移植准备中</p>
          <p className="text-gray-600 text-sm">药物治疗、周期同步</p>
          <p className="text-gray-500 text-xs">进行中</p>
        </div>
      ),
    },
    {
      color: 'gray',
      children: (
        <div>
          <p className="font-semibold text-gray-400">胚胎移植</p>
          <p className="text-gray-400 text-sm">等待安排</p>
        </div>
      ),
    },
    {
      color: 'gray',
      children: (
        <div>
          <p className="font-semibold text-gray-400">妊娠监测</p>
          <p className="text-gray-400 text-sm">等待开始</p>
        </div>
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
      icon: <FileImageOutlined />,
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
      icon: <SafetyOutlined />,
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            代孕母亲仪表板
          </h1>
          <p className="text-gray-600">
            欢迎回来！跟踪您的代孕旅程和健康状态
          </p>
        </div>

        <Row gutter={[16, 16]}>
          {/* 当前状态 */}
          <Col xs={24} lg={8}>
            <Card title="当前状态" className="h-full">
              <div className="text-center space-y-4">
                <div className="text-3xl">🤱</div>
                <div>
                  <p className="text-xl font-semibold text-blue-600">胚胎移植准备</p>
                  <p className="text-gray-600">第3阶段，共7个阶段</p>
                </div>
                <Progress percent={43} status="active" />
                <p className="text-sm text-gray-500">
                  预计移植时间：2024年2月15日
                </p>
              </div>
            </Card>
          </Col>

          {/* 准父母信息 */}
          <Col xs={24} lg={8}>
            <Card title="准父母信息" className="h-full">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar size={64} icon={<UserOutlined />} />
                <div>
                  <p className="font-semibold">Smith 夫妇</p>
                  <p className="text-gray-600 text-sm">来自加州洛杉矶</p>
                  <p className="text-gray-500 text-xs">匹配时间：2024年1月10日</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button type="primary" block icon={<MessageOutlined />}>
                  发送消息
                </Button>
                <Button block>查看详细资料</Button>
              </div>
            </Card>
          </Col>

          {/* 今日任务 */}
          <Col xs={24} lg={8}>
            <Card title="今日任务" className="h-full">
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-blue-50 rounded">
                  <MedicineBoxOutlined className="text-blue-500 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium">服用激素药物</p>
                    <p className="text-sm text-gray-600">早上8:00</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded">
                  <HeartOutlined className="text-green-500 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium">记录体重和血压</p>
                    <p className="text-sm text-gray-600">完成</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-yellow-50 rounded">
                  <CalendarOutlined className="text-yellow-500 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium">医院检查</p>
                    <p className="text-sm text-gray-600">下午2:00</p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* 代孕旅程时间线 */}
          <Col xs={24} lg={12}>
            <Card title="代孕旅程进度">
              <Timeline items={journeyProgress} />
            </Card>
          </Col>

          {/* 快速操作 */}
          <Col xs={24} lg={12}>
            <Card title="快速操作">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">上传今日照片</h4>
                  <Upload
                    action="/api/upload"
                    onChange={handleUpload}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />} block>
                      上传照片
                    </Button>
                  </Upload>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">健康记录</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="small">记录体重</Button>
                    <Button size="small">记录血压</Button>
                    <Button size="small">记录心情</Button>
                    <Button size="small">记录症状</Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">沟通交流</h4>
                  <div className="space-y-2">
                    <Button block icon={<MessageOutlined />}>
                      给准父母留言
                    </Button>
                    <Button block>联系案例协调员</Button>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* 生活动态 */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card 
              title="发布生活动态" 
              extra={
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setShowPostForm(!showPostForm)}
                >
                  {showPostForm ? '取消' : '发布动态'}
                </Button>
              }
            >
              {showPostForm && (
                <div className="space-y-4 mb-4 p-4 bg-gray-50 rounded">
                  <div>
                    <label className="block text-sm font-medium mb-2">动态类型</label>
                    <Select 
                      value={postType} 
                      onChange={setPostType} 
                      className="w-full"
                    >
                      <Option value="daily_life">日常生活</Option>
                      <Option value="health_update">健康更新</Option>
                      <Option value="milestone">重要里程碑</Option>
                      <Option value="mood">心情分享</Option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">分享内容</label>
                    <TextArea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="分享您的生活动态、健康状况或心情..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Upload
                      action="/api/upload"
                      listType="picture-card"
                      showUploadList={false}
                    >
                      <div>
                        <CameraOutlined />
                        <div style={{ marginTop: 8 }}>添加照片</div>
                      </div>
                    </Upload>
                  </div>
                  <Space>
                    <Button type="primary" onClick={handlePublishPost}>
                      发布
                    </Button>
                    <Button onClick={() => setShowPostForm(false)}>
                      取消
                    </Button>
                  </Space>
                </div>
              )}
              
              <div className="space-y-4">
                <h4 className="font-medium">我的最近动态</h4>
                {myPosts.map((post) => (
                  <div key={post.id} className="border rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar size="small" icon={<UserOutlined />} />
                        <span className="font-medium">我</span>
                        <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                          {post.type === 'daily_life' ? '日常生活' : 
                           post.type === 'health_update' ? '健康更新' : 
                           post.type === 'milestone' ? '重要里程碑' : '心情分享'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(post.postedAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{post.content}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>❤️ {post.likes} 个赞</span>
                        <span>💬 {post.comments.length} 条评论</span>
                      </div>
                      <span>准父母可见</span>
                    </div>
                    {post.comments.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex items-start space-x-2 mb-2">
                            <Avatar size="small" icon={<UserOutlined />} />
                            <div className="flex-1">
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
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="案例进度文件">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>案例编号: {currentCase?.caseNumber}</span>
                  </div>
                  <Button type="link" size="small">查看详情</Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>最新医疗报告已更新</span>
                  </div>
                  <span className="text-gray-500 text-sm">2小时前</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>法律文件等待签署</span>
                  </div>
                  <Button type="link" size="small">去签署</Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span>下次产检预约</span>
                  </div>
                  <span className="text-gray-500 text-sm">2024年2月15日</span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  )
}

export default SurrogateDashboard
