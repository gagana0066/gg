import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

async function getDemoUserId(): Promise<string> {
  const user = await prisma.user.upsert({
    where: { email: 'demo@gg.local' },
    update: {},
    create: { email: 'demo@gg.local', name: 'GG Demo User' }
  });
  return user.id;
}

export async function GET() {
  const userId = await getDemoUserId();
  const goals = await prisma.goal.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(goals);
}

export async function POST(req: Request) {
  const body = await req.json();
  const userId = await getDemoUserId();

  if (!body?.title || !body?.category || !body?.deadline) {
    return NextResponse.json({ error: 'title, category and deadline are required' }, { status: 400 });
  }

  const goal = await prisma.goal.create({
    data: {
      userId,
      title: String(body.title),
      category: String(body.category),
      deadline: new Date(String(body.deadline)),
      progress: Number(body.progress ?? 0),
      status: String(body.status ?? 'active').toLowerCase()
    }
  });

  return NextResponse.json(goal, { status: 201 });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  if (!body?.id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const goal = await prisma.goal.update({
    where: { id: String(body.id) },
    data: {
      title: body.title ? String(body.title) : undefined,
      category: body.category ? String(body.category) : undefined,
      deadline: body.deadline ? new Date(String(body.deadline)) : undefined,
      progress: Number.isFinite(body.progress) ? Number(body.progress) : undefined,
      status: body.status ? String(body.status).toLowerCase() : undefined
    }
  });

  return NextResponse.json(goal);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'id query param is required' }, { status: 400 });
  }

  await prisma.goal.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
