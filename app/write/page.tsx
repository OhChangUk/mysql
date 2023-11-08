'use client'

import Link from "next/link"
import React, { useState } from "react"



interface formType{
    name : string,
    title : string,
    content : string
}

export default function Write(){

    const [formData, setFormData] = useState<formType>({
        name : '',
        title : '',
        content : ''
    })
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
                // alert("정상적으로 등록 하였습니다.")
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
            <form method="post" onSubmit={submitEvent}>
                <input type="text" name="name" value={formData.name} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border" />
                <input type="text" name="title" value={formData.title} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border" />
                <textarea name="content" value={formData.content} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border"></textarea>
                <Link href="/" className='bg-blue-500 inline-block text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none '>취소</Link>
                <button className='bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600 focus:outline-none '>등록</button>
            </form>
        </>
    )
}