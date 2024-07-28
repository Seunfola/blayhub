import { NextResponse } from 'next/server';
import {sendEmail} from '@/utils/sendEmail';

export async function POST(req) {
    try {
        const { to, subject, text } = await req.json();

        if (!to || !subject || !text) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await sendEmail(to, subject, text);
        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error in send-email API:', error); // Log detailed error
        return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Use POST to send email' }, { status: 405 });
}