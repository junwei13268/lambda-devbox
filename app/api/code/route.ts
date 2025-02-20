import { updateData } from '@/app/utils/postgre';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
) {
  try {
    const parsedUrl = new URL(req.url || '');
    const id = parsedUrl.searchParams.get('id');
    const body = await req.json();
    await updateData({ id, code: body.code });
    return new Response(JSON.stringify({ message: 'Code updated successfully' }));
  } catch (err) {
    return new NextResponse(JSON.stringify({ status: 500, error: err }))
  }
}