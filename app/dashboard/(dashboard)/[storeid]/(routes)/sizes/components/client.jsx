"use client"
import { useParams,useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import React from 'react'
import Heading from '@/app/dashboard/_components/heading'
import { LuPlus } from 'react-icons/lu'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import ApiList from './api-list'

const SizesClient = ({data}) => {
    const router = useRouter();
    const params = useParams();
  return (
    <>
    <div className="flex items-center justify-between">
    <Heading title={`Sizes (${data.length})`}
                    description="Add a new size." />

                <Button onClick={()=> router.push(`/dashboard/${params.storeid}/sizes/new`)}>
                    <LuPlus className="h-4 w-4" />
                    Add New
                </Button>
    </div>
    <Separator/>
    <DataTable columns={columns} data={data} searchKey="name"/>
    <Heading title="API" description="API calls for Size" />
    <Separator />
    <ApiList entityName="sizes" entityIdName="sizeId"/>
    </>
  )
}

export default SizesClient