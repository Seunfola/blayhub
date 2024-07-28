import bcrypt from 'bcrypt';
import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail';

export async function POST(req) {
    const { name, email, password, age, country, state, city, language, specialization, ndaChecked } = await req.json();

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists with this email' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                age: parseInt(age, 10),
                country,
                state,
                city,
                language,
                specialization,
                ndaChecked,
            },
        });

        const signature = `
            <br><br>
            Best regards,<br>
            Blayhub Team<br>
            <a href="https://www.blayhub.com">www.blayhub.com</a><br>
            <a href="mailto:support@blayhub.com">support@blayhub.com</a>
        `;

        await sendEmail({
            to: email,
            subject: 'Welcome to Blayhub Consult',
            text: `Dear ${name},

Thank you for taking the time to join Blayhub Consult. We are thrilled to have you on board! Your decision to become a part of our community means a lot to us.

We appreciate the effort you put into the registration process, and we are excited to learn more about your background and skills. Our team is dedicated to supporting you and helping you achieve your goals.

If you have any questions or need assistance, please don't hesitate to reach out. We're here to help you every step of the way.

Thank you once again for choosing Blayhub Consult. We look forward to a successful journey together.

Best regards,
Blayhub Team
www.blayhub.com
support@blayhub.com`,
            html: `<p>Dear ${name},</p>
<p>Thank you for taking the time to join Blayhub Consult. We are thrilled to have you on board! Your decision to become a part of our community means a lot to us.</p>
<p>We appreciate the effort you put into the registration process, and we are excited to learn more about your background and skills. Our team is dedicated to supporting you and helping you achieve your goals.</p>
<p>If you have any questions or need assistance, please don't hesitate to reach out. We're here to help you every step of the way.</p>
<p>Thank you once again for choosing Blayhub Consult.</p> 
<p>We look forward to a successful journey together.</p>
<br>
<p>Thank you.</p>
${signature}`,
            
            replyTo: 'info.service@blayhub.com'
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'User already exists with this email' }, { status: 409 });
        }

        if (error.message && error.message.includes('Failed to send email')) {
            console.error('SendGrid error:', error.message);
            return NextResponse.json({ error: 'Failed to send confirmation email. Please try again later.' }, { status: 500 });
        }

        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'An error occurred while creating the user. Please try again.' }, { status: 500 });
    }
}
