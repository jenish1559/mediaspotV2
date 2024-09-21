import { db } from '@/lib/db';
import React from 'react'
import SizeForm from './components/size-form'; 

const SizePage = async ({params}) => {
    const size = await db.size.findUnique({
        where : {id : params.sizeId}
    })
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
         <SizeForm initialData={size}/>
        </div>
    </div>
  )
}

export default SizePage;
