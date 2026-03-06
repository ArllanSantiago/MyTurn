import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.searchAttempt.deleteMany();
  await prisma.search.deleteMany();
  await prisma.attraction.deleteMany();
  await prisma.park.deleteMany();

  const parks = [
    { 
      name: 'Magic Kingdom', 
      code: 'MK', 
      timezone: 'America/New_York',
      attractions: [
        { name: 'Seven Dwarfs Mine Train', externalId: 'MK_7DMT', imageUrl: 'https://picsum.photos/seed/mine/400/300' },
        { name: 'Space Mountain', externalId: 'MK_SM', imageUrl: 'https://picsum.photos/seed/space/400/300' },
        { name: 'TRON Lightcycle / Run', externalId: 'MK_TRON', imageUrl: 'https://picsum.photos/seed/tron/400/300' },
        { name: 'Haunted Mansion', externalId: 'MK_HM', imageUrl: 'https://picsum.photos/seed/haunted/400/300' },
        { name: 'Big Thunder Mountain', externalId: 'MK_BTMR', imageUrl: 'https://picsum.photos/seed/mountain/400/300' },
        { name: 'Pirates of the Caribbean', externalId: 'MK_POTC', imageUrl: 'https://picsum.photos/seed/pirate/400/300' },
      ]
    },
    { 
      name: 'EPCOT', 
      code: 'EPCOT', 
      timezone: 'America/New_York',
      attractions: [
        { name: 'Guardians of the Galaxy: Cosmic Rewind', externalId: 'EP_GOTG', imageUrl: 'https://picsum.photos/seed/galaxy/400/300' },
        { name: 'Remy\'s Ratatouille Adventure', externalId: 'EP_REMY', imageUrl: 'https://picsum.photos/seed/rat/400/300' },
        { name: 'Frozen Ever After', externalId: 'EP_FROZEN', imageUrl: 'https://picsum.photos/seed/frozen/400/300' },
        { name: 'Soarin\' Around the World', externalId: 'EP_SOARIN', imageUrl: 'https://picsum.photos/seed/soarin/400/300' },
        { name: 'Test Track', externalId: 'EP_TT', imageUrl: 'https://picsum.photos/seed/test/400/300' },
      ]
    },
    { 
      name: 'Hollywood Studios', 
      code: 'HS', 
      timezone: 'America/New_York',
      attractions: [
        { name: 'Star Wars: Rise of the Resistance', externalId: 'HS_ROTR', imageUrl: 'https://picsum.photos/seed/starwars/400/300' },
        { name: 'Slinky Dog Dash', externalId: 'HS_SLINKY', imageUrl: 'https://picsum.photos/seed/dog/400/300' },
        { name: 'Mickey & Minnie\'s Runaway Railway', externalId: 'HS_MMRR', imageUrl: 'https://picsum.photos/seed/train/400/300' },
        { name: 'Tower of Terror', externalId: 'HS_TOT', imageUrl: 'https://picsum.photos/seed/tower/400/300' },
        { name: 'Toy Story Mania!', externalId: 'HS_TSM', imageUrl: 'https://picsum.photos/seed/toy/400/300' },
      ]
    },
    { 
      name: 'Animal Kingdom', 
      code: 'AK', 
      timezone: 'America/New_York',
      attractions: [
        { name: 'Avatar Flight of Passage', externalId: 'AK_FOP', imageUrl: 'https://picsum.photos/seed/avatar/400/300' },
        { name: 'Expedition Everest', externalId: 'AK_EE', imageUrl: 'https://picsum.photos/seed/everest/400/300' },
        { name: 'Kilimanjaro Safaris', externalId: 'AK_SAFARI', imageUrl: 'https://picsum.photos/seed/safari/400/300' },
        { name: 'Na\'vi River Journey', externalId: 'AK_NAVI', imageUrl: 'https://picsum.photos/seed/river/400/300' },
        { name: 'Dinosaur', externalId: 'AK_DINO', imageUrl: 'https://picsum.photos/seed/dino/400/300' },
      ]
    },
  ];

  for (const parkData of parks) {
    const { attractions, ...parkInfo } = parkData;
    const park = await prisma.park.create({
      data: parkInfo,
    });

    for (const attrData of attractions) {
      await prisma.attraction.create({
        data: {
          ...attrData,
          parkId: park.id,
        },
      });
    }
  }

  console.log('Seed completed successfully!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
