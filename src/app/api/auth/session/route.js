import prisma from '@/utils/prisma';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

export async function GET(req) {
    try {
        const user = await validateUser(req);
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}

export async function validateUser(req) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
        throw new Error('No token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Invalid token');
    }
}
