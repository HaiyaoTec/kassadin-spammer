import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const BLOCKED_COUNTRY = 'CN'
const autos = [
    '/'
]
export function middleware(req: NextRequest) {
  // 返回ip信息
  const response = NextResponse.next()
  response.cookies.set('x-ip', req.ip)
  response.cookies.set('x-country', req.geo?.country)
  // 返回sessionId
  if (autos.includes(req.nextUrl.pathname)) {
    const token = req.cookies.get('agent_token')
    req.nextUrl.pathname = '/login'
    if (!token) return NextResponse.redirect(req.nextUrl)
  }
  return response
}
