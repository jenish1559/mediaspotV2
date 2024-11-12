import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
    try {

        if (!params.colorId) {
            return new NextResponse("Color id is required", { status: 400 })
        }
      
        const color = await db.color.findUnique({
            where: {
                id: params.colorId,
            },

        })

        return NextResponse.json(color)
    }
    catch (error) {
        console.log('[COLOR_GET]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(req, { params }) {

    try {
        const user = await currentUser();
        const body = await req.json();
        const { name, value } = body;

        if (!user.id) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!value) {
            return new NextResponse("Value is required", { status: 400 });
        }

        if (!params.colorId) {
            return new NextResponse("Color id is required", { status: 400 });
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

        const color = await db.color.updateMany({
            where: {
                id: params.colorId,
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(color)
    }
    catch (error) {
        console.log('[COLOR_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req, { params }) {

    try {
        const user = await currentUser();

        if (!user.id) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.colorId) {
            return new NextResponse("Color id is required", { status: 400 })
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
        
        const color = await db.color.deleteMany({
            where: {
                id: params.colorId,
            },

        })

        return NextResponse.json(color)
    }
    catch (error) {
        console.log('[COLOR_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}
