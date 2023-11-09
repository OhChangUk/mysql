// 404 커스터마이징
import {headers} from 'next/headers'

export default async function NotFound(){
    const headerList = headers()
    const domain = headerList.get('host')
    
    console.log(headerList.get('host'))
    return(
        <>
            <p>입력 하신 {domain}은 없는 페이지입니다.</p>
        </>
    )
}