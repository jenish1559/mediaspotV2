import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import React from 'react'

export async function PATCH(req,{params}) {

  try{
    const user = await auth();
    
    const body = await req.json();

    const {name} = body;

    if(!user.Id){
        return NextResponse("Unauthenticated",{status:401});
    }

    if(!name){
        return NextResponse("Name id is required",{status:400})
    }

    if(!params.storeid){
        return NextResponse("Store id is required",{status: 400})
    }
    const userId = user.Id;
    const store = await db.store.updateMany({
            where :{
                id: params.storeid,
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
    return NextResponse("Internal error",{status:500})
  }
}

export async function DELETE(req,{params}) {

    try{
      const user = await auth();
      
      const body = await req.json();
  
      
  
      if(!user.Id){
          return NextResponse("Unauthenticated",{status:401});
      }
  
      if(!name){
          return NextResponse("Name id is required",{status:400})
      }
  
      if(!params.storeid){
          return NextResponse("Store id is required",{status: 400})
      }
      const userId = user.Id;
      const store = await db.store.updateMany({
              where :{
                  id: params.storeid,
                  userId,
              },
              data:{
                  name
              }
      })
  
      return NextResponse.json(store)
    }
    catch(error){
      console.log('[STORE_DELETE]',error);
      return NextResponse("Internal error",{status:500})
    }
  }
