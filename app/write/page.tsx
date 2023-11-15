'use client'

import { useSession } from "next-auth/react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useCustomSession } from "../sessions"




interface formType{
    userid : string,
    username : string,
    title : string,
    content : string
}

export default function Write(){
    const {data: session} = useCustomSession()
    const [formData, setFormData] = useState<formType>({
        userid : session?.user?.email ?? '',
        username : session?.user?.name ?? '',
        title : '',
        content : ''
    })

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
            const res = await fetch('/api/write',{
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
            <div className="max-w-7xl mx-auto p-6 border">
                <form method="post" onSubmit={submitEvent}>
                    <div className="flex gap-x-2 pb-2 items-center">
                        <p>작성자 : </p>
                        <input type="text" name="name" value={formData.username} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border" />
                    </div>
                    <div className="flex gap-x-2 pb-2 items-center">
                        <p>제목 : </p>
                        <input type="text" name="title" value={formData.title} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border" />
                    </div>
                    <div className="">
                        <p className='pb-2'>내용 :</p>
                        <textarea name="content" value={formData.content} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border"></textarea>
                    </div>
                    <div className="flex justify-end gap-x-3 pr-5 pt-10">
                        <Link href="/" className='bg-blue-500 inline-block text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none '>취소</Link>
                        <button className='bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600 focus:outline-none '>등록</button>
                    </div>
                </form>
            </div>
        </>
    )
}