import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { attraction: { include: { park: true } } },
    orderBy: { returnTime: 'desc' },
  });

  return NextResponse.json(bookings);
}
