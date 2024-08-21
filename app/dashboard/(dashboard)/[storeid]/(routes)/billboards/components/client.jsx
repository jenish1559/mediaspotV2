"use client"
import { useParams,useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import React from 'react'
import Heading from '@/app/dashboard/_components/heading'
import { LuPlus } from 'react-icons/lu'

const BillboardClient = () => {
    const router = useRouter();
    const params = useParams();
    
  return (
    <>
    <div className="flex items-center justify-between">
    <Heading title="Billboards (0)"
                    description="Manage billboards for your store" />

                <Button onClick={()=> Router.push(`/${params.storeId}/billboards/new`)}>
                    <LuPlus className="h-4 w-4" />
                    Add New
                </Button>
    </div>
    </>
  )
}

export default BillboardClient