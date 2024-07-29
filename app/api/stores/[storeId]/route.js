import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
 
export async function PATCH(req,{params}) {

  try{
    const user = await auth();
    console.log("user:" ,user)
    const userId = user.id
    const body = await req.json();
    console.log("2")
    const {name} = body;
    console.log("3")

    if(!userId){
      console.log("userId : ",userId)

        return new NextResponse("Unauthenticated",{status:401});
    }
    console.log("4")
    if(!name){
        return new NextResponse("Name id is required",{status:400})
    }
    console.log("5")
    if(!params.storeid){
        return new NextResponse("Store id is required",{status: 400})
    }
    console.log("6")
   
    console.log("userId:" ,userId)
    const store = await db.store.updateMany({
            where :{
                id: params.storeid,
                userId,
            },
            data:{
                name
            }
    })

    return new NextResponse.json(store)
  }
  catch(error){
    console.log('[STORE_PATCH]',error);
    return new NextResponse("Internal error",{status:500})
  }
}

export async function DELETE(req,{params}) {

    try{
      const user = await auth();
  
      if(!user.Id){
          return new NextResponse("Unauthenticated",{status:401});
      }
   
      if(!params.storeid){
          return new NextResponse("Store id is required",{status: 400})
      }

      const userId = user.Id; 
      const store = await db.store.deleteMany({
              where :{
                  id: params.storeid,
                  userId,
              },
             
      })
  
      return new NextResponse.json(store)
    }
    catch(error){
      console.log('[STORE_DELETE]',error);
      return new NextResponse("Internal error",{status:500})
    }
  }
