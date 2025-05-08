'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import BaixarComPopup from './BaixarComPopup';

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
      {/* Topo com logo Google Play, nome e ícones de busca/ajuda */}
      <header className={styles.topbar}>
        <div className={styles.left}>
          <img src="/logoplay.svg" alt="Google Play" className={styles.playLogo} />
          <span className={styles.playText}>Google Play</span>
        </div>
        <div className={styles.right}>
          <img src="/search.svg" alt="Buscar" className={styles.iconBtn} />
          <img src="/help.svg" alt="Ajuda" className={styles.iconBtn} />
        </div>
      </header>

      

      {/* Bloco do App */}
      <section className={styles.appHeader}>
        <div className={styles.appMainInfo}>
            <div className={styles.appBar}>
            <img src={`https://api.playstores.app/apps/${slug}/icone.png`} alt="Ícone do App" className={styles.appIcon} />
            
            <div className={styles.nameApp}>
            <h1 className={styles.appTitle}>{data.titulo}</h1>
            <p className={styles.appCategory}>Aplicativo</p>
            </div>

            </div>
          <div className={styles.metrics}>
            <div className={styles.metric}>
                <div className={styles.stars}>
                <h1>4,8</h1>
                <img src="/estrelas.svg" alt="Estrelas" className={styles.stars} />
                </div>
              <span>41 mil avaliações</span>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.metric}>
              <strong>10 mil+</strong>
              <span>Downloads</span>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.metric}>
              <img src="/livre.png" alt="18+" className={styles.ageIcon} />
              <span>Classificado como livre</span>
            </div>
          </div>

          <BaixarComPopup slug={slug} />

          <div className={styles.actionLinks}>
            <span className={styles.linkItem}>
              <img src="/compartilhar.svg" alt="Compartilhar" />
              Compartilhar
            </span>
            <span className={styles.linkItem}>
              <img src="/salvos.svg" alt="Salvar" />
              Adicionar à lista de desejos
            </span>
          </div>
        </div>

        <section className={styles.gallerySection}>
{/* Galeria de screenshots */}
<div className={styles.gallery}>
  <picture>
    <source srcSet={`https://api.playstores.app/apps/${slug}//print1.jpg`} type="image/jpg" />
    <img src={`https://api.playstores.app/apps/${slug}/print1.jpg`} alt="Screenshot 1" />
  </picture>
  <picture>
    <source srcSet={`https://api.playstores.app/apps/${slug}/print2.jpg`} type="image/jpg" />
    <img src={`https://api.playstores.app/apps/${slug}/print2.jpg`} alt="Screenshot 2" />
  </picture>
</div>

  {/* Sobre este app */}
  <div className={styles.aboutSection}>
    <div className={styles.aboutHeader}>
      <h2>Sobre este app</h2>
    </div>
    <p className={styles.description}>
      {data.descricao}
    </p>
    <p className={styles.updateInfo}>
  <strong>Atualizado em:</strong> 4 de abril de 2025
</p>
  </div>

  <section className={styles.detailsSection}>
  {/* Tags */}
  <div className={styles.tags}>
    <span>Estilizado</span>
    <span>Casual</span>
    <span>check-in</span>
  </div>

  {/* Título + seta */}
  <div className={styles.detailsHeader}>
    <h2>Mais detalhes</h2>
    <span className={styles.arrow}>›</span>
  </div>

  {/* Texto explicativo */}
  <p className={styles.securityText}>
    Sua segurança começa quando você entende como os desenvolvedores coletam e compartilham seus dados.
    As práticas de segurança e privacidade de dados podem variar de acordo com o uso, a região e a idade.
    O desenvolvedor forneceu as informações a seguir, que podem ser atualizadas ao longo do tempo.
  </p>

  {/* Bloco de informações */}
  <div className={styles.dataBox}>
    <div className={styles.dataItem}>
      <img src="/compartilhar.svg" alt="Compartilhamento" />
      <p>Este app pode compartilhar estes tipos de dados com terceiros</p>
    </div>
    <div className={styles.dataItem}>
      <img src="/help.svg" alt="Coleta" />
      <p>Nenhum dado foi coletado</p>
    </div>
    <div className={styles.dataItem}>
      <img src="/salvos.svg" alt="Exclusão" />
      <p>Você pode solicitar a exclusão dos dados</p>
    </div>
    <a href="#" className={styles.verDetalhes}>Ver detalhes</a>
  </div>
</section>

<section className={styles.reviewsSection}>
  <div className={styles.reviewsHeader}>
    <h2>Classificações e resenhas</h2>
    <span className={styles.arrow}>›</span>
  </div>

  <p className={styles.reviewsSubtext}>
    As notas e avaliações são verificadas
    <img src="/help.svg" alt="Ajuda" className={styles.infoIcon} />
  </p>

  <div className={styles.reviewTabs}>
    <button className={styles.tabActive}>
      <img src="/telefone.svg" alt="Telefone" />
      Telefone
    </button>
  </div>

  <div className={styles.reviewContent}>
    <div className={styles.reviewScore}>
      <div className={styles.score}>4.0</div>
      <div className={styles.starsRow}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={i < 4 ? "#01875f" : "#e0e0e0"}
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: 2 }}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 
            9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <div className={styles.total}>404 mil avaliações</div>
    </div>

    <div className={styles.reviewGraph}>
      {[5, 4, 3, 2, 1].map((star, i) => (
        <div key={star} className={styles.barRow}>
          <span>{star}</span>
          <div className={styles.barBackground}>
            <div
              className={styles.barFill}
              style={{ width: [90, 65, 5, 2, 1][i] + '%' }}
            />
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
        Essa avaliação foi marcada como útil por {r.util} pessoas
      </p>

      <div className={styles.buttonsRow}>
        <span>Você achou isso útil?</span>
        <button>Sim</button>
        <button>Não</button>
      </div>
    </div>
  ))}

  <a href="#" className={styles.seeAll}>Ver todas as avaliações</a>
</section>

<section className={styles.footerPlayStore}>
  <div className={styles.footerTop}>
    <div className={styles.footerGroup}>
      <h4>Google Play</h4>
      <ul>
        <li>Play Pass</li>
        <li>Play Points</li>
        <li>Vales-presente</li>
        <li>Resgatar</li>
        <li>Política de reembolso</li>
      </ul>
    </div>
    <div className={styles.footerGroup}>
      <h4>Crianças e família</h4>
      <ul>
        <li>Guia para a família</li>
        <li>Compartilhamento em família</li>
      </ul>
    </div>
  </div>

  <div className={styles.footerBottom}>
    <ul>
      <li>Termos de Serviço</li>
      <li>Privacidade</li>
      <li>Sobre o Google Play</li>
      <li>Desenvolvedores</li>
      <li>Google Store</li>
      <li>Brasil (Português)</li>
    </ul>
  </div>
</section>




</section>


      </section>
    </>
  );
}
