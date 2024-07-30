import prisma from '@/utils/prisma';
import { authenticateToken } from '@/utils/auth';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    try {
        const user = await authenticateToken(req);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name, age, country, state, city, language, specialization, about, skills, experiences } = await req.json();

        const existingUser = await prisma.user.findUnique({
            where: { id: user.id },
        });

        const updatedUserData = {
            name: name ?? existingUser.name,
            age: age ? parseInt(age, 10) : existingUser.age,
            country: country ?? existingUser.country,
            state: state ?? existingUser.state,
            city: city ?? existingUser.city,
            language: language ?? existingUser.language,
            specialization: specialization ?? existingUser.specialization,
            about: about ?? existingUser.about,
            skills: skills ?? existingUser.skills,
        };

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: updatedUserData,
        });

        if (experiences) {
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
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
