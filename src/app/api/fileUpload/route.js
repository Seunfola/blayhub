import { createUploadthing } from 'uploadthing/next';
import { NextResponse } from 'next/server';
import { validateUser } from '../auth/session/route';

const f = createUploadthing();

const auth = async (req) => {
    try {
        const user = await validateUser(req);
        return user;
    } catch (error) {
        throw new Error('Authentication failed: ' + error.message);
    }
};

const ourFileRouter = {
    documentUpload: f([
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ])
        .middleware(async ({ req }) => {
            const user = await auth(req);
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata }) => {
            console.log('Uploaded by user', metadata.userId);
        }),
};

export const OurFileRouter = ourFileRouter;

export async function POST(req) {
    try {
        const body = await req.json();
        const { route, files } = body;

        if (!ourFileRouter[route]) {
            return NextResponse.json({ error: 'Invalid route' }, { status: 400 });
        }

        const data = await ourFileRouter[route].handleUpload({ req, files });
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
