import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req){
    const body = await req.text();
    const signature = headers().get("Stripe-Signature");

    let event;

    try{
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    }
    catch(error){
        return new NextResponse(`webhook Error : ${error}`, {status: 400})
    }

    const session = event.data.object;
    const address = session?.customer_details?.address;

    const addressComponent = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country,
    ];

    const addressString = addressComponent.filter((c)=> c !== null).join(', ');
    
    if(event.type === "checkout.session.completed"){
        console.log("EVENT :" , event);
        console.log("Session :" , session);
        const order = await db.order.update({
            where:{
                id : session?.metadata?.orderId,
            },
            data: {
                isPaid: true,
                address: addressString,
                phone: session?.customer_details?.phone || '',
            },
            include: {
                orderItems : true
            }
        });

        const productIds = order.orderItems.map((orderItem) => orderItem.productId);

        await db.product.updateMany({
            where : {
                id: {
                    in: [...productIds]
                },
            },
            data: {
                isArchived: true
            }
        });

    }

  return new NextResponse(null, {status: 200});
}

