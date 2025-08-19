import SocialApi, { ProfileType } from './SocialApi'

export default class KakaoApi implements SocialApi {
  getToken(code: string) {
    return ''
  }

  getProfile(token: string) {
    return { id: '' }
  }

  getUrl(redirectUrl?: string) {
    return ''
  }
}
