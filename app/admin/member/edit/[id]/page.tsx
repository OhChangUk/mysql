'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface userType{
    email: string;
    password ?: string;
    name: string;
    birthday : string;
    level: number;
    type: string;
    id: number;
}

export default function MemberEdit({params} : {params : {id:number}}){
    const [userData, setUserData] = useState<userType>()

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await fetch('http://localhost:3000/api/admin', {
                    cache : 'no-cache',
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body : JSON.stringify({
                        pathUrl : 'edit',
                        id : params.id
                    })
                })
                if(res.ok){
                    const result = await res.json()
                    const data = result.data
                    if(data.length < 1){
                        alert("데이터가 없습니다.")
                        window.location.href="/admin/member"
                    }
                    setUserData(data[0])
                    console.log(data)
                }
            }catch(error){
                alert(error)
            }
        }
        fetchData()
    }, [params.id])


    const [formData, setFormData] = useState<userType>({
        email : userData ? userData.email : '',
        password : userData ? userData.password : '',
        name : userData ? userData.name : '',
        birthday : userData ? userData.birthday : '',
        level : userData ? userData.level : 2,
        type : 'edit',
        id : params.id
    })

    useEffect(()=>{
        setFormData({
            email : userData ? userData.email : '',
            password : userData ? userData.password : '',
            name : userData ? userData.name : '',
            birthday : userData ? userData.birthday : '',
            level : userData ? userData.level : 2,
            type : 'edit',
            id : params.id
        })
    }, [userData, params.id])

    const changeEvent = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData, [e.target.name] : e.target.value
        })
    }
    const submitEvent = async ()=>{
        try{
            const res = await fetch('/api/auth/signup', {
                    cache : 'no-cache',
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body : JSON.stringify(formData)
                })
                if(res.ok){
                    const result = await res.json()
                    const data = result.data
                    if(result.message === "성공"){
                        alert(data + "님의 정보를 수정하였습니다.")
                        window.location.href="/admin/member"
                    }
                }
        }catch(error){
            alert(error)
        }
    }
    console.log(formData)

    return(
        <>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <h3>회원 수정</h3>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className='basis-1/4 text-xs sm:text-sm'>이메일 : </label>
                    <input type="text" name='email' onChange={changeEvent} defaultValue={userData && userData.email} className='border text-sm p-2 rounded-md' />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className='basis-1/4 text-xs sm:text-sm'>패스워드 : </label>
                    <input type="password" name='password' onChange={changeEvent} className='border text-sm p-2 rounded-md' />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className='basis-1/4 text-xs sm:text-sm'>이름 : </label>
                    <input type="text" name='name' onChange={changeEvent} defaultValue={userData && userData.name} className='border text-sm p-2 rounded-md' />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className='basis-1/4 text-xs sm:text-sm'>생년월일 : </label>
                    <input type="text" name='name' onChange={changeEvent} defaultValue={userData && userData.birthday} className='border text-sm p-2 rounded-md' />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className='basis-1/4 text-xs sm:text-sm'>레벨 : </label>
                    <select name="level" onChange={changeEvent} value={userData && userData.level} className='border text-sm px-5 py-2 rounded-md'>
                        {
                            Array(8).fill(null).map((_,i)=>{
                                return(
                                    <option key={i} value={i+2}>{i+2}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="flex justify-end gap-x-5">
                <Link href="/admin/member" className='bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600'>취소</Link>
                <button onClick={submitEvent} className='bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600'>수정</button>
            </div>
        </>
    )
}