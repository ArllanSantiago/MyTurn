import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const searches = await prisma.search.findMany({
    where: { userId: session.user.id },
    include: { attraction: { include: { park: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(searches);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { attractionId, timeWindow, partyMemberIds } = await request.json();

    const search = await prisma.search.create({
      data: {
        userId: session.user.id,
        attractionId,
        timeWindow,
        partyMemberIds: JSON.stringify(partyMemberIds || []),
        status: 'ACTIVE',
      },
    });

    return NextResponse.json(search);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create search' }, { status: 500 });
  }
}
