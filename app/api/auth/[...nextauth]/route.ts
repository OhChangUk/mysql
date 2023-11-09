import nextAuth from 'next-auth'
import Github from 'next-auth/providers/github'
import kakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    providers : [
        Github({
            clientId : `${process.env.GITHUB_ID}`,
            clientSecret : `${process.env.GITHUB_PW}`
        }),
        kakaoProvider({
            clientId : `${process.env.KAKAO_ID}`,
            clientSecret : `${process.env.KAKAO_PW}`
        }),
        NaverProvider({
            clientId : `${process.env.NAVER_ID}`,
            clientSecret : `${process.env.NAVER_PW}`
        }),
        GoogleProvider({
            clientId : `${process.env.GOOGLE_ID}`,
            clientSecret : `${process.env.GOOGLE_PW}`
        })
        // 구글 계정도 해보기
    ],
    secret : `${process.env.GITHUB_PW}`
    // jwt 생성 시 필요한 암호, 복잡하게 만들기
}

const handler = nextAuth(authOptions)
export {handler as GET, handler as POST}