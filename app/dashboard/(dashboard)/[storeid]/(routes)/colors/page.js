import { db } from "@/lib/db";
import { format } from "date-fns"
import ColorsClient from "./components/client";

const ColorsPage = async ({params}) => {

  const colors = await db.color.findMany({
    where : {
      storeId : params.storeId
    },
    orderBy : {
      createdAt : 'desc'
    }
  });

  const formattedColors = colors.map((item) => ({
    id : item.id,
    name : item.name,
    value : item.value,
    createdAt : format(item.createdAt, "MMM dd, yyyy" )
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors}/>
      </div>
    </div>
  )
}

export default ColorsPage;
