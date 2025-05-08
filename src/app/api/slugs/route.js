import fs from 'fs';
import path from 'path';

export async function GET() {
  const appsDir = path.join(process.cwd(), 'public', 'apps');
  let slugs = [];

  try {
    slugs = fs
      .readdirSync(appsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (err) {
    console.error('Erro ao ler diretório /public/apps:', err);
  }

  return new Response(JSON.stringify(slugs), {
    headers: { 'Content-Type': 'application/json' },
  });
}
