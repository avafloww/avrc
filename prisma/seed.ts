import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RemoteUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

async function main() {
  // fetch users from the sample API
  const users: RemoteUser[] = await fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json());

  // map each one to a Contact and insert them
  for (const user of users) {
    await prisma.contact.create({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        website: user.website,
        companyName: user.company.name,
      },
    });

    console.log(`contact created: ${user.name} (${user.id})`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
