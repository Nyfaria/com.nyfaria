import React from 'react';
import authors from '@site/src/data/authors';
import styles from './styles.module.css';

type Props = {
  Authors?: string[] | string;
  authors?: string[] | string;
  CurseForge?: string;
  Modrinth?: string;
  GitHub?: string;
  className?: string;
};

export default function ModInfo({Authors, authors: authorsProp, CurseForge, Modrinth, GitHub, className}: Props) {
  const raw = (Authors ?? authorsProp) as any;
  let list: string[] = [];
  if (!raw) list = [];
  else if (Array.isArray(raw)) list = raw.map(String);
  else if (typeof raw === 'string') {
    list = raw.split(',').map(s => s.trim()).filter(Boolean);
  }

  if (list.length === 0) return null;

  const titleText = list.length > 1 ? 'Mod Authors' : 'Mod Author';

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.mainRow}>
        <div className={styles.leftColumn}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{titleText}</h3>
          </div>
          <div className={styles.container}>
            {list.map((key) => {
              const k = String(key).trim();
              const info = (authors as any)[k];
              if (!info) {
                const maybe = (authors as any)[k.toLowerCase()];
                if (maybe) {
                  return renderAuthor(k.toLowerCase(), maybe);
                }
                return (
                  <div key={k} className={styles.author}>
                    <div className={styles.avatar} />
                    <div className={styles.meta}>
                      <div className={styles.name}>Unknown author ({k})</div>
                    </div>
                  </div>
                );
              }
              return renderAuthor(k, info);
            })}
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.linksTitle}>Links</div>
          <div className={styles.linkIcons}>
            {GitHub && (
              <a href={`https://github.com/${GitHub}`} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.iconLink}>
                {/* GitHub icon */}
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M8 0a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52 0-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.58 7.58 0 012-.27 7.6 7.6 0 012 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.28.24.54.73.54 1.49 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8 8 0 008 0z"/></svg>
              </a>
            )}
            {CurseForge && (
              <a href={`https://www.curseforge.com/minecraft/mc-mods/${CurseForge}`} target="_blank" rel="noopener noreferrer" aria-label="CurseForge" className={styles.iconLink}>
                {/* Simple CF icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 53.5"><path fill="#FF6700" fillRule="evenodd" d="M0 6.9082l27.9532.0756L26.269 0h73.7449l-.0164 8.1433C87.5 10.6348 78.6726 16.775 74.825 36.34H72.046l-1.5815 4.359h2.3079l3.9906 12.8087H37.961l3.9184-12.8086h2.325l-1.6467-4.359h-2.7642l-5.1516-13.7535C13.5203 21.3437 2.6748 16.9042 0 6.9082zM58.6772 39.062c-3.082-5.6216-5.1058-1.197-11.4454-6.9496-2.4727-2.2436-3.4588-8.8199 2.097-10.8301-2.5255 5.5749 4.0297 7.8558 5.5898 4.6685.709-1.4486 1.6039-4.1204-.9798-5.9518-1.392-.9867-1.9281-3.9125-.7364-5.5388.3837 1.2093 1.5938 2.5013 3.916 1.5411-4.9192-8.1404 2.934-10.9457 6.7104-10.5817-3.9686.441-6.025 3.977-4.2196 7.8269 1.15 2.452 2.9006 3.6589 3.4097 5.6657-1.6952.1263-2.1852.9065-2.1495 2.362.0268 1.0895 2.5496 2.6646 2.9494-.4456 1.175 2.4245-.2407 3.8496-1.0129 4.9984-1.7824 2.6515-.1036 5.4107 2.1097 3.3067.9547-.9074 1.6155-2.5812.4048-5.318 2.229 1.776 4.5057 6.5447.9079 10.677-1.756 2.017-6.9514 1.391-7.551 4.5693z"/></svg>
              </a>
            )}
            {Modrinth && (
              <a href={`https://modrinth.com/mod/${Modrinth}`} target="_blank" rel="noopener noreferrer" aria-label="Modrinth" className={styles.iconLink}>
                {/* Simple Modrinth icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Modrinth SVG Icon</title><path fill="#1BD96A" d="M12.252.004a11.78 11.768 0 0 0-8.92 3.73a11 11 0 0 0-2.17 3.11a11.37 11.359 0 0 0-1.16 5.169c0 1.42.17 2.5.6 3.77c.24.759.77 1.899 1.17 2.529a12.3 12.298 0 0 0 8.85 5.639c.44.05 2.54.07 2.76.02c.2-.04.22.1-.26-1.7l-.36-1.37l-1.01-.06a8.5 8.489 0 0 1-5.18-1.8a5.3 5.3 0 0 1-1.3-1.26c0-.05.34-.28.74-.5a37.572 37.545 0 0 1 2.88-1.629c.03 0 .5.45 1.06.98l1 .97l2.07-.43l2.06-.43l1.47-1.47c.8-.8 1.48-1.5 1.48-1.52c0-.09-.42-1.63-.46-1.7c-.04-.06-.2-.03-1.02.18c-.53.13-1.2.3-1.45.4l-.48.15l-.53.53l-.53.53l-.93.1l-.93.07l-.52-.5a2.7 2.7 0 0 1-.96-1.7l-.13-.6l.43-.57c.68-.9.68-.9 1.46-1.1c.4-.1.65-.2.83-.33c.13-.099.65-.579 1.14-1.069l.9-.9l-.7-.7l-.7-.7l-1.95.54c-1.07.3-1.96.53-1.97.53c-.03 0-2.23 2.48-2.63 2.97l-.29.35l.28 1.03c.16.56.3 1.16.31 1.34l.03.3l-.34.23c-.37.23-2.22 1.3-2.84 1.63c-.36.2-.37.2-.44.1c-.08-.1-.23-.6-.32-1.03c-.18-.86-.17-2.75.02-3.73a8.84 8.84 0 0 1 7.9-6.93c.43-.03.77-.08.78-.1c.06-.17.5-2.999.47-3.039c-.01-.02-.1-.02-.2-.03Zm3.68.67c-.2 0-.3.1-.37.38c-.06.23-.46 2.42-.46 2.52c0 .04.1.11.22.16a8.51 8.499 0 0 1 2.99 2a8.38 8.379 0 0 1 2.16 3.449a6.9 6.9 0 0 1 .4 2.8c0 1.07 0 1.27-.1 1.73a9.4 9.4 0 0 1-1.76 3.769c-.32.4-.98 1.06-1.37 1.38c-.38.32-1.54 1.1-1.7 1.14c-.1.03-.1.06-.07.26c.03.18.64 2.56.7 2.78l.06.06a12.07 12.058 0 0 0 7.27-9.4c.13-.77.13-2.58 0-3.4a11.96 11.948 0 0 0-5.73-8.578c-.7-.42-2.05-1.06-2.25-1.06Z"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function renderAuthor(id: string, info: any) {
    const img = info.image_url || info.image || '';
    const url = info.page ? `/blog/authors/${id}` : (info.url || '#');
    return (
      <div key={id} className={styles.author}>
        <a className={styles.avatarLink} href={url} target="_blank" rel="noopener noreferrer">
          {img ? (
            <img className={styles.avatar} src={img} alt={info.name || id} />
          ) : (
            <div className={styles.avatarPlaceholder} />
          )}
        </a>
        <div className={styles.meta}>
          <a className={styles.name} href={url} target="_blank" rel="noopener noreferrer">{info.name || id}</a>
          <div className={styles.socials}>
            {info.socials?.github && (
              <a href={`https://github.com/${info.socials.github}`} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M8 0a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52 0-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.58 7.58 0 012-.27 7.6 7.6 0 012 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.28.24.54.73.54 1.49 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8 8 0 008 0z"/></svg>
              </a>
            )}
            {info.socials?.x && (
              <a href={`https://x.com/${info.socials.x}`} target="_blank" rel="noopener noreferrer" aria-label="X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 3.43c-.8.37-1.66.61-2.56.72.92-.55 1.62-1.42 1.95-2.46-.86.5-1.8.86-2.81 1.06C18.7 2.2 17.58 1.6 16.34 1.6c-2.26 0-4.08 1.83-4.08 4.08 0 .32.04.63.11.93C8.2 6.38 4.3 4.5 1.67 1.15c-.35.6-.55 1.3-.55 2.04 0 1.4.71 2.63 1.79 3.35-.66-.02-1.28-.2-1.82-.5v.05c0 1.96 1.4 3.6 3.26 3.98-.34.09-.69.14-1.06.14-.26 0-.51-.03-.75-.07.51 1.6 2 2.77 3.77 2.81C6.4 16.6 4.3 17.35 2 17.21c1.86 1.19 4.07 1.88 6.45 1.88C16.3 19.09 20 13.8 20 8.75c0-.28 0-.55-.02-.82.78-.56 1.45-1.26 1.98-2.06z" fill="#fff"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
}
