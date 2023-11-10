'use client';
interface userInfo{
    name: string,
    email: string,
    image: string
}
interface PropsData{
    session?: userInfo | null
}

import {signIn, signOut} from 'next-auth/react'
import Link from 'next/link';


export default function Login({session} : PropsData){
    return(
        <>
            {
                session && session.user.level === 10 ?
                '관리자'
                :
                session && session.user !== null && '일반회원'
            }
            <Link href="/api/auth/signin">로그인</Link>
            <Link href="/register">회원가입</Link>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-around text-white">
                    {session ? <button onClick={()=>signOut()} className='basis-[15%] py-2 bg-red-500 rounded-md'>로그아웃</button> : <>
                    <button onClick={()=>{signIn('google')}} className='basis-[15%] py-2 bg-[#3374EB] rounded-md'>구글 로그인</button>
                    <button onClick={()=>{signIn('kakao')}} className='basis-[15%] py-2 bg-[#F7E000] rounded-md text-black'>카카오 로그인</button>
                    <button onClick={()=>{signIn('naver')}} className='basis-[15%] py-2 bg-[#42CF55] rounded-md'>네이버 로그인</button>
                    <button onClick={()=>{signIn('github')}} className='basis-[15%] py-2 bg-[#1F2328] rounded-md'>깃허브 로그인</button></>}
                </div>
            </div>
        </>
    )
}