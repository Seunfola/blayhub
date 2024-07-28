import prisma from '@/utils/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail';

export async function POST(req) {
    try {
        const { token, newPassword } = await req.json();

        if (!token || !newPassword) {
            console.error('Token and new password are required');
            return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gte: new Date() }
            }
        });

        if (!user) {
            console.error('Invalid or expired token');
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null
            }
        });

        const signature = `
            <br><br>
            Best regards,<br>
            Blayhub Team<br>
            <a href="https://www.blayhub.com">www.blayhub.com</a><br>
            <a href="mailto:support@blayhub.com">support@blayhub.com</a>
        `;

        try {
            await sendEmail({
                to: user.email,
                subject: 'Password Reset Confirmation',
                text: 'Your password has been successfully reset.\n\nBest regards,\nBlayhub Team\nwww.blayhub.com\nsupport@blayhub.com',
                html: `<p>Your password has been successfully reset.</p>${signature}`,
                replyTo: 'support@blayhub.com' 
            });
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            return NextResponse.json({ error: emailError.message }, { status: 401 });
        }

        return NextResponse.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('An error occurred in reset-password-confirm:', error);
        return NextResponse.json({ error: 'An error occurred. Please try again.' }, { status: 500 });
    }
}
