'use client'
import SocialApi, { ProfileType } from './SocialApi'

export default class KakaoApi implements SocialApi {
  constructor(
    private apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_API_KEY,
    private domain: string = location.origin,
  ) {}

  getToken(code: string) {
    return ''
  }

  getProfile(token: string) {
    return { id: '' }
  }

  getUrl(redirectUrl: string = '/') {
    const redirect_uri = `${this.domain}/member/social/kakao/callback`

    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.apiKey}&redirect_uri=${redirect_uri}&response_type=code&state=${redirectUrl}`
  }
}
