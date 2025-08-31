'use client'

import React, { useState } from 'react'
import { Card, Button, Input, Select, Space, Avatar, message, Upload, Row, Col } from 'antd'
import {
  CalendarOutlined,
  HeartOutlined,
  FileTextOutlined,
  MessageOutlined,
  UserOutlined,
  PlusOutlined,
  CameraOutlined,
  SmileOutlined,
  MedicineBoxOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSocialPosts } from '@/data/mockData'

const { TextArea } = Input
const { Option } = Select

const SurrogateSocialPage = () => {
  const [postContent, setPostContent] = useState('')
  const [postType, setPostType] = useState('daily_life')
  const [showPostForm, setShowPostForm] = useState(false)

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

  const myPosts = mockSocialPosts.filter(post => post.surrogateId === 'sa-002') // 模拟当前用户的动态

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'daily_life': return <SmileOutlined />
      case 'health_update': return <HeartOutlined />
      case 'milestone': return <TrophyOutlined />
      case 'mood': return <SmileOutlined />
      default: return <FileTextOutlined />
    }
  }

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'daily_life': return '日常生活'
      case 'health_update': return '健康更新'
      case 'milestone': return '重要里程碑'
      case 'mood': return '心情分享'
      default: return '其他'
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'daily_life': return '#1890ff'
      case 'health_update': return '#52c41a'
      case 'milestone': return '#722ed1'
      case 'mood': return '#fa8c16'
      default: return '#666'
    }
  }

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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">生活动态</h1>
          <p className="text-gray-600">分享您的生活动态、健康状况和心情，让准父母了解您的近况</p>
        </div>

        {/* 发布动态 */}
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
            <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <div>
                    <label className="block text-sm font-medium mb-2">动态类型</label>
                    <Select 
                      value={postType} 
                      onChange={setPostType} 
                      className="w-full"
                    >
                      <Option value="daily_life">
                        <Space>
                          <SmileOutlined />
                          日常生活
                        </Space>
                      </Option>
                      <Option value="health_update">
                        <Space>
                          <HeartOutlined />
                          健康更新
                        </Space>
                      </Option>
                      <Option value="milestone">
                        <Space>
                          <TrophyOutlined />
                          重要里程碑
                        </Space>
                      </Option>
                      <Option value="mood">
                        <Space>
                          <SmileOutlined />
                          心情分享
                        </Space>
                      </Option>
                    </Select>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div>
                    <label className="block text-sm font-medium mb-2">添加照片</label>
                    <Upload
                      action="/api/upload"
                      listType="picture-card"
                      showUploadList={false}
                      className="w-full"
                    >
                      <div>
                        <CameraOutlined />
                        <div style={{ marginTop: 8 }}>添加照片</div>
                      </div>
                    </Upload>
                  </div>
                </Col>
              </Row>
              
              <div>
                <label className="block text-sm font-medium mb-2">分享内容</label>
                <TextArea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="分享您的生活动态、健康状况或心情..."
                  rows={4}
                  showCount
                  maxLength={500}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setShowPostForm(false)}>
                  取消
                </Button>
                <Button type="primary" onClick={handlePublishPost}>
                  发布动态
                </Button>
              </div>
            </div>
          )}

          {/* 发布提示 */}
          {!showPostForm && (
            <div className="text-center py-8 text-gray-500">
              <MessageOutlined className="text-4xl mb-4 block mx-auto" />
              <p className="mb-4">与准父母分享您的生活点滴</p>
              <p className="text-sm">您的动态将会发送给准父母，让他们了解您的近况</p>
            </div>
          )}
        </Card>

        {/* 我的动态列表 */}
        <Card title="我的最近动态">
          <div className="space-y-4">
            {myPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar size={40} icon={<UserOutlined />} />
                    <div>
                      <div className="font-medium">我</div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span 
                          className="inline-flex items-center px-2 py-1 rounded text-xs"
                          style={{ 
                            backgroundColor: getPostTypeColor(post.type) + '15',
                            color: getPostTypeColor(post.type)
                          }}
                        >
                          {getPostTypeIcon(post.type)}
                          <span className="ml-1">{getPostTypeLabel(post.type)}</span>
                        </span>
                        <span>{new Date(post.postedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button type="link" size="small">编辑</Button>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-800 leading-relaxed">{post.content}</p>
                  {post.images.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {post.images.map((image, index) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                          <CameraOutlined className="text-gray-400 text-2xl" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-3 border-t">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <HeartOutlined className="mr-1" />
                      {post.likes} 个赞
                    </span>
                    <span className="flex items-center">
                      <MessageOutlined className="mr-1" />
                      {post.comments.length} 条评论
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    准父母可见
                  </div>
                </div>

                {/* 评论区 */}
                {post.comments.length > 0 && (
                  <div className="mt-4 pt-3 border-t bg-gray-50 rounded p-3">
                    <div className="text-sm font-medium mb-2">评论</div>
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-2 mb-3 last:mb-0">
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

            {myPosts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <FileTextOutlined className="text-4xl mb-4 block mx-auto" />
                <p className="mb-2">还没有发布任何动态</p>
                <p className="text-sm">开始分享您的生活点滴吧！</p>
              </div>
            )}
          </div>
        </Card>

        {/* 分享指南 */}
        <Card title="分享指南">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded">
              <div className="flex items-center mb-2">
                <SmileOutlined className="text-blue-500 mr-2" />
                <span className="font-medium text-blue-800">日常生活</span>
              </div>
              <p className="text-sm text-blue-700">分享您的日常活动、饮食、休息等生活片段</p>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <div className="flex items-center mb-2">
                <HeartOutlined className="text-green-500 mr-2" />
                <span className="font-medium text-green-800">健康更新</span>
              </div>
              <p className="text-sm text-green-700">分享产检结果、身体状况、医生建议等</p>
            </div>
            <div className="p-4 bg-purple-50 rounded">
              <div className="flex items-center mb-2">
                <TrophyOutlined className="text-purple-500 mr-2" />
                <span className="font-medium text-purple-800">重要里程碑</span>
              </div>
              <p className="text-sm text-purple-700">记录重要的检查节点、胎动等特殊时刻</p>
            </div>
            <div className="p-4 bg-orange-50 rounded">
              <div className="flex items-center mb-2">
                <SmileOutlined className="text-orange-500 mr-2" />
                <span className="font-medium text-orange-800">心情分享</span>
              </div>
              <p className="text-sm text-orange-700">分享您的感受、心情变化、期待等</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default SurrogateSocialPage
