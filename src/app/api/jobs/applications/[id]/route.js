import prisma from '@/utils/prisma';
import { authenticateToken } from '@/utils/auth';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    return authenticateToken(req, async (req) => {
        const userId = req.user.id;
        const applicationId = parseInt(params.id);

        try {
            const application = await prisma.jobApplication.findUnique({
                where: { id: applicationId },
            });

            if (!application || application.userId !== userId) {
                return NextResponse.json({ error: 'Application not found or not authorized' }, { status: 404 });
            }

            await prisma.jobApplication.delete({
                where: { id: applicationId },
            });

            return NextResponse.json({ message: 'Application deleted successfully' }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    });
}
