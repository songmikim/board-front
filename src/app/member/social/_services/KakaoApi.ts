import SocialApi, { ProfileType } from './SocialApi'

export default class KakaoApi implements SocialApi {
  constructor(
    private apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_API_KEY,
    private domain: string = typeof window !== 'undefined' ? window.location.origin : '',
  ) {}

  async getToken(code: string) {
    const response = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.apiKey ?? '',
        redirect_uri: `${this.domain}/member/social/kakao/callback`,
        code,
      }).toString(),
    })
    const data = await response.json()
    return data.access_token as string
  }

  async getProfile(token: string) {
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    return { id: data.id } as ProfileType
  }

  getUrl(redirectUrl: string = '/') {
    const redirect_uri = `${this.domain}/member/social/kakao/callback`

    return `https://kauth.kakao.com/oauth/authorize?client_id=${this.apiKey}&redirect_uri=${redirect_uri}&response_type=code&state=${redirectUrl}`
  }
}
