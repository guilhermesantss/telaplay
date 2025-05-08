import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug não fornecido' }, { status: 400 });
    }

    const dirPath = path.join(process.cwd(), 'public', 'apps', slug);
    await fs.rm(dirPath, { recursive: true, force: true });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Erro ao deletar:', err);
    return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 });
  }
}
