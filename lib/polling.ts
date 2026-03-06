import prisma from './prisma';

/**
 * This service simulates the background polling process.
 * In a real app, this would be a separate worker process using Bull/Redis.
 * Here, we'll run it as a background task within the Next.js environment.
 */
export class PollingService {
  private static instance: PollingService;
  private isRunning = false;
  private interval: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance(): PollingService {
    if (!PollingService.instance) {
      PollingService.instance = new PollingService();
    }
    return PollingService.instance;
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log('Polling service started...');
    
    // Run every 30 seconds for demo purposes (user asked for 5 mins)
    this.interval = setInterval(() => this.poll(), 30000);
    this.poll(); // Initial run
  }

  public stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isRunning = false;
  }

  private async poll() {
    console.log('Running polling cycle at', new Date().toISOString());
    
    try {
      const activeSearches = await prisma.search.findMany({
        where: { status: 'ACTIVE' },
        include: { attraction: { include: { park: true } }, user: true },
      });

      for (const search of activeSearches) {
        await this.processSearch(search);
      }
    } catch (error) {
      console.error('Polling error:', error);
    }
  }

  private async processSearch(search: any) {
    // 1. Simulate availability check (Mock)
    // In a real app, this would call the park's API
    const isAvailable = Math.random() > 0.7; // 30% chance of finding a slot
    
    if (isAvailable) {
      console.log(`Found availability for ${search.attraction.name}!`);
      
      // 2. Create a booking
      const returnTime = new Date();
      returnTime.setHours(returnTime.getHours() + 2); // Return in 2 hours

      await prisma.$transaction([
        prisma.booking.create({
          data: {
            searchId: search.id,
            userId: search.userId,
            attractionId: search.attractionId,
            returnTime,
            status: 'CONFIRMED',
          },
        }),
        prisma.search.update({
          where: { id: search.id },
          data: { status: 'COMPLETED' },
        }),
        prisma.searchAttempt.create({
          data: {
            searchId: search.id,
            status: 'SUCCESS',
            message: `Automatically booked for ${returnTime.toLocaleTimeString()}`,
          },
        }),
      ]);
      
      // 3. Notify user (Mock)
      console.log(`Notification sent to ${search.user.email}: ${search.attraction.name} booked!`);
    } else {
      await prisma.searchAttempt.create({
        data: {
          searchId: search.id,
          status: 'FAILED',
          message: 'No availability found in this cycle.',
        },
      });
    }
  }
}
