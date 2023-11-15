import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2/promise';

export const GET = async (
    req : NextRequest,
    res : NextResponse
) : Promise<NextResponse> => {

    if(req.method === 'GET'){
        console.log(req.nextUrl.searchParams.get("page"))
        const page = Number(req.nextUrl.searchParams.get("page") || 1)
        const perPage = 10
        const offset = (page - 1) * perPage
        try{
            const [results] = await db.query<RowDataPacket[]>('SELECT * FROM brd.board order by date DESC limit ? offset ? ', [perPage, offset]) // desc - 최신순
            const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from brd.board')
            // 최대갯수 출력
            const totalCnt = countResult[0].cnt
            console.log(results)
            // limit 숫자 - 보이는 갯수
            // offset 10단위 숫자 - 페이지 20은 2페이지, 30은 3페이지
            // order by 날짜 데이터 이름 - 최신순
            return NextResponse.json({message : "성공", results, totalCnt, page, perPage})

        }catch(error){
            return NextResponse.json({error : error})
        }
    }


    return NextResponse.json({error : "에러가 발생하였습니다."})

}