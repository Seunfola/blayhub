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

        // Send a welcome email
        await sendEmail({
            to: email,
            subject: 'Welcome to Our Service',
            text: `Hello ${name}, thank you for signing up with Blayhub Consult, welcome to our service!\n\nBest regards,\nBlayhub Team\nwww.blayhub.com\nsupport@blayhub.com`,
            html: `<strong>Hello ${name}, welcome to our service! Thank you for taking your time to sign up with us.</strong>${signature}`,
            replyTo: 'support@blayhub.com' // Ensure replyTo is properly set
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
