'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/types/auth'
import { Spin } from 'antd'

const DashboardPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        router.push('/login')
        return
      }

      // 根据用户角色跳转到对应的仪表板
      switch (user.role) {
        case UserRole.SUPER_ADMIN:
          router.push('/admin/super-admin')
          break
        case UserRole.SURROGATE:
          router.push('/admin/surrogate')
          break
        case UserRole.INTENDED_PARENT:
          router.push('/admin/intended-parent')
          break
        case UserRole.THIRD_PARTY:
          router.push('/admin/third-party')
          break
        default:
          router.push('/login')
      }
    }
  }, [user, isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-600">正在加载您的仪表板...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-600">正在跳转到您的专属仪表板...</p>
      </div>
    </div>
  )
}

export default DashboardPage
