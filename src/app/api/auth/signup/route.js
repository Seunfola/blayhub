import bcrypt from 'bcrypt';
import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
    const { name, email, password, age, country, state, city, language, specialization, ndaChecked } = await req.json();

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
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
                ndaChecked
            },
        });

        const msg = {
            to: email, 
            from: 'blay.1@gmail.com',
            subject: 'Welcome to Our Service',
            text: `Hello ${name}, thank you for signing up with blayhub consult, welcome to our service!`,
            html: `<strong>Hello ${name}, welcome to our service!, Thank you for taking your rime to signup up with us.</strong>`,
        };

        await sgMail.send(msg);

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
