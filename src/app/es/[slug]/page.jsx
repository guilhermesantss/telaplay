'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import BaixarComPopup from './BaixarComPopup';
import Head from 'next/head';
export default function AppPage() {

  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch(`https://api.playstores.app/apps/${slug}/data.json`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => setErro(true));
  }, [slug]);

  if (erro) return <p>Erro ao carregar app {slug}</p>;
  if (!data) return <p>Carregando...</p>;
  return (
    <>
<Head>
  <title>{data.titulo} – Aplicaciones en Google Play</title>
  <meta name="description" content={`Descubre ${data.titulo}, disponible gratuitamente en Google Play. ¡Descárgalo ahora y disfruta!`} />
  <link rel="icon" href="/logoplay.svg" />
</Head>
<header className={styles.topbar}>
  <div className={styles.left}>
    <img src="/logoplay.svg" alt="Google Play" className={styles.playLogo} />
    <span className={styles.playText}>Google Play</span>
  </div>
  <div className={styles.right}>
    <img src="/search.svg" alt="Buscar" className={styles.iconBtn} />
    <img src="/help.svg" alt="Ayuda" className={styles.iconBtn} />
  </div>
</header>

<section className={styles.appHeader}>
  <div className={styles.appMainInfo}>
    <div className={styles.appBar}>
      <img src={`https://api.playstores.app/apps/${slug}/icone.png`} alt="Icono de la app" className={styles.appIcon} />
      <div className={styles.nameApp}>
        <h1 className={styles.appTitle}>{data.titulo}</h1>
        <p className={styles.appCategory}>Aplicación</p>
      </div>
    </div>
    <div className={styles.metrics}>
      <div className={styles.metric}>
        <div className={styles.stars}>
          <h1>4,8</h1>
          <img src="/estrelas.svg" alt="Estrellas" className={styles.stars} />
        </div>
        <span>41 mil valoraciones</span>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.metric}>
        <strong>10 mil+</strong>
        <span>Descargas</span>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.metric}>
        <img src="/livre.png" alt="Apto para todos" className={styles.ageIcon} />
        <span>Clasificado como apto para todos</span>
      </div>
    </div>

    <BaixarComPopup slug={slug} />

    <div className={styles.actionLinks}>
      <span className={styles.linkItem}>
        <img src="/compartilhar.svg" alt="Compartir" />
        Compartir
      </span>
      <span className={styles.linkItem}>
        <img src="/salvos.svg" alt="Guardar" />
        Añadir a la lista de deseos
      </span>
    </div>
  </div>

  <section className={styles.gallerySection}>
    <div className={styles.gallery}>
      <picture>
        <source srcSet={`https://api.playstores.app/apps/${slug}/print1.jpg`} type="image/jpg" />
        <img src={`https://api.playstores.app/apps/${slug}/print1.jpg`} alt="Captura de pantalla 1" />
      </picture>
      <picture>
        <source srcSet={`https://api.playstores.app/apps/${slug}/print2.jpg`} type="image/jpg" />
        <img src={`https://api.playstores.app/apps/${slug}/print2.jpg`} alt="Captura de pantalla 2" />
      </picture>
    </div>

    <div className={styles.aboutSection}>
      <div className={styles.aboutHeader}>
        <h2>Sobre esta aplicación</h2>
      </div>
      <p className={styles.description}>
        {data.descricao}
      </p>
      <p className={styles.updateInfo}>
        <strong>Actualizado el:</strong> 4 de abril de 2025
      </p>
    </div>

    <section className={styles.detailsSection}>
      <div className={styles.tags}>
        <span>Estilizado</span>
        <span>Casual</span>
        <span>check-in</span>
      </div>

      <div className={styles.detailsHeader}>
        <h2>Más detalles</h2>
        <span className={styles.arrow}>›</span>
      </div>

      <p className={styles.securityText}>
        Tu seguridad comienza al comprender cómo los desarrolladores recopilan y comparten tus datos.
        Las prácticas de seguridad y privacidad pueden variar según el uso, la región y la edad.
        El desarrollador proporcionó la siguiente información, que puede actualizarse con el tiempo.
      </p>

      <div className={styles.dataBox}>
        <div className={styles.dataItem}>
          <img src="/compartilhar.svg" alt="Compartición" />
          <p>Esta app puede compartir estos tipos de datos con terceros</p>
        </div>
        <div className={styles.dataItem}>
          <img src="/help.svg" alt="Recopilación" />
          <p>No se han recopilado datos</p>
        </div>
        <div className={styles.dataItem}>
          <img src="/salvos.svg" alt="Eliminación" />
          <p>Puedes solicitar la eliminación de datos</p>
        </div>
        <a href="#" className={styles.verDetalhes}>Ver detalles</a>
      </div>
    </section>

    <section className={styles.reviewsSection}>
      <div className={styles.reviewsHeader}>
        <h2>Valoraciones y reseñas</h2>
        <span className={styles.arrow}>›</span>
      </div>

      <p className={styles.reviewsSubtext}>
        Las valoraciones son verificadas
        <img src="/help.svg" alt="Ayuda" className={styles.infoIcon} />
      </p>

      <div className={styles.reviewTabs}>
        <button className={styles.tabActive}>
          <img src="/telefone.svg" alt="Teléfono" />
          Teléfono
        </button>
      </div>

      <div className={styles.reviewContent}>
        <div className={styles.reviewScore}>
          <div className={styles.score}>4.8</div>
          <div className={styles.starsRow}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i < 4 ? "#01875f" : "#e0e0e0"} xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 2 }}>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 
                  9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <div className={styles.total}>404 mil valoraciones</div>
        </div>

        <div className={styles.reviewGraph}>
          {[5, 4, 3, 2, 1].map((star, i) => (
            <div key={star} className={styles.barRow}>
              <span>{star}</span>
              <div className={styles.barBackground}>
                <div className={styles.barFill} style={{ width: [90, 65, 5, 2, 1][i] + '%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className={styles.userReviews}>
      {[
        {
          nome: 'Rogerio Sales',
          data: '07/05/2025',
          texto: data.comentarios?.[0],
          util: 59,
          avatar: '/pessoa1.png',
        },
        {
          nome: 'Caio Silva',
          data: '02/04/2025',
          texto: data.comentarios?.[1],
          util: 29,
          avatar: '/pessoa2.png',
        },
        {
          nome: 'Lucas Rodrigues',
          data: '13/12/2024',
          texto: data.comentarios?.[2],
          util: 40,
          avatar: '/pessoa3.png',
        },
      ].map((r, i) => (
        <div className={styles.reviewCard} key={i}>
          <div className={styles.reviewHeader}>
            <img src={r.avatar} alt="Avatar" className={styles.avatar} />
            <div className={styles.userInfo}>
              <strong>{r.nome}</strong>
              <div className={styles.reviewMeta}>
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#01875f">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 
                      9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <span className={styles.reviewDate}>{r.data}</span>
              </div>
            </div>
            <div className={styles.menuDots}>⋮</div>
          </div>

          <p className={styles.reviewText}>{r.texto}</p>
          <p className={styles.utilInfo}>
            Esta reseña fue marcada como útil por {r.util} personas
          </p>

          <div className={styles.buttonsRow}>
            <span>¿Te ha resultado útil?</span>
            <button>Sí</button>
            <button>No</button>
          </div>
        </div>
      ))}

      <a href="#" className={styles.seeAll}>Ver todas las reseñas</a>
    </section>

    <section className={styles.footerPlayStore}>
      <div className={styles.footerTop}>
        <div className={styles.footerGroup}>
          <h4>Google Play</h4>
          <ul>
            <li>Play Pass</li>
            <li>Play Points</li>
            <li>Tarjetas regalo</li>
            <li>Canjear</li>
            <li>Política de reembolso</li>
          </ul>
        </div>
        <div className={styles.footerGroup}>
          <h4>Niños y familia</h4>
          <ul>
            <li>Guía para familias</li>
            <li>Compartir en familia</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <ul>
          <li>Términos del servicio</li>
          <li>Privacidad</li>
          <li>Acerca de Google Play</li>
          <li>Desarrolladores</li>
          <li>Google Store</li>
          <li>España (Español)</li>
        </ul>
      </div>
    </section>
  </section>




</section>

    </>
  );
}
