import db from '@/db';
import { RowDataPacket } from 'mysql2/promise';
import Link from 'next/link';


interface editProps{
    params : {
        id: string;
    }
}

interface PostList{
    id : number,
    title : string,
    content : string,
    author : string,
    date : string,
    count : number
}

export default async function Edit(props:editProps){
    console.log(props.params.id)
    const [results] = await db.query<RowDataPacket[]>('select * from brd.board where id = ?',[props.params.id])

    // 'update 테이블명 set 필드=변경값, 필드=변경값, 필드=변경값 where id = 변경할 아이디'
    // ('update brd.board set title=?, content=? where id=?',[title,content,id])
    return(
        <>
            {results.length > 0 
            ?
                <form method="post">
                    <div className="max-w-7xl mx-auto p-6 border">
                        <div className="flex gap-x-2 pb-2 items-center">
                            <p>작성자 : </p>
                            <input type="text" name="name"  defaultValue={results[0]?.author} className="shadow text-gray-700 text-sm border" />
                        </div>
                        <div className="flex gap-x-2 pb-2 items-center">
                            <p>제목 : </p>
                            <input type="text" name="title" defaultValue={results[0]?.title}  className="shadow text-gray-700 text-sm border" />
                        </div>
                        <div className="">
                            <p className='pb-2'>내용 :</p>
                            <textarea name="content"  defaultValue={results[0]?.content} className="shadow text-gray-700 text-sm border w-[98%]"></textarea>
                        </div>
                        <div className="flex justify-end gap-x-3 pr-5 pt-10">
                            <Link href="/" className='bg-red-500 inline-block text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none '>취소</Link>
                            <button className='bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none '>등록</button>
                        </div>
                    </div>
                </form>
            : 
                <NotData result={results} />}
        </>
    )
}

function NotData({result}){
    // result 라는 변수는 위 컴포넌트에 있어서 props로 받아와야 사용가능하다.
    console.log(result)
    return(
        <>
            <p>데이터가 존재 하지 않음</p>
            <Link href='/'>목록</Link>
        </>
    )
}