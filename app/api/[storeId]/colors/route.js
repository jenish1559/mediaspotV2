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
        
        const color = await db.color.create({
            data :{
                name,
                value,
                storeId : params.storeId
            }
        })


        return NextResponse.json(color);
    }
    catch(error){
        console.log('[COLORS_POST] : ', error)
        return new NextResponse("internal error",{ status: 500});
    }
}

export async function GET(req,{params}){

    try{
        if(!params.storeId){
            return new NextResponse("Store id is required",{ status: 400});
        }
       
        const colors = await db.color.findMany({
            where :{
                storeId : params.storeId
            }
        })


        return NextResponse.json(colors);
    }
    catch(error){
        console.log('[COLORS_GET] : ', error)
        return new NextResponse("internal error",{ status: 500});
    }
}