'use client';

import { useState } from 'react';
import styles from './criar.module.css';
import { useRouter } from 'next/navigation';

export default function CriarPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    comentario1: '',
    comentario2: '',
    comentario3: '',
    slug: ''
  });

  const [icone, setIcone] = useState(null);
  const [print1, setPrint1] = useState(null);
  const [print2, setPrint2] = useState(null);
  const [apk, setApk] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      slug: name === 'nome' ? value.toLowerCase().replace(/\s+/g, '') : prev.slug
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    if (icone) body.append('icone', icone);
    if (print1) body.append('imagem1', print1);
    if (print2) body.append('imagem2', print2);
    if (apk) body.append('apk', apk); // ⬅️ agora incluímos o APK aqui

    const res = await fetch('/api/criar', {
      method: 'POST',
      body
    });

    if (res.ok) router.push(`/${form.slug}`);
    else alert('Erro ao criar tela.');
  };

  return (
    <div className={styles.box}>
      <h1 className={styles.titulo}>Criar Nova Tela</h1>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <label className={styles.rotulo}>Nome do App</label>
        <input name="nome" type="text" value={form.nome} onChange={handleChange} className={styles.campo} required />

        <label className={styles.rotulo}>Descrição</label>
        <textarea name="descricao" value={form.descricao} onChange={handleChange} className={styles.textarea} required />

        <label className={styles.rotulo}>Comentário 1</label>
        <input name="comentario1" type="text" value={form.comentario1} onChange={handleChange} className={styles.campo} required />

        <label className={styles.rotulo}>Comentário 2</label>
        <input name="comentario2" type="text" value={form.comentario2} onChange={handleChange} className={styles.campo} required />

        <label className={styles.rotulo}>Comentário 3</label>
        <input name="comentario3" type="text" value={form.comentario3} onChange={handleChange} className={styles.campo} required />

        <label className={styles.rotulo}>Arquivo APK</label>
        <input type="file" accept=".apk" onChange={(e) => setApk(e.target.files[0])} className={styles.arquivo} required />

        <label className={styles.rotulo}>Ícone do App</label>
        <input type="file" accept="image/*" onChange={(e) => setIcone(e.target.files[0])} className={styles.arquivo} required />

        <label className={styles.rotulo}>Print 1</label>
        <input type="file" accept="image/*" onChange={(e) => setPrint1(e.target.files[0])} className={styles.arquivo} required />

        <label className={styles.rotulo}>Print 2</label>
        <input type="file" accept="image/*" onChange={(e) => setPrint2(e.target.files[0])} className={styles.arquivo} required />

        <label className={styles.rotulo}>Slug (URL)</label>
        <input value={`/${form.slug}`} className={styles.desabilitado} disabled />

        <button type="submit" className={styles.botao}>Finalizar</button>
      </form>
    </div>
  );
}
