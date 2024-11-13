import { db } from '@/lib/db';
import React from 'react'
import ProductForm from './components/product-form';

const ProductPage = async ({params}) => {
    const product = await db.product.findUnique({
        where : { id : params.productId},
        include: {
          images: true
        }
    })

    const categories = await db.category.findMany({
        where : { storeId : params.storId },
    })

    const sizes = await db.size.findMany({
      where : { storeId : params.storId },
    })

    const colors = await db.color.findMany({
      where : { storeId : params.storId },
    })

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
         <ProductForm categories={categories} sizes={sizes} colors={colors}  initialData={product}/>
        </div>
    </div>
  )
}

export default ProductPage;
