import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { login } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.passwordHash !== password) { // FIXME: Compare hashed password
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    await login({ id: user.id, email: user.email, name: user.name });

    return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
