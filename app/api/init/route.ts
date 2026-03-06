import { NextResponse } from 'next/server';
import { PollingService } from '@/lib/polling';

export async function GET() {
  const polling = PollingService.getInstance();
  polling.start();
  
  return NextResponse.json({ status: 'Polling service initialized' });
}
