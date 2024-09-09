import { db } from "@/lib/db";
import CategoryClient from "./components/client"
import { format } from "date-fns"

const CategoriesPage = async ({params}) => {

  const categories = await db.Category.findMany({
    where : {
      storeId : params.storeId
    },
    include :{
      billboard: true,
    },
    orderBy : {
      createdAt : 'desc'
    }
  });

  const formattedCategories  = categories.map((item) => ({
    id : item.id,
    name : item.name,
    billboardLabel : item.billboardLabel,
    createdAt : format(item.createdAt, "MMM dd, yyyy" )
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories}/>
      </div>
    </div>
  )
}

export default CategoriesPage;
