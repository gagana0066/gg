import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const goals = await prisma.goal.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(goals);
}

export async function POST(req: Request) {
  const body = await req.json();

  const goal = await prisma.goal.create({
    data: {
      title: body.title,
      category: body.category,
      deadline: new Date(body.deadline),
      progress: 0,
      status: "ACTIVE",
    },
  });

  return NextResponse.json(goal);
}