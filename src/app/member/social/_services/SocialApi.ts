export type ProfileType = {
  id: number | string
}

/**
 * authorization code
 */
export default interface SocialApi {
  getToken: (code: string) => string
  getProfile: (token: string) => ProfileType
  
  /**
   * 인증 서버에서 client_id를 통해서 authorization code를 발급받을 수 있는 URL 생성
   * authorization code : access token을 발급 받기 위한 인증 코드 
   * @param redirectUrl : 없으면 메인 페이지, 있으면 로그인 처리 후  지정된 URL로 이동
   * @returns 
   */
  getUrl: (redirectUrl: string) => string
}
