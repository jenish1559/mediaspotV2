import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server"
import { create } from "zustand";

export async function POST(req,{params}){

    try{
        console.log("POST METHOD");
        const user = await  currentUser();
        const body = await req.json();
        const { 
            name,
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
       

        if(!params.storeId){
            return new NextResponse("Store id is required",{ status: 400});
        }

        const storeByUserId = await db.store.findFirst({
            where : {
                id : params.storeId,
                userId
            }
        });

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status : 403});
        }
        const product = await db.product.create({
            data :{
                name,
                price,
                isArchived,
                isFeatured,
                categoryId,
                sizeId,
                colorId,
                storeId : params.storeId,
                images : {
                    createMany: {
                        data: [
                            ...images.map((image) => image)
                        ]
                    }
                }
            }
        })


        return NextResponse.json(product);
    }
    catch(error){
        console.log('[PRODUCTS_POST] : ', error)
        return new NextResponse("internal error",{ status: 500});
    }
}

export async function GET(req,{params}){

    try{
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const isFeatured = searchParams.get("isFeatured");
        const isArchived = searchParams.get("isArchived");
        
        if(!params.storeId){
            return new NextResponse("Store id is required",{ status: 400});
        }
       
        const products = await db.product.findMany({
            where :{
                storeId : params.storeId,
                categoryId,
                colorId,
                sizeId,
                isArchived: false,
                isFeatured: isFeatured ? true : undefined,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })


        return NextResponse.json(products);
    }
    catch(error){
        console.log('[PRODUCTS_GET] : ', error)
        return new NextResponse("internal error",{ status: 500});
    }
}