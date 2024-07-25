import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

export function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}

export const authenticateToken = (req, next) => {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return NextResponse.json({ error: 'No token provided' }, { status: 401 });

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        return next(req);
    } catch (err) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }
};
