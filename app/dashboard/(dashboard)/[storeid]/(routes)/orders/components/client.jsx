"use client"
import React from 'react'
import Heading from '@/app/dashboard/_components/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'

const OrderClient = ({data}) => {
    
  return (
    <>
    <Heading title={`Orders (${data.length})`}
                    description="Manage orders for your store" />
    <Separator/>
    <DataTable columns={columns} data={data} searchKey="products"/>
    </>
  )
}

export default OrderClient