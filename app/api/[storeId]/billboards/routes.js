import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(req){

    try{
        const user = await  currentUser();
        const body = await req.json();
        const { name } = body;
        const userId = user.id;
        
        if(!userId){
            return new NextResponse("Unauthorized", { status:401 });
        }

        if(!name){
            return new NextResponse("Name is required",{ status: 400});
        }

        const store = await db.store.create({
            data :{
                name,
                userId,
            }
        })


        return NextResponse.json(store);
    }
    catch(error){
        console.log('[STORE_POST] : ', error)
        return new NextResponse("internal error",{ status: 500});
    }
}