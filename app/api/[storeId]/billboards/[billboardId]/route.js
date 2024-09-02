import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {

    try {

        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 })
        }
      
        const billboard = await db.billboard.findUnique({
            where: {
                id: params.storeId,
            },

        })

        return new NextResponse.json(billboard)
    }
    catch (error) {
        console.log('[BILLBOARD_GET]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function PATCH(req, { params }) {

    try {
        const user = await currentUser();
        const body = await req.json();
        const { label, imageUrl } = body;

        if (!user.id) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!label) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
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

        const billboard = await db.billboard.updateMany({
            where: {
                id: params.billboardId,
            },
            data: {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard)
    }
    catch (error) {
        console.log('[BILLBOARD_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(req, { params }) {

    try {
        const user = await currentUser();

        if (!user.id) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 })
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
        const billboard = await db.billboard.deleteMany({
            where: {
                id: params.storeId,
            },

        })

        return new NextResponse.json(billboard)
    }
    catch (error) {
        console.log('[BILLBOARD_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 })
    }
}
