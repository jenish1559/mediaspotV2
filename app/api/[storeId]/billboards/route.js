import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(req,{params}){

    try{
        console.log("POST METHOD");
        const user = await  currentUser();
        const body = await req.json();
        const { label, imageUrl } = body;
        const userId = user.id;
        
        if(!userId){
            return new NextResponse("Unauthenticated", { status:401 });
        }

        if(!label){
            return new NextResponse("Name is required",{ status: 400});
        }

        if(!imageUrl){
            return new NextResponse("Name is required",{ status: 400});
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
        const billboard = await db.billboard.create({
            data :{
                label,
                imageUrl,
                storeId : params.storeId
            }
        })


        return NextResponse.json(billboard);
    }
    catch(error){
        console.log('[BILLBOARDS_POST] : ', error)
        return new NextResponse("internal error",{ status: 500});
    }
}

export async function GET(req,{params}){

    try{
        if(!params.storeId){
            return new NextResponse("Store id is required",{ status: 400});
        }
       
        const billboards = await db.billboard.findMany({
            where :{
                storeId : params.storeId
            }
        })


        return NextResponse.json(billboards);
    }
    catch(error){
        console.log('[BILLBOARDS_GET] : ', error)
        return new NextResponse("internal error",{ status: 500});
    }
}