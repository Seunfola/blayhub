import prisma from '@/utils/prisma';
import { authenticateToken } from '@/utils/auth';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    return authenticateToken(req, async (req) => {
        const userId = req.user.id;
        const jobId = parseInt(params.jobId);

        try {
            const application = await prisma.jobApplication.findFirst({
                where: {
                    userId,
                    jobId,
                },
            });

            return NextResponse.json({ applied: !!application }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    });
}
