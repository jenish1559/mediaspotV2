"use client"
import CellAction from './cell-action'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type BillboarColumn = {
//   id: string
//   label: string
//   createdAt : string
// }

export const columns= [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "BillboardLabel",
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
