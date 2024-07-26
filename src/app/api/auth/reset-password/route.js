import prisma from '@/utils/prisma';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '@/utils/sendEmail';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { email } = await req.json();
        console.log('Received email:', email);

        if (!email) {
            console.error('Email is required');
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        console.log('User found:', user);

        if (!user) {
            console.error('User not found');
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const token = uuidv4();
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 1); 
        console.log('Generated token:', token, 'Expiry:', expiry);

        await prisma.user.update({
            where: { email },
            data: {
                resetToken: token,
                resetTokenExpiry: expiry,
            },
        });
        console.log('User updated with reset token');

        const resetUrl = `http://localhost:3000/dashboard/reset-password-confirm?token=${token}`;
        console.log('Reset URL:', resetUrl);

        const signature = `
            <br><br>
            Best regards,<br>
            Blayhub Team<br>
            <a href="https://www.blayhub.com">www.blayhub.com</a><br>
            <a href="mailto:support@blayhub.com">support@blayhub.com</a>
        `;

        await sendEmail({
            to: email,
            subject: 'Password Reset',
            text: `You requested a password reset. Click the link to reset your password: ${resetUrl}\n\nBest regards,\nBlayhub Team\nwww.blayhub.com\nsupport@blayhub.com`,
            html: `<p>You requested a password reset. Click the link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>${signature}`,
        });
        console.log('Email sent to:', email);

        return NextResponse.json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('An error occurred in reset-password:', error);
        return NextResponse.json({ error: 'An error occurred. Please try again.' }, { status: 500 });
    }
}
