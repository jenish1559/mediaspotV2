"use client"
import * as z from 'zod'
import { ColumnDef } from "@tanstack/react-table"
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
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell : () => <CellAction/>
  }
]