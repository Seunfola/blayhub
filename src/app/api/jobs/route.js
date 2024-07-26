import prisma from '@/utils/prisma';
import { authenticateToken } from '@/utils/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const category = url.searchParams.get('category');
        const jobType = url.searchParams.get('jobType');
        const industry = url.searchParams.get('industry');
        const minSalary = url.searchParams.get('minSalary');
        const maxSalary = url.searchParams.get('maxSalary');
        const title = url.searchParams.get('title');

        const jobs = await prisma.job.findMany({
            where: {
                ...(category && { category }),
                ...(jobType && { jobType }),
                ...(industry && { industry }),
                ...(minSalary && maxSalary && {
                    salary: {
                        gte: parseInt(minSalary),
                        lte: parseInt(maxSalary),
                    },
                }),
                ...(title && {
                    OR: [
                        { title: { contains: title, mode: 'insensitive' } },
                        { description: { contains: title, mode: 'insensitive' } },
                    ],
                }),
            },
        });

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
    const { title, description, criteria, skills, yearsOfExperience, level, jobResponsibilities, country, salary, company, category, jobType, industry } = body;

    try {
        const job = await prisma.job.create({
            data: { title, description, criteria, skills, yearsOfExperience, level, jobResponsibilities, country, salary, company, category, jobType, industry },
        });
        return NextResponse.json(job, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
