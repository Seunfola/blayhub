import prisma from '@/utils/prisma';
import { authenticateToken } from '@/utils/auth';
import { NextResponse } from 'next/server';
import {sgMail} from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
    return authenticateToken(req, async (req) => {
        const { name, phone, address, linkedin, github, coverLetter, resumeUrl, jobId } = await req.json();
        const user = req.user; 
        const email = user.email; 

        try {
            const application = await prisma.jobApplication.create({
                data: {
                    name,
                    email,
                    phone,
                    address,
                    linkedin,
                    github,
                    coverLetter,
                    resumeUrl,
                    jobId: parseInt(jobId, 10),
                    userId: user.id,
                },
            });

            const msg = {
                to: email,
                from: 'blay.1@gmail.com', 
                subject: 'Job Application Received',
                text: `Hello ${name}, your application for job ID ${jobId} has been received.`,
                html: `<strong>Hello ${name},</strong><br>Your application for job ID ${jobId} has been received.<br>We will review your application and get back to you soon.`,
            };

            await sgMail.send(msg);

            return NextResponse.json(application, { status: 201 });
        } catch (error) {
            console.error('Error creating job application:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    });
}
