import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed admin user (credentials must come from the environment — never hardcode them)
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD environment variables are required to seed the admin user.",
    );
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: {
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user seeded:", admin.email);

  // Seed default categories
  const defaultCategories = [
    {
      name: "Main Doors",
      slug: "main-doors",
      description:
        "Handcarved wooden doors with traditional Nepali motifs and sacred geometry.",
      imageUrl: "/Maindoor/door1.jpeg",
      sortOrder: 1,
    },
    {
      name: "Tudal & Struts",
      slug: "tudal",
      description:
        "Traditional tudal (window frames) and temple struts with intricate carvings.",
      imageUrl: "/Tudal/image2.jpg",
      sortOrder: 2,
    },
    {
      name: "Furniture",
      slug: "furniture",
      description:
        "Custom wood furniture, chairs, and decorative pieces crafted by master artisans.",
      imageUrl: "/Design/chair_design_1.jpg",
      sortOrder: 3,
    },
    {
      name: "Panels",
      slug: "panels",
      description:
        "Decorative wall panels, ceiling panels, and relief carvings for interiors.",
      imageUrl: "/Maindoor/door3.jpeg",
      sortOrder: 4,
    },
    {
      name: "Sculpture",
      slug: "sculpture",
      description:
        "Hand-carved wooden statues, masks, and figurines of cultural significance.",
      imageUrl: "/Maindoor/door6.jpg",
      sortOrder: 5,
    },
    {
      name: "Decor",
      slug: "decor",
      description:
        "Wooden home decor items including trays, bowls, and ornamental pieces.",
      imageUrl: "/Maindoor/door7.jpg",
      sortOrder: 6,
    },
    {
      name: "Windows",
      slug: "windows",
      description:
        "Traditional Nepali window frames with carved lattice and heritage designs.",
      imageUrl: "/Maindoor/door4.jpg",
      sortOrder: 7,
    },
    {
      name: "Custom",
      slug: "custom",
      description:
        "Bespoke woodwork crafted to your specifications — doors, furniture, and more.",
      imageUrl: "/sample%20image/image2.jpg",
      sortOrder: 8,
    },
  ];

  let created = 0;
  for (const cat of defaultCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    created++;
  }

  console.log(`✅ ${created} categories seeded`);

  // Seed sample testimonials
  const testimonials = [
    {
      name: "Rajesh Sharma",
      location: "Kathmandu, Nepal",
      role: "Homeowner",
      rating: 5,
      review:
        "The main door they carved for our new home is absolutely stunning. Every visitor comments on the intricate peacock motif. The craftsmanship is world-class and the team was professional throughout the entire process.",
      projectType: "Main Door",
      imageUrl: "/Maindoor/door1.jpeg",
      featured: true,
      published: true,
    },
    {
      name: "Sarah Mitchell",
      location: "London, UK",
      role: "Interior Designer",
      rating: 5,
      review:
        "I've been sourcing wooden panels from Om Wood Carving for my high-end residential projects. The quality is unmatched — genuine hand carving with deep relief work. They ship internationally with great care and packaging.",
      projectType: "Panels",
      featured: true,
      published: true,
    },
    {
      name: "Bikash Tamang",
      location: "Lalitpur, Nepal",
      role: "Temple Trustee",
      rating: 5,
      review:
        "Our temple restoration required authentic Malla-era design elements. Om Wood Carving delivered exactly what the heritage architects specified. Their knowledge of traditional Newari woodcraft is remarkable.",
      projectType: "Temple Restoration",
      imageUrl: "/Maindoor/door5.jpg",
      featured: false,
      published: true,
    },
    {
      name: "Anita Patel",
      location: "Mumbai, India",
      role: "Architect",
      rating: 4,
      review:
        "We ordered a custom set of traditional windows for a heritage hotel project. The team was accommodating with our tight timeline and the final products exceeded our expectations in quality.",
      projectType: "Windows",
      featured: false,
      published: true,
    },
    {
      name: "David Chen",
      location: "Singapore",
      role: "Art Collector",
      rating: 5,
      review:
        "The wooden Buddha statue I purchased is a masterpiece. You can see the decades of skill in every chisel mark. It's now the centerpiece of my collection. Worth every penny and then some.",
      projectType: "Sculpture",
      featured: true,
      published: true,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: t.name, review: t.review },
    });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log(`✅ ${testimonials.length} testimonials seeded`);

  // Seed sample projects
  const projects = [
    {
      slug: "pashupatinath-temple-door-restoration",
      title: "Pashupatinath Temple Door Restoration",
      client: "Temple Heritage Trust",
      location: "Kathmandu, Nepal",
      description:
        "A meticulous restoration of the 400-year-old main entrance door of one of Nepal's most sacred Hindu temples. Our team worked alongside heritage architects to preserve the original Malla-era design while replacing deteriorated wood sections.",
      challenge:
        "The original door had significant termite damage and weather erosion. We needed to match centuries-old carving techniques while using modern preservation methods to ensure longevity.",
      solution:
        "Our master artisans studied the remaining intact sections, created detailed sketches, and hand-carved replacement panels using seasoned Sal wood. Each motif was faithfully reproduced using traditional Newari chiseling techniques.",
      result:
        "The restored door now stands as a testament to both ancient and modern Nepali woodcraft. The temple trust was impressed with the authenticity and the 25-year preservation guarantee.",
      coverImage: "/Maindoor/door5.jpg",
      category: "Temple Restoration",
      materials: "Sal Wood",
      duration: "6 months",
      year: "2024",
      featured: true,
      published: true,
    },
    {
      slug: "luxury-resort-entrance-bhaktapur",
      title: "Luxury Resort Entrance — Bhaktapur",
      client: "Heritage Boutique Resort",
      location: "Bhaktapur, Nepal",
      description:
        "Custom-designed grand entrance doors for a luxury heritage resort, blending traditional Newari architectural elements with modern hospitality requirements. The 12-foot double doors feature sacred Hindu and Buddhist motifs.",
      challenge:
        "The resort required doors that look authentically ancient while meeting modern fire safety and accessibility standards. The scale — 12 feet tall — was significantly larger than typical traditional doors.",
      solution:
        "We designed a modular door system using premium Teak wood. Each panel was carved separately with interlocking joinery, allowing individual panels to be removed for maintenance without disturbing the entire structure.",
      result:
        "The resort entrance became an Instagram-famous landmark. Guests frequently photograph the doors, giving the resort organic marketing exposure. The client ordered additional window frames for the lobby.",
      coverImage: "/Maindoor/door3.jpeg",
      category: "Commercial",
      materials: "Teak Wood",
      duration: "4 months",
      year: "2025",
      featured: true,
      published: true,
    },
    {
      slug: "private-residence-ceiling-panels",
      title: "Hand-Carved Ceiling Panels — Private Residence",
      client: "The Agrawal Family",
      location: "New Delhi, India",
      description:
        "A set of 24 hand-carved ceiling panels featuring concentric mandala patterns for a luxury living room. Each panel measures 2x2 feet with over 200 hours of carving per panel.",
      challenge:
        "The client wanted identical precision across 24 panels while maintaining the organic feel of hand carving. International shipping of fragile carved wood panels was another concern.",
      solution:
        "Three master artisans worked in parallel using shared template guides while leaving room for individual artistic expression. Custom crating with foam inserts ensured safe transit to Delhi.",
      result:
        "All 24 panels arrived in perfect condition and were installed by our team on-site. The living room was featured in Architectural Digest India's 'Craft Homes' special edition.",
      coverImage: "/Maindoor/door9.jpg",
      category: "Residential",
      materials: "Sal Wood, Gold Leaf",
      duration: "5 months",
      year: "2024",
      featured: false,
      published: true,
    },
  ];

  for (const p of projects) {
    const existing = await prisma.project.findUnique({
      where: { slug: p.slug },
    });
    if (!existing) {
      await prisma.project.create({
        data: {
          ...p,
          completedAt: p.year ? new Date(`${p.year}-01-01`) : null,
        },
      });
    }
  }
  console.log(`✅ ${projects.length} projects seeded`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
