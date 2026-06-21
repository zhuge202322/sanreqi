import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const username = process.env.ADMIN_USERNAME || "admin";
const password = process.env.ADMIN_PASSWORD || "admin123456";

async function main() {
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });

  const mediaItems = [
    ["home_hero", "Home hero media"],
    ["about_factory", "About factory media"],
    ["contact_map", "Contact map media"],
  ];

  for (const [key, label] of mediaItems) {
    await prisma.siteMedia.upsert({
      where: { key },
      update: {},
      create: { key, label, url: "" },
    });
  }

  console.log(`Seeded admin user: ${username}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
