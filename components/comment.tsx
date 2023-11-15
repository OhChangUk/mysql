/*
{data : session} = useCustomSession()
const data = {
    id: 5,
    name: "홍길동",
    email : "test@naver.com"
}
변수 내에 중괄호 {} 가 들어가면 구조 분해 할당(destructuring assignment) > 해당 객체에서 그 속성을 추출해서 새로움 변수로 할당할 때 사용

예를 들어, ...data.id 이걸 변수로 저장을 따로 하고 싶다면
const {id} = data > const id = 5 값이 저장됨
*/
'use client'

import { useCustomSession } from "@/app/sessions"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

interface CommentProps {
    id: number
}
interface formType{
    parentid : number;
    userid : string;
    username : string;
    content : string;
}
interface CommentType{
    id : number;
    parentid : number;
    userid : string;
    username : string;
    content : string;
    date : string;
}


export default function Comment(props: CommentProps){
    const {id} = props
    
    const commentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name] : e.target.value})
        console.log(formData)
    }
    
    const {data : session} = useCustomSession()
    const [formData, setFormData] = useState<formType>({
        parentid : id,
        userid : session?.user?.email ?? '',
        username : session?.user?.name ?? '',
        content : ''
    })
    const  [totalComment, setTotalComment] = useState<CommentType[]>()
    
    const params = useParams()
    console.log(params)
    useEffect(()=>{
        const fetchData = async ()=>{
            const res = await fetch(`/api/comment?id=${params.id}`)
            const data = await res.json()
            setTotalComment(data.result)
        }
        fetchData()
    }, [params.id])

    const cmtSubmit = async () => {
        try{
            const res = await fetch('/api/comment', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            })
            if(res.ok){
                const data = await res.json()
                console.log(data)
                setTotalComment(data.result)
            }
        }catch(error){
            console.log(error)
        }
    }
    return(
        <>
            {
                session && session.user && <>
                    <p className="border-b pl-2 py-3">댓글 목록</p>
                    {
                        totalComment && totalComment.map((e,i)=>{
                            const date = new Date(e.date)
                            const year = date.getFullYear()
                            const month = (date.getMonth()+1).toString().padStart(2, '0')
                            const day = date.getDate().toString().padStart(2, '0')
                            const hours = date.getHours().toString().padStart(2, '0')
                            const minutes = date.getMinutes().toString().padStart(2, '0')
                            const seconds = date.getSeconds().toString().padStart(2, '0')
                            const formatDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
                            return(
                                <p>{formatDate}</p>
                            )
                        })
                    }
                    <div className="pt-3 pl-2">
                        <input type="text" name="content" onChange={commentValue} className="border p-2 border-orange-500 rounded w-[88%]" />
                    </div>
                    <div className="flex justify-end gap-x-3 pr-5 pt-10">
                        <button className="bg-blue-500 inline-block text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none" onClick={cmtSubmit}>댓글 전송</button>
                    </div>
                </>
            }
        </>
    )
}