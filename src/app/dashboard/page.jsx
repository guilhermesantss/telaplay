'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const router = useRouter();
  const [slugs, setSlugs] = useState([]);

  useEffect(() => {
    const fetchSlugs = async () => {
      const res = await fetch('/api/slugs');
      const data = await res.json();
      setSlugs(data);
    };

    fetchSlugs();
  }, []);

  const handleDelete = async (slug) => {
    if (!confirm(`Deseja realmente deletar ${slug}?`)) return;

    const res = await fetch('/api/deletar', {
      method: 'POST',
      body: JSON.stringify({ slug }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      setSlugs(prev => prev.filter(s => s !== slug));
    } else {
      alert('Erro ao deletar.');
    }
  };

  const handleEdit = (slug) => {
    router.push(`/criar?slug=${slug}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Painel de Aplicações</h1>

      <button className={styles.createBtn} onClick={() => router.push('/criar')}>
        + Criar Nova Tela
      </button>

      <div className={styles.grid}>
        {slugs.map((slug) => (
          <div key={slug} className={styles.card}>
            <h2>{slug}</h2>
            <p>Aplicativo disponível</p>
            <a href={`/${slug}`} className={styles.link}>Ver Página</a>

            <button className={styles.deleteBtn} onClick={() => handleDelete(slug)}>
              Remover Página
            </button>

            <button className={styles.replaceBtn} onClick={() => handleEdit(slug)}>
              Substituir APK
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
