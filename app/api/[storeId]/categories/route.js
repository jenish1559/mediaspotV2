import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(req,{params}){

    try{
        console.log("POST METHOD");
        const user = await  currentUser();
        const body = await req.json();
        const { name, billboardId } = body;
        const userId = user.id;
        
        if(!userId){
            return new NextResponse("Unauthenticated", { status:401 });
        }

        if(!name){
            return new NextResponse("Name is required",{ status: 400});
        }

        if(!billboardId){
            return new NextResponse("Billboard id is required",{ status: 400});
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
        const category = await db.category.create({
            data :{
                name,
                billboardId,
                storeId : params.storeId
            }
        })


        return NextResponse.json(category);
    }
    catch(error){
        console.log('[CATEGORY_POST] : ', error)
        return new NextResponse("internal error",{ status: 500});
    }
}

export async function GET(req,{params}){

    try{
        if(!params.storeId){
            return new NextResponse("Store id is required",{ status: 400});
        }
       
        const categories = await db.category.findMany({
            where :{
                storeId : params.storeId
            }
        })


        return NextResponse.json(categories);
    }
    catch(error){
        console.log('[CATEGORY_GET] : ', error)
        return new NextResponse("internal error",{ status: 500});
    }
}