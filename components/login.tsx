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


export default function Login({session} : PropsData){
    return(
        <>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-around text-white">
                    {session ? <button onClick={()=>signOut()}>로그아웃</button> : <>
                    <button onClick={()=>{signIn('google')}} className='basis-[15%] py-2 bg-[#3374EB] rounded-md'>구글 로그인</button>
                    <button onClick={()=>{signIn('kakao')}} className='basis-[15%] py-2 bg-[#F7E000] rounded-md text-black'>카카오 로그인</button>
                    <button onClick={()=>{signIn('naver')}} className='basis-[15%] py-2 bg-[#42CF55] rounded-md'>네이버 로그인</button>
                    <button onClick={()=>{signIn('github')}} className='basis-[15%] py-2 bg-[#1F2328] rounded-md'>깃허브 로그인</button></>}
                </div>
            </div>
        </>
    )
}