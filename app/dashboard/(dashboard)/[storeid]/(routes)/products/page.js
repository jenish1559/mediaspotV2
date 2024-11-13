import { db } from "@/lib/db";
import ProductClient from "./components/client"
import { format } from "date-fns"
import { formatter } from "@/lib/utils";

const ProductsPage = async ({params}) => {

  const products = await db.product.findMany({
    where : {
      storeId : params.storeId
    },
    include: {
      category: true,
      size: true,
      color: true
    },
    orderBy : {
      createdAt : 'desc'
    }
  });

  console.log(products);
  const formattedProducts = products.map((item) => ({
    id : item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category : item.category.name,
    size : item.size.name,
    color: item.color.value,
    createdAt : format(item.createdAt, "MMM dd, yyyy" )
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts}/>
      </div>
    </div>
  )
}

export default ProductsPage;
