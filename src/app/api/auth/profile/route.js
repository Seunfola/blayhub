import prisma from '@/utils/prisma';
import { authenticateToken } from '@/utils/auth';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail';

export async function PUT(req) {
    try {
        const user = await authenticateToken(req);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name, age, country, state, city, language, specialization, about, skills, experiences } = await req.json();

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                name,
                age: parseInt(age, 10),
                country,
                state,
                city,
                language,
                specialization,
                about,
                skills
            },
        });

        if (experiences) {
            // Clear existing experiences and add new ones
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

        // Send email notification
        const signature = `
            <br><br>
            Best regards,<br>
            Blayhub Team<br>
            <a href="https://www.blayhub.com">www.blayhub.com</a><br>
            <a href="mailto:support@blayhub.com">support@blayhub.com</a>
        `;

        await sendEmail({
            to: updatedUser.email,
            subject: 'Profile Updated Successfully',
            text: `Dear ${updatedUser.name},

Your profile has been successfully updated.

If you have any questions or need further assistance, please don't hesitate to contact us.

Thank you for being a part of Blayhub Consult.

Best regards,
Blayhub Team
www.blayhub.com
support@blayhub.com`,
            html: `<p>Dear ${updatedUser.name},</p>
<p>Your profile has been successfully updated.</p>
<p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
<p>Thank you for being a part of Blayhub Consult.</p>
${signature}`,
            replyTo: 'info.support@blayhub.com'
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
