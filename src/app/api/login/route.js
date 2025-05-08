export async function POST(req) {
    const body = await req.json();
  
    if (body.senha === 'kaiqqadmin') {
      return new Response(null, {
        status: 200,
        headers: {
          'Set-Cookie': 'auth=true; Path=/; HttpOnly',
        },
      });
    }
  
    return new Response(JSON.stringify({ erro: 'Senha incorreta' }), {
      status: 401,
    });
  }
  