import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

export async function GET(req) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return NextResponse.json({ error: 'No token provided' }, { status: 401 });

        const user = jwt.verify(token, JWT_SECRET);

        if (!user || !user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userData = await prisma.user.findUnique({
            where: { id: user.id },
            include: {
                jobApplications: {
                    include: {
                        job: true,
                    },
                },
                experiences: true,
            },
        });

        if (!userData) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(userData);
    } catch (error) {
        console.error('Error fetching profile data:', error);
        return NextResponse.json({ error: 'Failed to fetch profile data' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const authHeader = req.headers.get('authorization');
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return NextResponse.json({ error: 'No token provided' }, { status: 401 });

        const user = jwt.verify(token, JWT_SECRET);

        if (!user || !user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        const { about, skills, experiences } = data;

        const updateData = {};
        if (about !== undefined) updateData.about = about;
        if (skills !== undefined) updateData.skills = skills;

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: updateData,
        });

        if (experiences !== undefined) {
            await prisma.experience.deleteMany({ where: { userId: user.id } });
            await prisma.experience.createMany({
                data: experiences.map(exp => ({
                    userId: user.id,
                    title: exp.title,
                    company: exp.company,
                    startDate: new Date(exp.startDate),
                    endDate: exp.endDate ? new Date(exp.endDate) : null,
                    description: exp.description
                }))
            });
        }

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile data:', error);
        return NextResponse.json({ error: 'Failed to update profile data' }, { status: 500 });
    }
}
