import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
const BLOCKED_COUNTRY = 'CN'
const autos = [
    '/','/promotion','/ranking','/srecord'
]
export function middleware(req: NextRequest) {
  // 阻止地区
  const country = req.geo?.country
  if (country === BLOCKED_COUNTRY) {
    req.nextUrl.pathname = '/login'
    return NextResponse.rewrite(req.nextUrl)
  }
  // 返回ip信息
  const response = NextResponse.next()
  // response.cookies.set('x-ip', req.ip)
  // response.cookies.set('x-country', req.geo?.country)
  // 返回sessionId
  if (autos.includes(req.nextUrl.pathname)) {
    const token = req.cookies.get('main_token')
    req.nextUrl.pathname = '/login'
    if (!token) return NextResponse.rewrite(req.nextUrl)
  }
  return response
}
