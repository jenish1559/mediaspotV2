import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
 
export async function PATCH(req,{params}) {

  try{
    const user = await  currentUser();
    const body = await req.json();
    const {name} = body;

    if(!user.id){
        return new NextResponse("Unauthenticated",{status:401});
    }
    if(!name){
        return new NextResponse("Name id is required",{status:400})
    }
    if(!params.storeId){
        return new NextResponse("Store id is required",{status: 400})
    }
    const userId = user.id;
    const store = await db.store.updateMany({
            where :{
                id: params.storeId,
                userId,
            },
            data:{
                name
            }
    })

    return NextResponse.json(store)
  }
  catch(error){
    console.log('[STORE_PATCH]',error);
    return new NextResponse("Internal error",{status:500})
  }
}

export async function DELETE(req,{params}) {

    try{
      const user = await  currentUser();
  
      if(!user.id){
          return new NextResponse("Unauthenticated",{status:401});
      }
   
      if(!params.storeId){
          return new NextResponse("Store id is required",{status: 400})
      }

      const userId = user.id; 
      const store = await db.store.deleteMany({
              where :{
                  id: params.storeId,
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
