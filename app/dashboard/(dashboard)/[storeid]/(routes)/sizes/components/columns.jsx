"use client"
import CellAction from './cell-action'



export const columns= [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    id: "actions",
    cell : ({row}) => <CellAction data={row.original}/>
  }
]
