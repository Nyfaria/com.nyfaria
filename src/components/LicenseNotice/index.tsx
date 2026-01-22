import React from 'react';
import styles from './styles.module.css';
import {LICENSES} from './licenses';

type Props = {
  title?: string;
  children?: React.ReactNode;
  type?: string;
  Type?: string; // allow both attribute names
};

export default function LicenseNotice({title, children, type, Type}: Props) {
  const key = (Type || type || 'ARR').toUpperCase();
  const license = LICENSES[key];

  // If children provided, prefer that
  if (children) {
    return (
      <aside className={styles.notice}>
        {title && <div className={styles.header}><strong>{title}</strong></div>}
        <div className={styles.content}>{children}</div>
      </aside>
    );
  }

  // If license found in list, render it
  if (license) {
    return (
      <aside className={styles.notice}>
        <div className={styles.header}><strong>{title ?? license.title ?? 'License'}</strong></div>
        <div className={styles.content}>
          {license.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </aside>
    );
  }

  // Fallback text (ARR) if unknown key
  return (
    <aside className={styles.notice}>
      <div className={styles.header}><strong>{title ?? 'License'}</strong></div>
      <div className={styles.content}>
        <p>
          Regardless of this mod being "All Rights Reserved," you are allowed to use it in your modpack,
          depend on it to make addons and such, as long as you do not embed the jar anywhere and the
          downloads will come directly from Modrinth or CurseForge.
        </p>
      </div>
    </aside>
  );
}
