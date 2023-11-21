
interface userInfo{
    user:{
      name:string;
      email?: string;
      image? : string;
      level? : string;
    }
  }



import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Logout from './logout';
import Login from './login';


export default async function Nav(){
    const session = await getServerSession(authOptions) as userInfo

    return(
        <>
            {
                session && session.user
                ?
                <>
                    <p>{session && session.user?.name}님 반갑습니다.</p>
                    <Link href="/logout"><Logout /></Link>
                </>
                :
                <>
                    <Link href="/login"><Login /></Link>
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