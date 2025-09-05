import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json()
    
    // 这里是演示代码，实际应该验证验证码
    if (!phone || !code) {
      return NextResponse.json(
        { error: 'Phone and code are required' },
        { status: 400 }
      )
    }

    // 模拟验证成功
    return NextResponse.json({
      success: true,
      user: {
        id: 'demo-user',
        phone,
        name: '演示用户'
      },
      token: 'demo-token'
    })
  } catch (error) {
    console.error('Phone login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

