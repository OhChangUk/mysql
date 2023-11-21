'use client';

import { signIn } from "next-auth/react";
import React, { useState } from "react";

interface formType{
    email : string,
    password : string,
    name : string,
    birthday : string
}



export default function Register(){
    const [formData, setFormData] = useState<formType>({
        email : '',
        password : '',
        name : '',
        birthday : ''
    })

    const [message, setMessage] = useState<string>("")
    const changeEvent = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData, [e.target.name] : e.target.value
        })
        console.log(formData)
    }
    const submitEvent = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            const res = await fetch('/api/auth/signup',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            })
            if(res.ok){
                const data = await res.json()
                const result = data.data
                
                if(data.message === '성공'){
                    alert("회원가입이 완료 되었습니다.")
                    
                    signIn('credentials', {
                        email : result.email,
                        password : result.password,
                        callbackUrl : '/'
                    })
                }
                console.log(data)
                setMessage(data.message)
            }
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
            <p>{message}</p>
            <form onSubmit={submitEvent} method="POST">
                <input onChange={changeEvent} type="text" placeholder="이메일" name="email" required />
                <input onChange={changeEvent} type="password" placeholder="비밀번호" name="password" required />
                <input onChange={changeEvent} type="text" placeholder="닉네임" name="name" required />
                <input onChange={changeEvent} type="text" placeholder="생년월일" name="birthday" required />
                <button type="submit">가입</button>
            </form>
        </>
    )
}