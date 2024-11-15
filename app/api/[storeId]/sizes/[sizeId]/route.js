import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
    try {

        if (!params.sizeId) {
            return new NextResponse("Size id is required", { status: 400 })
        }
      
        const size = await db.size.findUnique({
            where: {
                id: params.sizeId,
            },

        })

        return NextResponse.json(size)
    }
    catch (error) {
        console.log('[SIZE_GET]', error);
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

        if (!params.sizeId) {
            return new NextResponse("Size id is required", { status: 400 });
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

        const size = await db.size.updateMany({
            where: {
                id: params.sizeId,
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(size)
    }
    catch (error) {
        console.log('[SIZE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req, { params }) {

    try {
        const user = await currentUser();

        if (!user.id) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.sizeId) {
            return new NextResponse("Size id is required", { status: 400 })
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
        
        const size = await db.size.deleteMany({
            where: {
                id: params.sizeId,
            },

        })

        return NextResponse.json(size)
    }
    catch (error) {
        console.log('[SIZE_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}
