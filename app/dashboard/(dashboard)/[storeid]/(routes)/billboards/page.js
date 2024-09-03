import { db } from "@/lib/db";
import BillboardClient from "./components/client"
import { Billboarscolumn } from "./components/columns"
import { format } from "date-fns"

const BillbooardsPage = async ({params}) => {

  const billboards = await db.billboard.findMany({
    where : {
      storeId : params.storeId
    },
    orderBy : {
      createdAt : 'desc'
    }
  });

  const formattedBillboards  = billboards.map((item) => ({
    id : item.id,
    label : item.label,
    createdAt : format(item.createdAt, "MMM dd, yyyy" )
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards}/>
      </div>
    </div>
  )
}

export default BillbooardsPage;
