'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://playstores.app/api/login', {
      method: 'POST',
      body: JSON.stringify({ senha }),
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      setErro(true);
      setSenha('');
    }
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Acesso Restrito</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ padding: '10px', width: '200px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '10px' }}>
          Entrar
        </button>
      </form>
      {erro && <p style={{ color: 'red' }}>Senha incorreta</p>}
    </div>
  );
}
