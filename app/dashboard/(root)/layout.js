import { auth } from '@/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'

const SetupLayout = async ({children}) => {
    const {userId} = auth();

    if(!userId){
        redirect('auth/login')
    }

    const store = await db.store.findFirst({
        where : {
            userId
        }
    });
    
    if(store){
        redirect(`/${store.id}`);
    }
  return (
    <div>{children}</div>
  )
}


export default SetupLayout;