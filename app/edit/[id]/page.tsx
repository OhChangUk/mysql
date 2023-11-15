'use client'
import { useCustomSession } from '@/app/sessions';
// import db from '@/db'
import Link from 'next/link';
import { useParams } from 'next/navigation';
// import { RowDataPacket } from 'mysql2/promise';
import { useEffect, useState } from 'react';


interface editProps{
    params : {
        id: string;
    }
}


interface formType{
    userid : string,
    username : string,
    title : string,
    content : string
}
interface PostList{
    id : number,
    title : string,
    content : string,
    userid : string,
    username : string,
    date : string,
    count : number
}

export default function Edit(props:editProps){
    console.log(props.params.id)
    const params = useParams()
    const [post, setPost] = useState<PostList[]>([])
    const {data: session} = useCustomSession()
    // const [results] = await db.query<RowDataPacket[]>(
    //     "SELECT * from brd.board where id = ?",[props.params.id]
    // )

    // 'update 테이블명 set 필드=변경값, 필드=변경값, 필드=변경값 where id = 변경할 아이디'
    // ('update brd.board set title=?, content=? where id=?',[title,content,id])
    const [formData, setFormData] = useState<formType>({
        userid : session?.user?.email ?? '',
        username : session?.user?.name ?? '',
        title : '',
        content : ''
    })

    useEffect(()=>{
        const fetchData = async ()=>{
            // 배열의 마지막 값을 가지고 오는 방법 - pop
            const res = await fetch(`/api/post/${params.id}`)
            const data = await res.json()
            console.log(data)
            setPost(data.data)
        }
        fetchData()
    }, [params.id])

    useEffect(()=>{
        setFormData({
            userid: session?.user.email ?? '',
            username : session?.user.name ?? '',
            title: '',
            content: ''
        })
    }, [session?.user.name, session?.user.email])

    const changeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name] : e.target.value})
        console.log(formData)
    }
    const submitEvent = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            const res = await fetch(`/api/edit/${params.id}`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            })
            if(res.ok){
                const data = await res.json()
                console.log(data.message)
                alert("정상적으로 등록 하였습니다.")
                window.location.href = '/'
            }else{
                const errorData = await res.json()
                console.log(errorData.error)
            }
        }catch(error){
            console.log(error)
        }
    }
    return(
        <>
            {/* {results.length > 0 ? ( */}
                <form method="post" onSubmit={submitEvent}>
                    <div className="max-w-7xl mx-auto border rounded-md">
                        <p className="text-center text-2xl font-bold bg-[#ddd] p-3">수정</p>
                        <div className="flex gap-x-2 pb-2 pt-6 items-center pl-5">   
                            <p>작성자 : </p>
                            <input type="text" name="name" defaultValue={post[0]?.username} onChange={changeEvent} className="shadow text-gray-700 text-sm border" />
                        </div>
                        <div className="flex gap-x-2 pb-2 items-center pl-5">
                            <p>제목 : </p>
                            <input type="text" name="title" defaultValue={post[0]?.title} onChange={changeEvent} className="shadow text-gray-700 text-sm border" />
                        </div>
                        <div className=" pl-5">
                            <p className='pb-2'>내용 :</p>
                            <textarea name="content" defaultValue={post[0]?.content} onChange={changeEvent} className="shadow text-gray-700 text-sm border w-[98%]"></textarea>
                        </div>
                        <div className="flex justify-end gap-x-3 pr-5 py-10">
                            <Link href="/" className='bg-red-500 inline-block text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none '>취소</Link>
                            <button className='bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none '>등록</button>
                        </div>
                    </div>
                </form>
            {/* ) : (
                <NotData />
            )} */}
        </>
    )
}

// function NotData(){
//     return(
//         <>
//             <p>데이터 없음</p>
//             <Link href="/">목록</Link>
//         </>
//     )
// }
