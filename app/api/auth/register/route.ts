import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { login } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // In a real app, hash the password!
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: password, // FIXME: Hash this
        name,
      },
    });

    await login({ id: user.id, email: user.email, name: user.name });

    return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
