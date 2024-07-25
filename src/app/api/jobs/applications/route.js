import prisma from '@/utils/prisma';
import { authenticateToken } from '@/utils/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
    return authenticateToken(req, async (req) => {
        const userId = req.user.id;

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { name: true, email: true }, 
            });

            const applications = await prisma.jobApplication.findMany({
                where: { userId },
                include: { job: true },
            });

            return NextResponse.json({ user, applications }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    });
}
