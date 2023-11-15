
interface userInfo{
    user:{
      name:string;
      email?: string;
      image? : string;
      level? : string;
    }
  }
interface PropsData{
    session?: userInfo | null
}


import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import {signIn, signOut} from 'next-auth/react'
import Link from 'next/link';


export default async function Login(){
    const session = await getServerSession(authOptions) as userInfo
    const redirectTo = ()=>{
        sessionStorage.setItem('preUrl', window.location.href)
        window.location.href = "/login"
    }
    return(
        <>
            {
                session && session.user
                ?
                <>
                    <p>{session && session.user?.name}님 반갑습니다.</p>
                    <Link href="/logout">로그아웃</Link>
                </>
                :
                <>
                    <Link href="/login">로그인</Link>
                    <Link href="/register">회원가입</Link>
                </>
            }
            {/* <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-around text-white">
                    {session ? <button onClick={()=>signOut()} className='basis-[15%] py-2 bg-red-500 rounded-md'>로그아웃</button> : <>
                    <button onClick={()=>{signIn('google')}} className='basis-[15%] py-2 bg-[#3374EB] rounded-md'>구글 로그인</button>
                    <button onClick={()=>{signIn('kakao')}} className='basis-[15%] py-2 bg-[#F7E000] rounded-md text-black'>카카오 로그인</button>
                    <button onClick={()=>{signIn('naver')}} className='basis-[15%] py-2 bg-[#42CF55] rounded-md'>네이버 로그인</button>
                    <button onClick={()=>{signIn('github')}} className='basis-[15%] py-2 bg-[#1F2328] rounded-md'>깃허브 로그인</button></>}
                </div>
            </div> */}
        </>
    )
}