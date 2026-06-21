import { DatabaseSync } from "node:sqlite";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";

function readEnvFile(file) {
  if (!fs.existsSync(file)) return;
  const text = fs.readFileSync(file, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Z0-9_]+)=(.*)$/i);
    if (!match) continue;
    const [, key, raw] = match;
    if (process.env[key]) continue;
    process.env[key] = raw.replace(/^"|"$/g, "");
  }
}

readEnvFile(path.join(process.cwd(), ".env"));
readEnvFile(path.join(process.cwd(), ".env.local"));

const databaseUrl = process.env.DATABASE_URL || "file:./dev.db";
const dbFile = databaseUrl.replace(/^file:/, "");
const dbPath = path.isAbsolute(dbFile) ? dbFile : path.join(process.cwd(), "prisma", dbFile);

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new DatabaseSync(dbPath);

db.exec(`
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS AdminUser (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  passwordHash TEXT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  imageUrl TEXT,
  sortOrder INTEGER NOT NULL DEFAULT 0,
  nameFr TEXT NOT NULL DEFAULT '',
  nameEs TEXT NOT NULL DEFAULT '',
  nameAr TEXT NOT NULL DEFAULT '',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Product (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  shortDescription TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT 0,
  sortOrder INTEGER NOT NULL DEFAULT 0,
  nameFr TEXT NOT NULL DEFAULT '',
  nameEs TEXT NOT NULL DEFAULT '',
  nameAr TEXT NOT NULL DEFAULT '',
  shortDescriptionFr TEXT NOT NULL DEFAULT '',
  shortDescriptionEs TEXT NOT NULL DEFAULT '',
  shortDescriptionAr TEXT NOT NULL DEFAULT '',
  descriptionFr TEXT NOT NULL DEFAULT '',
  descriptionEs TEXT NOT NULL DEFAULT '',
  descriptionAr TEXT NOT NULL DEFAULT '',
  specs TEXT NOT NULL DEFAULT '',
  specsFr TEXT NOT NULL DEFAULT '',
  specsEs TEXT NOT NULL DEFAULT '',
  specsAr TEXT NOT NULL DEFAULT '',
  specsPdf TEXT,
  formula TEXT NOT NULL DEFAULT '',
  formulaFr TEXT NOT NULL DEFAULT '',
  formulaEs TEXT NOT NULL DEFAULT '',
  formulaAr TEXT NOT NULL DEFAULT '',
  formulaPdf TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS _ProductCategories (
  A INTEGER NOT NULL,
  B INTEGER NOT NULL,
  PRIMARY KEY (A, B),
  FOREIGN KEY (A) REFERENCES Category(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (B) REFERENCES Product(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS _ProductCategories_B_index ON _ProductCategories(B);

CREATE TABLE IF NOT EXISTS ProductImage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  src TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  sortOrder INTEGER NOT NULL DEFAULT 0,
  productId INTEGER NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ProductSku (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  nameFr TEXT NOT NULL DEFAULT '',
  nameEs TEXT NOT NULL DEFAULT '',
  nameAr TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  size TEXT NOT NULL DEFAULT '',
  productId INTEGER NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS ProductSkuImage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  src TEXT NOT NULL,
  sortOrder INTEGER NOT NULL DEFAULT 0,
  skuId INTEGER NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (skuId) REFERENCES ProductSku(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Post (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  featuredImage TEXT,
  authorName TEXT NOT NULL DEFAULT 'Huixun Team',
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  titleFr TEXT NOT NULL DEFAULT '',
  titleEs TEXT NOT NULL DEFAULT '',
  titleAr TEXT NOT NULL DEFAULT '',
  excerptFr TEXT NOT NULL DEFAULT '',
  excerptEs TEXT NOT NULL DEFAULT '',
  excerptAr TEXT NOT NULL DEFAULT '',
  contentFr TEXT NOT NULL DEFAULT '',
  contentEs TEXT NOT NULL DEFAULT '',
  contentAr TEXT NOT NULL DEFAULT '',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS SiteMedia (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS PageView (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'direct',
  referrer TEXT,
  device TEXT NOT NULL DEFAULT 'unknown',
  visitorId TEXT,
  isBot BOOLEAN NOT NULL DEFAULT 0,
  utmSource TEXT,
  utmCampaign TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`);

const username = process.env.ADMIN_USERNAME || "admin";
const password = process.env.ADMIN_PASSWORD || "admin123456";
const passwordHash = await bcrypt.hash(password, 10);

db.prepare(`
INSERT INTO AdminUser (username, passwordHash, updatedAt)
VALUES (?, ?, CURRENT_TIMESTAMP)
ON CONFLICT(username) DO UPDATE SET passwordHash = excluded.passwordHash, updatedAt = CURRENT_TIMESTAMP
`).run(username, passwordHash);

for (const [key, label] of [
  ["home_hero", "Home hero media"],
  ["about_factory", "About factory media"],
  ["contact_map", "Contact map media"],
]) {
  db.prepare(`
  INSERT INTO SiteMedia (key, label, url, updatedAt)
  VALUES (?, ?, '', CURRENT_TIMESTAMP)
  ON CONFLICT(key) DO NOTHING
  `).run(key, label);
}

db.close();

console.log(`SQLite database initialized at ${dbPath}`);
console.log(`Seeded admin user: ${username}`);
