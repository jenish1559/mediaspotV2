"use client"
import CellAction from './cell-action'

export const columns= [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard",
    cell : ({row}) => row.original.billboardLabel
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell : ({row}) => <CellAction data={row.original}/>
  }
]
