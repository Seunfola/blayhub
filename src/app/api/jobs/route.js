import prisma from '@/utils/prisma';
import { authenticateToken } from '@/utils/auth';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const jobs = await prisma.job.findMany();
        return NextResponse.json(jobs, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    const authResult = await authenticateToken(req);

    if (authResult.status !== 200) {
        return authResult;
    }

    const body = await req.json();
    const { title, description, criteria, skills, yearsOfExperience, level, jobResponsibilities, location, salary, company, category } = body;

    try {
        const job = await prisma.job.create({
            data: { title, description, criteria, skills, yearsOfExperience, level, jobResponsibilities, location, salary, company, category },
        });
        return NextResponse.json(job, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}