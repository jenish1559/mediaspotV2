import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { create } from 'zustand';


export async function GET(req, { params }) {
    try {

        if (!params.productId) {
            return new NextResponse("Product id is required", { status: 400 })
        }
      
        const product = await db.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
        })

        return NextResponse.json(product)
    }
    catch (error) {
        console.log('[PRODUCT_GET]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(req, { params }) {
    try {
        const user = await currentUser();
        const body = await req.json();
        const {  name,
            price,
            categoryId,
            sizeId,
            colorId,
            images,
            isFeatured,
            isArchived
         } = body;
         const userId = user.id;

         
         if(!userId){
            return new NextResponse("Unauthenticated", { status:401 });
        }

        if(!name){
            return new NextResponse("Name is required",{ status: 400});
        }

        if(!images || !images.length){
            return new NextResponse("Images are required",{ status: 400});
        }

        if(!categoryId){
            return new NextResponse("Category id is required",{ status: 400});
        }

        if(!sizeId){
            return new NextResponse("Size id is required",{ status: 400});
        }

        if(!colorId){
            return new NextResponse("Color id is required",{ status: 400});
        }

        if(!params.productId){
            return new NextResponse("Product id is required",{ status: 400});
        }
       
       

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await db.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                price,
                categoryId,
                sizeId,
                colorId,
                images: {
                    deleteMany: {}
                },
                isFeatured,
                isArchived
            }
        })

        const product = await db.product.update({
            where: {
                id: params.productId,
            },
            data : {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image) => image),
                        ]
                    }
                }
            }
        })
        return NextResponse.json(product)
    }
    catch (error) {
        console.log('[PRODUCT_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req, { params }) {

    try {
        const user = await currentUser();

        if (!user.id) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.productId) {
            return new NextResponse("Product id is required", { status: 400 })
        }
        const userId = user.id;
        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }
        
        const product = await db.product.deleteMany({
            where: {
                id: params.productId,
            },

        })

        return NextResponse.json(product)
    }
    catch (error) {
        console.log('[PRODUCT_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}
