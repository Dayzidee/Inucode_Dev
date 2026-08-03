const mongoose = require("mongoose");

const MONGODB_URI = "mongodb+srv://Dunsimi:yBu1DJLmBUFy4sWO@cluster0.ibkcbiv.mongodb.net/kotadev_db?retryWrites=true&w=majority&appName=Cluster0";

// --- Schemas ---
const ProjectSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
  link: String,
  description: String,
  publishedAt: Date,
}, { timestamps: true });

const JournalEntrySchema = new mongoose.Schema({
  title: String,
  content: String,
  slug: String,
  author: String,
  publishedAt: Date,
  status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
}, { timestamps: true });

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  status: { type: String, enum: ["unread", "read", "archived"], default: "unread" },
  readAt: Date,
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({
  title: String,
  category: String,
  icon: String,
  color: String,
  hoverEffect: String,
  description: String,
}, { timestamps: true });

// --- Models ---
const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
const JournalEntry = mongoose.models.JournalEntry || mongoose.model("JournalEntry", JournalEntrySchema);
const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

// --- Seed Data ---
const projects = [
  {
    title: "Kota Dev — Portfolio Platform",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    link: "/",
    description: "The flagship portfolio and studio platform built on Next.js, showcasing the Kota Dev design system and engineering depth.",
    publishedAt: new Date("2026-01-01"),
  },
  {
    title: "Obsidian Analytics",
    category: "Dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    link: "#",
    description: "A sleek, dark-mode analytics dashboard built for real-time data monitoring with a minimalist editorial approach.",
    publishedAt: new Date("2025-09-15"),
  },
  {
    title: "Void Protocol",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
    link: "#",
    description: "A complete visual identity system — wordmark, type scale, and motion language — for a stealth-mode tech startup.",
    publishedAt: new Date("2025-06-20"),
  },
];

const journalEntries = [
  {
    title: "The Architecture of Intuition",
    content: "When systems are designed well, they feel inevitable. This is the goal — to build software that does not feel built, but grown...",
    slug: "architecture-of-intuition",
    author: "Kota Dev",
    publishedAt: new Date("2026-05-10"),
    status: "published",
  },
  {
    title: "Industrial Minimalism in the Age of AI",
    content: "Maximalism is easy. Anyone can add more. Minimalism requires restraint, precision, and a deep understanding of what truly matters...",
    slug: "industrial-minimalism-ai",
    author: "Kota Dev",
    publishedAt: new Date("2026-04-18"),
    status: "published",
  },
  {
    title: "Draft: On Engineering Speed",
    content: "Speed is not just a feature. It is a form of respect for the user's time...",
    slug: "on-engineering-speed",
    author: "Kota Dev",
    publishedAt: new Date("2026-06-01"),
    status: "draft",
  },
];

const services = [
  {
    title: "Web Engineering",
    category: "Development",
    icon: "Code",
    color: "#ffffff",
    hoverEffect: "glow",
    description: "Full-stack web applications built with Next.js, TypeScript, and modern deployment infrastructure.",
  },
  {
    title: "Systems Architecture",
    category: "Strategy",
    icon: "Cpu",
    color: "#888888",
    hoverEffect: "shift",
    description: "Designing scalable, fault-tolerant backend systems with a bias toward simplicity and longevity.",
  },
  {
    title: "Brand & Identity",
    category: "Design",
    icon: "Layers",
    color: "#ffffff",
    hoverEffect: "reveal",
    description: "Visual identity systems that communicate precision, confidence, and a distinct point of view.",
  },
  {
    title: "UI/UX Engineering",
    category: "Design",
    icon: "Monitor",
    color: "#888888",
    hoverEffect: "glow",
    description: "Pixel-precise interfaces with fluid motion, dark-mode excellence, and obsessive accessibility.",
  },
];

async function seed() {
  try {
    console.log("🔗 Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to kotadev_db\n");

    // Clear existing data
    console.log("🗑️  Clearing existing collections...");
    await Project.deleteMany({});
    await JournalEntry.deleteMany({});
    await Message.deleteMany({});
    await Service.deleteMany({});

    // Seed
    console.log("🌱 Seeding Projects...");
    await Project.insertMany(projects);
    console.log(`   ✓ ${projects.length} projects inserted`);

    console.log("🌱 Seeding Journal Entries...");
    await JournalEntry.insertMany(journalEntries);
    console.log(`   ✓ ${journalEntries.length} journal entries inserted`);

    console.log("🌱 Seeding Services...");
    await Service.insertMany(services);
    console.log(`   ✓ ${services.length} services inserted`);

    console.log("\n🎉 Seed complete. Collections live on Atlas:");
    console.log("   - projects");
    console.log("   - journalentries");
    console.log("   - messages (empty, ready for real inquiries)");
    console.log("   - services");

  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    await mongoose.connection.close();
    console.log("\n🔒 Connection closed.");
  }
}

seed();
