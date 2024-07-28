import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/sendEmail';

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

export async function POST(req) {
    try {
        const { name, phone, address, linkedin, github, coverLetter, resumeUrl, jobId } = await req.json();
        console.log('Received job application:', { name, phone, address, linkedin, github, coverLetter, resumeUrl, jobId });

        // Ensure the request is authenticated
        const authHeader = req.headers.get('authorization');
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            console.error('No token provided');
            return NextResponse.json({ error: 'No token provided' }, { status: 401 });
        }

        const user = jwt.verify(token, JWT_SECRET);

        if (!user || !user.email || !user.id) {
            console.error('User authentication failed or missing details.');
            return NextResponse.json({ error: 'User authentication failed or missing details.' }, { status: 401 });
        }

        const email = user.email;
        const userId = user.id;

        // Check if mandatory fields are provided
        if (!name || !email || !phone) {
            console.error('Name, email, and phone are required');
            console.log('Fields:', { name, email, phone, address, linkedin, github, coverLetter, resumeUrl, jobId, userId });
            return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
        }

        // Ensure jobId is an integer
        const parsedJobId = parseInt(jobId, 10);
        if (isNaN(parsedJobId)) {
            console.error('Invalid jobId');
            return NextResponse.json({ error: 'Invalid jobId' }, { status: 400 });
        }

        // Fetch job details to get the job title
        const job = await prisma.job.findUnique({
            where: { id: parsedJobId },
        });

        if (!job) {
            console.error('Job not found');
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        const jobTitle = job.title;

        // Check if the user has already applied for this job
        const existingApplication = await prisma.jobApplication.findFirst({
            where: { userId, jobId: parsedJobId },
        });

        if (existingApplication) {
            return NextResponse.json({ error: 'You have already applied for this job' }, { status: 409 });
        }

        // Handle resumeUrl if it's a blob URL
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
            text: `Dear ${name},

Thank you for applying for the position of ${jobTitle} at Blayhub Consult. We appreciate the time and effort you put into your application.

Our hiring team is currently reviewing your submission, and we will get back to you as soon as possible with an update on the status of your application.

If you have any questions in the meantime, please feel free to reach out to us.

Thank you once again for your interest in joining our team.

Best regards,
Blayhub Team
www.blayhub.com
support@blayhub.com`,
            html: `<p>Dear ${name},</p>
<p>Thank you for applying for the position of ${jobTitle} at Blayhub Consult. We appreciate the time and effort you put into your application.</p>
<p>Our hiring team is currently reviewing your submission, and we will get back to you as soon as possible with an update on the status of your application.</p>
<p>If you have any questions in the meantime, please feel free to reach out to us.</p>
<p>Thank you once again for your interest in joining our team.</p>
${signature}`,
            replyTo: 'info.support@blayhub.com'
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
