// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { ID } = await req.json();
//     console.log({ ID });

//     const article = await prisma.articles.findUnique({
//       where: { id: Number(ID) },
//       include: {
//         quiz: {
//           select: {
//             id: true,
//             question: true,
//             options: true,
//             answer: true,
//           },
//         },
//       },
//     });

//     if (!article) {
//       return NextResponse.json({ data: [] });
//     }

//     return NextResponse.json({ data: article });
//   } catch (error: any) {
//     console.error("Error fetching history:", error);
//     return NextResponse.json(
//       { error: error.message ?? "Unknown error" },
//       { status: 500 }
//     );
//   }
// }
