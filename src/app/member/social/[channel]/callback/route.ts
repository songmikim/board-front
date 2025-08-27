import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import KakaoApi from '../../_services/KakaoApi'

export async function GET(request: NextRequest, context: any) {
  const { params } = context as { params: { channel: string } }
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state') || '/'

  if (!code) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const origin = request.headers.get('origin') || ''

  let profileId = ''

  switch (params.channel) {
    case 'kakao': {
      const api = new KakaoApi(process.env.NEXT_PUBLIC_KAKAO_API_KEY, origin)
      const token = await api.getToken(code)
      const profile = await api.getProfile(token)
      profileId = profile.id.toString()
      break
    }
    default:
      return NextResponse.redirect(new URL('/', request.url))
  }

  const redirectUrl = `${origin}/member/join?channel=${params.channel}&token=${profileId}&redirectUrl=${state}`
  return NextResponse.redirect(redirectUrl)
}