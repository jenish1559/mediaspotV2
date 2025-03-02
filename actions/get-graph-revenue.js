import { db } from '@/lib/db'

export const  getGraphRevenue = async (storeId) => {
    const paidOrders = await db.order.findMany({
        where : { 
            storeId,
            isPaid: true,
        },
        include: {
            orderItems:{
                include:{
                    product: true
                }
            }
        }
    });


    const montlyRevenue = {}

    for(const order of paidOrders){
        const month = order.createdAt.getMonth();
        let revenueForOrder = 0;

        for(const item of order.orderItems){
            revenueForOrder += item.product.price.toNumber();
        }

        montlyRevenue[month] =  (montlyRevenue[month] || 0 ) + revenueForOrder;
    }
   
   const graphData = [
     {name:"Jan",total: 0},
     {name:"Feb",total: 0},
     {name:"Mar",total: 0},
     {name:"Apr",total: 0},
     {name:"Nay",total: 0},
     {name:"Jun",total: 0},
     {name:"Jul",total: 0},
     {name:"Aug",total: 0},
     {name:"Sep",total: 0},
     {name:"Oct",total: 0},
     {name:"Nov",total: 0},
     {name:"Dec",total: 0},
   ];

   for(const month in montlyRevenue ){
    graphData[parseInt(month)].total = montlyRevenue[parseInt(month)];
   }

   return graphData;
}

