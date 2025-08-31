'use client'

import React from 'react'
import { Card, Avatar, Button, Tag, Row, Col } from 'antd'
import {
  CalendarOutlined,
  HeartOutlined,
  UserOutlined,
  LikeOutlined,
  MessageOutlined,
  CameraOutlined,
  SmileOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { mockSocialPosts } from '@/data/mockData'

const IntendedParentSurrogateSocialPage = () => {
  // 筛选当前案例的代孕母亲动态
  const surrogatePosts = mockSocialPosts.filter(post => post.surrogateId === 'sa-002')

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'daily_life': return <SmileOutlined />
      case 'health_update': return <HeartOutlined />
      case 'milestone': return <TrophyOutlined />
      case 'mood': return <SmileOutlined />
      default: return <MessageOutlined />
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">孕母动态</h1>
          <p className="text-gray-600">查看您的代孕母亲Sarah Johnson的最新生活动态和健康更新</p>
        </div>

        {/* 代孕母亲信息卡片 */}
        <Card>
          <div className="flex items-center space-x-4">
            <Avatar size={64} icon={<UserOutlined />} />
            <div>
              <div className="font-semibold text-xl">Sarah Johnson</div>
              <div className="text-gray-600">32岁，德州达拉斯</div>
              <div className="text-sm text-gray-500 mt-1">已为您服务 15 天</div>
            </div>
            <div className="ml-auto">
              <Button type="primary" icon={<MessageOutlined />}>
                发送消息
              </Button>
            </div>
          </div>
        </Card>

        {/* 动态统计 */}
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <div className="text-2xl font-bold text-blue-600">{surrogatePosts.length}</div>
              <div className="text-gray-600">总动态数</div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {surrogatePosts.filter(p => p.type === 'health_update').length}
              </div>
              <div className="text-gray-600">健康更新</div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {surrogatePosts.filter(p => p.type === 'milestone').length}
              </div>
              <div className="text-gray-600">重要里程碑</div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {surrogatePosts.reduce((sum, post) => sum + post.likes, 0)}
              </div>
              <div className="text-gray-600">总点赞数</div>
            </Card>
          </Col>
        </Row>

        {/* 动态列表 */}
        <div className="space-y-4">
          {surrogatePosts.map((post) => (
            <Card key={post.id} className="shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <Avatar size={40} icon={<UserOutlined />} />
                  <div>
                    <div className="font-medium">Sarah Johnson</div>
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
                <div className="flex items-center space-x-4">
                  <Button 
                    type="text" 
                    icon={<LikeOutlined />} 
                    className="text-gray-600 hover:text-red-500"
                  >
                    {post.likes} 个赞
                  </Button>
                  <Button 
                    type="text" 
                    icon={<MessageOutlined />}
                    className="text-gray-600 hover:text-blue-500"
                  >
                    {post.comments.length} 条评论
                  </Button>
                </div>
                <div className="text-xs text-gray-400">
                  已读
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
                  
                  {/* 添加评论按钮 */}
                  <div className="mt-3 pt-2 border-t">
                    <Button type="primary" size="small" icon={<MessageOutlined />}>
                      添加评论
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}

          {surrogatePosts.length === 0 && (
            <Card className="text-center py-12">
              <UserOutlined className="text-4xl text-gray-400 mb-4 block mx-auto" />
              <p className="text-gray-500 mb-2">暂无动态</p>
              <p className="text-sm text-gray-400">您的代孕母亲还没有发布任何动态</p>
            </Card>
          )}
        </div>

        {/* 互动指南 */}
        <Card title="互动指南">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded">
              <div className="flex items-center mb-2">
                <LikeOutlined className="text-blue-500 mr-2" />
                <span className="font-medium text-blue-800">点赞支持</span>
              </div>
              <p className="text-sm text-blue-700">为代孕母亲的分享点赞，表达您的关心和支持</p>
            </div>
            <div className="p-4 bg-green-50 rounded">
              <div className="flex items-center mb-2">
                <MessageOutlined className="text-green-500 mr-2" />
                <span className="font-medium text-green-800">留言互动</span>
              </div>
              <p className="text-sm text-green-700">在评论区留言，与代孕母亲分享您的感受</p>
            </div>
            <div className="p-4 bg-purple-50 rounded">
              <div className="flex items-center mb-2">
                <HeartOutlined className="text-purple-500 mr-2" />
                <span className="font-medium text-purple-800">关注健康</span>
              </div>
              <p className="text-sm text-purple-700">特别关注健康更新动态，了解最新状况</p>
            </div>
            <div className="p-4 bg-orange-50 rounded">
              <div className="flex items-center mb-2">
                <TrophyOutlined className="text-orange-500 mr-2" />
                <span className="font-medium text-orange-800">庆祝里程碑</span>
              </div>
              <p className="text-sm text-orange-700">为重要里程碑庆祝，共同见证美好时刻</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default IntendedParentSurrogateSocialPage
