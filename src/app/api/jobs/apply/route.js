import prisma from '@/utils/prisma';
import { authenticateToken } from '@/utils/auth';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail';

export async function POST(req) {
    try {
        const { name, phone, address, linkedin, github, coverLetter, resumeUrl, jobId } = await req.json();
        console.log('Received job application:', { name, phone, address, linkedin, github, coverLetter, resumeUrl, jobId });

        const user = await authenticateToken(req);

        if (!user || !user.email || !user.id) {
            console.error('User authentication failed or missing details.');
            return NextResponse.json({ error: 'User authentication failed or missing details.' }, { status: 401 });
        }

        const email = user.email;
        const userId = user.id;

        // Check if all fields are provided and log each field
        if (!name || !email || !phone || !address || !linkedin || !github || !coverLetter || !resumeUrl || !jobId) {
            console.error('All fields are required');
            console.log('Fields:', {
                name, email, phone, address, linkedin, github, coverLetter, resumeUrl, jobId, userId
            });
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // Ensure jobId is an integer
        const parsedJobId = parseInt(jobId, 10);
        if (isNaN(parsedJobId)) {
            console.error('Invalid jobId');
            return NextResponse.json({ error: 'Invalid jobId' }, { status: 400 });
        }

        // Check if the user has already applied for this job
        const existingApplication = await prisma.jobApplication.findFirst({
            where: {
                userId,
                jobId: parsedJobId,
            },
        });

        if (existingApplication) {
            return NextResponse.json({ error: 'You have already applied for this job' }, { status: 409 });
        }

        // Handle resumeUrl if it's a blob URL (this logic may need adjusting based on your needs)
        const validResumeUrl = resumeUrl.startsWith('blob:') ? '' : resumeUrl;

        // Create job application in the database
        const application = await prisma.jobApplication.create({
            data: {
                name,
                email,
                phone,
                address,
                linkedin,
                github,
                coverLetter,
                resumeUrl: validResumeUrl,
                jobId: parsedJobId,
                userId,
            },
        });

        const signature = `
            <br><br>
            Best regards,<br>
            Blayhub Team<br>
            <a href="https://www.blayhub.com">www.blayhub.com</a><br>
            <a href="mailto:support@blayhub.com">support@blayhub.com</a>
        `;

        // Send a notification email to the user
        await sendEmail({
            to: email,
            subject: 'Job Application Received',
            text: `Hello ${name}, your application for job ID ${parsedJobId} has been received.\n\nBest regards,\nBlayhub Team\nwww.blayhub.com\nsupport@blayhub.com`,
            html: `<strong>Hello ${name},</strong><br>Your application for job ID ${parsedJobId} has been received.<br>The hiring team is reviewing your application and will get back to you soon.${signature}`,
        });

        console.log('Email sent to:', email);

        return NextResponse.json(application, { status: 201 });
    } catch (error) {
        console.error('Error creating job application:', error);

        if (error.message && error.message.includes('Failed to send email')) {
            // SendGrid error
            console.error('SendGrid error:', error.message);
            return NextResponse.json({ error: 'Failed to send notification email. Please try again later.' }, { status: 500 });
        }

        return NextResponse.json({ error: 'An error occurred while processing your application. Please try again.' }, { status: 500 });
    }
}
