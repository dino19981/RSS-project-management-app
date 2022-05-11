import React from 'react';

import styles from './style.module.scss';

export default function Preloader() {
  return (
    <div className={styles.preloader} aria-label="preloader">
      <div className={styles.loader} />
    </div>
  );
}
