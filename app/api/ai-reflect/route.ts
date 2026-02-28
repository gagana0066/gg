import { NextResponse } from 'next/server';
import { reflectOnEntry } from '../../../lib/ai';

export async function POST(req: Request) {
  try {
    const { entry } = await req.json();
    if (!entry) {
      return NextResponse.json({ error: 'Entry text required' }, { status: 400 });
    }
    const feedback = await reflectOnEntry(entry);
    return NextResponse.json({ feedback });
  } catch (err) {
    console.error('AI reflect error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
