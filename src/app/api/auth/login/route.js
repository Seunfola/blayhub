import bcrypt from 'bcrypt';
import prisma from '@/utils/prisma';
import { generateToken } from '@/utils/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { email, password, role } = await req.json();

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.role !== role) {
            return NextResponse.json(
                { error: 'Invalid email or password' }, { status: 401 });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }

        const token = generateToken(

            { id: user.id, 
              role: user.role 
            }
        );
        return NextResponse.json({ token });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
