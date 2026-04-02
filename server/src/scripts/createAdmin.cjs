require("dotenv").config();

const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const email = "admin@technosante.fr";
  const plainPassword = "Admin1234!";
  const name = "Admin TechnoSanté";

  const existing = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("⚠️ Cet admin existe déjà :", existing.email);
    return;
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.adminUser.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: "admin",
    },
  });

  console.log("✅ Admin créé :", {
    id: user.id,
    email: user.email,
    role: user.role,
  });
}

main()
  .catch((e) => {
    console.error("❌ Erreur :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });