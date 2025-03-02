import { db } from '@/lib/db'

export const  getStockCount = async (storeId) => {
    const stockCount = await db.product.count({
        where : { 
            storeId,
            isArchived: false,
        }
    });

   
  return stockCount
}

