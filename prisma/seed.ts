import { prisma } from "@/lib/prisma";

await prisma.category.createMany({
  data: [
    { name: "Deep Work", slug: "deep-work" },
    { name: "Learning", slug: "learning" },
    { name: "Meeting", slug: "meeting" },
    { name: "Planning", slug: "planning" },
    { name: "Review", slug: "review" },
    { name: "Projects", slug: "projects" },
    { name: "DSA", slug: "dsa" },
  ],
  skipDuplicates: true,
});
