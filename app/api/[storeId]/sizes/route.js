import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(req,{params}){

    try{
        console.log("POST METHOD");
        const user = await  currentUser();
        const body = await req.json();
        const { name, value } = body;
        const userId = user.id;
        
        if(!userId){
            return new NextResponse("Unauthenticated", { status:401 });
        }

        if(!name){
            return new NextResponse("Name is required",{ status: 400});
        }

        if(!value){
            return new NextResponse("value is required",{ status: 400});
        }

        if(!params.storeId){
            return new NextResponse("Store id is required",{ status: 400});
        }

        const storeByUserId = await db.store.findFirst({
            where : {
                id : params.storeId,
                userId
            }
        });

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status : 403});
        }
        const size = await db.size.create({
            data :{
                name,
                value,
                storeId : params.storeId
            }
        })


        return NextResponse.json(size);
    }
    catch(error){
        console.log('[SIZES_POST] : ', error)
        return new NextResponse("internal error",{ status: 500});
    }
}

export async function GET(req,{params}){

    try{
        if(!params.storeId){
            return new NextResponse("Store id is required",{ status: 400});
        }
       
        const sizes = await db.size.findMany({
            where :{
                storeId : params.storeId
            }
        })


        return NextResponse.json(sizes);
    }
    catch(error){
        console.log('[SIZES_GET] : ', error)
        return new NextResponse("internal error",{ status: 500});
    }
}