'use client'

import { SessionProvider } from "next-auth/react"

interface Props{
    children: React.ReactNode
}

export default function AuthSession({children} : Props){
    return <SessionProvider>{children}</SessionProvider>

    // layout.tsx는 ssr이라 csr인 SessionProvider를 못써서 따로 빼서 임폴트로 사용
}