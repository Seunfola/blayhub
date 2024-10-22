import prisma from '@/utils/prisma';
import { authenticateToken } from '@/utils/auth'; // Ensure this path is correct
import { NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const category = url.searchParams.get('category');
        const jobType = url.searchParams.get('jobType');
        const workmode = url.searchParams.get('workmode');
        const minSalary = url.searchParams.get('minSalary');
        const maxSalary = url.searchParams.get('maxSalary');
        const title = url.searchParams.get('title');
        const sort = url.searchParams.get('sort');

        const jobs = await prisma.job.findMany({
            where: {
                ...(category && { category }),
                ...(jobType && { jobType }),
                ...(workmode && { workmode }),
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
            orderBy: {
                updatedAt: sort === 'newest' ? 'desc' : 'asc',
            },
        });

        return NextResponse.json(jobs, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    return authenticateToken(req, async (req) => {
        const {
            title,
            description,
            criteria,
            skills,
            yearsOfExperience,
            level,
            jobResponsibilities,
            country,
            salary,
            company,
            category,
            jobType,
            industry,
            workmode,
        } = await req.json();

        try {
            const employer = await prisma.employer.findUnique({
                where: { userId: parseInt(req.user.id) },
            });

            if (!employer) {
                return NextResponse.json({ error: 'Employer not found' }, { status: 404 });
            }

            const job = await prisma.job.create({
                data: {
                    title,
                    description,
                    criteria,
                    skills,
                    yearsOfExperience,
                    level,
                    jobResponsibilities,
                    country,
                    salary,
                    company,
                    category,
                    jobType,
                    industry,
                    workmode,
                    employerId: employer.id,
                },
            });

            return NextResponse.json(job, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    });
}
