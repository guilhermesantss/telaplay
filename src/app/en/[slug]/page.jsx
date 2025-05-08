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

  if (erro) return <p>Error loading app {slug}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>{data.titulo} – Apps on Google Play</title>
        <meta name="description" content={`Discover ${data.titulo}, available now on the alternative Google Play Store. Free download!`} />
        <link rel="icon" href="/logoplay.svg" />
      </Head>

      <header className={styles.topbar}>
        <div className={styles.left}>
          <img src="/logoplay.svg" alt="Google Play" className={styles.playLogo} />
          <span className={styles.playText}>Google Play</span>
        </div>
        <div className={styles.right}>
          <img src="/search.svg" alt="Search" className={styles.iconBtn} />
          <img src="/help.svg" alt="Help" className={styles.iconBtn} />
        </div>
      </header>

      <section className={styles.appHeader}>
        <div className={styles.appMainInfo}>
          <div className={styles.appBar}>
            <img src={`https://api.playstores.app/apps/${slug}/icone.png`} alt="App Icon" className={styles.appIcon} />
            <div className={styles.nameApp}>
              <h1 className={styles.appTitle}>{data.titulo}</h1>
              <p className={styles.appCategory}>App</p>
            </div>
          </div>

          <div className={styles.metrics}>
            <div className={styles.metric}>
              <div className={styles.stars}>
                <h1>4.8</h1>
                <img src="/estrelas.svg" alt="Stars" className={styles.stars} />
              </div>
              <span>41k reviews</span>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.metric}>
              <strong>10K+</strong>
              <span>Downloads</span>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.metric}>
              <img src="/livre.png" alt="All ages" className={styles.ageIcon} />
              <span>Rated for all ages</span>
            </div>
          </div>

          <BaixarComPopup slug={slug} />

          <div className={styles.actionLinks}>
            <span className={styles.linkItem}>
              <img src="/compartilhar.svg" alt="Share" />
              Share
            </span>
            <span className={styles.linkItem}>
              <img src="/salvos.svg" alt="Save" />
              Add to wishlist
            </span>
          </div>
        </div>

        <section className={styles.gallerySection}>
          <div className={styles.gallery}>
            <picture>
              <source srcSet={`https://api.playstores.app/apps/${slug}/print1.jpg`} type="image/jpg" />
              <img src={`https://api.playstores.app/apps/${slug}/print1.jpg`} alt="Screenshot 1" />
            </picture>
            <picture>
              <source srcSet={`https://api.playstores.app/apps/${slug}/print2.jpg`} type="image/jpg" />
              <img src={`https://api.playstores.app/apps/${slug}/print2.jpg`} alt="Screenshot 2" />
            </picture>
          </div>

          <div className={styles.aboutSection}>
            <div className={styles.aboutHeader}>
              <h2>About this app</h2>
            </div>
            <p className={styles.description}>
              {data.descricao}
            </p>
            <p className={styles.updateInfo}>
              <strong>Updated on:</strong> April 4, 2025
            </p>
          </div>

          <section className={styles.detailsSection}>
            <div className={styles.tags}>
              <span>Stylized</span>
              <span>Casual</span>
              <span>Check-in</span>
            </div>

            <div className={styles.detailsHeader}>
              <h2>More details</h2>
              <span className={styles.arrow}>›</span>
            </div>

            <p className={styles.securityText}>
              Your safety starts with understanding how developers collect and share your data.  
              Data privacy and security practices may vary based on your use, region, and age.  
              The developer provided this information and may update it over time.
            </p>

            <div className={styles.dataBox}>
              <div className={styles.dataItem}>
                <img src="/compartilhar.svg" alt="Sharing" />
                <p>This app may share these types of data with third parties</p>
              </div>
              <div className={styles.dataItem}>
                <img src="/help.svg" alt="Collection" />
                <p>No data collected</p>
              </div>
              <div className={styles.dataItem}>
                <img src="/salvos.svg" alt="Deletion" />
                <p>You can request data deletion</p>
              </div>
              <a href="#" className={styles.verDetalhes}>View details</a>
            </div>
          </section>

          <section className={styles.reviewsSection}>
            <div className={styles.reviewsHeader}>
              <h2>Ratings and reviews</h2>
              <span className={styles.arrow}>›</span>
            </div>

            <p className={styles.reviewsSubtext}>
              Ratings and reviews are verified
              <img src="/help.svg" alt="Help" className={styles.infoIcon} />
            </p>

            <div className={styles.reviewTabs}>
              <button className={styles.tabActive}>
                <img src="/telefone.svg" alt="Phone" />
                Phone
              </button>
            </div>

            <div className={styles.reviewContent}>
              <div className={styles.reviewScore}>
                <div className={styles.score}>4.8</div>
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
                <div className={styles.total}>404k reviews</div>
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
                data: '05/07/2025',
                texto: data.comentarios?.[0],
                util: 59,
                avatar: '/pessoa1.png',
              },
              {
                nome: 'Caio Silva',
                data: '04/02/2025',
                texto: data.comentarios?.[1],
                util: 29,
                avatar: '/pessoa2.png',
              },
              {
                nome: 'Lucas Rodrigues',
                data: '12/13/2024',
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
                  This review was marked helpful by {r.util} users
                </p>

                <div className={styles.buttonsRow}>
                  <span>Was this helpful?</span>
                  <button>Yes</button>
                  <button>No</button>
                </div>
              </div>
            ))}

            <a href="#" className={styles.seeAll}>See all reviews</a>
          </section>

          <section className={styles.footerPlayStore}>
            <div className={styles.footerTop}>
              <div className={styles.footerGroup}>
                <h4>Google Play</h4>
                <ul>
                  <li>Play Pass</li>
                  <li>Play Points</li>
                  <li>Gift cards</li>
                  <li>Redeem</li>
                  <li>Refund Policy</li>
                </ul>
              </div>
              <div className={styles.footerGroup}>
                <h4>Children & Family</h4>
                <ul>
                  <li>Family Guide</li>
                  <li>Family Sharing</li>
                </ul>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <ul>
                <li>Terms of Service</li>
                <li>Privacy</li>
                <li>About Google Play</li>
                <li>Developers</li>
                <li>Google Store</li>
                <li>United States (English)</li>
              </ul>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}
