import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

type ItemDef = {
  image?: string;
  item?: string;
  label?: string;
  count?: number;
};

export interface MinecraftRecipeProps {
   pattern: string[];
   keyMap: Record<string, ItemDef>;
   result: ItemDef;
   size?: number;
  textures?: Record<string, string>;
}

function resolveImagePath(image: string) {
  if (!image) return '';
  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/')) {
    return image;
  }
  return `/img/items/${image}`;
}

function normalizeTexturesBase(url: string) {
  if (!url) return '';
  url = url.trim().replace(/\/+$/g, '');
  if (url.includes('raw.githubusercontent.com')) return url;
  try {
    const u = new URL(url);
    if (u.hostname === 'github.com') {
      const parts = u.pathname.split('/').filter(Boolean);
      const treeIndex = parts.indexOf('tree');
      if (treeIndex >= 0 && parts.length > treeIndex + 2) {
        const owner = parts[0];
        const repo = parts[1];
        const branch = parts[treeIndex + 1];
        const pathParts = parts.slice(treeIndex + 2).join('/');
        return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${pathParts}`;
      }
    }
  } catch (e) {
  }
  return url;
}

function resolveItemToUrl(itemId: string, mcVersion = '1.21.11', textures?: Record<string, string>) {
   if (!itemId) return '';
  const [prefix, rest] = itemId.split(':');
   if (!rest) return '';
   if (prefix === 'minecraft') {
     return `https://assets.mcasset.cloud/${mcVersion}/assets/${prefix}/textures/${rest}.png`;
   }
  if (textures && textures[prefix]) {
    const base = normalizeTexturesBase(textures[prefix]);
    const path = rest + (rest.endsWith('.png') ? '' : '.png');
    return `${base.replace(/\/+$/,'')}/${path}`;
  }
  return `/img/items/${prefix}/${rest}${rest.endsWith('.png') ? '' : '.png'}`;
}

export const MinecraftRecipe = ({ pattern, keyMap, result, size = 48, mcVersion = '1.21.11', textures }: MinecraftRecipeProps & { mcVersion?: string }) => {
  const craftingBg = resolveImagePath('crafting_table.png');
  const [bgDim, setBgDim] = useState<{w:number; h:number} | null>(null);
  useEffect(() => {
    const img = new Image();
    img.src = craftingBg;
    img.onload = () => {
      setBgDim({w: img.naturalWidth, h: img.naturalHeight});
    };
  }, [craftingBg]);

  const rows = Math.max(1, pattern?.length || 0);
  const cols = Math.max(
    1,
    pattern && pattern.length > 0 ? Math.max(...pattern.map((r) => r.length)) : 0,
  );

  const inputOffsetX = 8;
  const inputOffsetY = 8;
  const inputCellSize = 18;

  const resultOffsetX = 98;
  const resultOffsetY = 22;
  const resultBoxW = 26;
  const resultBoxH = 26;

  const bgScale = 2;

  const sInputOffsetX = inputOffsetX * bgScale;
  const sInputOffsetY = inputOffsetY * bgScale;
  const sInputCellSize = inputCellSize * bgScale;
  const sResultOffsetX = resultOffsetX * bgScale;
  const sResultOffsetY = resultOffsetY * bgScale;
  const sResultBoxW = resultBoxW * bgScale;
  const sResultBoxH = resultBoxH * bgScale;

  const fallbackContainerWidth = Math.max(sInputOffsetX + cols * sInputCellSize, sResultOffsetX + sResultBoxW) + 8;
  const fallbackContainerHeight = Math.max(sInputOffsetY + rows * sInputCellSize, sResultOffsetY + sResultBoxH) + 8;
  const containerWidth = bgDim ? Math.round(bgDim.w * bgScale) : fallbackContainerWidth;
  const containerHeight = bgDim ? Math.round(bgDim.h * bgScale) : fallbackContainerHeight;

  const cells: Array<Array<string>> = [];
  for (let r = 0; r < rows; r++) {
    const row = pattern[r] || '';
    const rowCells: string[] = [];
    for (let c = 0; c < cols; c++) {
      rowCells.push(row[c] || ' ');
    }
    cells.push(rowCells);
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.gridCrafting}
        style={{
          position: 'relative',
          width: containerWidth,
          height: containerHeight,
        }}
        aria-hidden={false}
      >
        <img
          src={craftingBg}
          alt="crafting background"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: bgDim ? `${bgDim.w * bgScale}px` : `${containerWidth}px`,
            height: bgDim ? `${bgDim.h * bgScale}px` : `${containerHeight}px`,
            pointerEvents: 'none',
            imageRendering: 'pixelated',
          }}
        />

        {cells.map((row, r) =>
          row.map((ch, c) => {
            const def = keyMap[ch];
            let img: string | undefined;
            if (def) {
              if (def.image) img = resolveImagePath(def.image);
              else if (def.item) img = resolveItemToUrl(def.item, mcVersion, textures);
            }
            const title = def?.label || undefined;
            const left = sInputOffsetX + c * sInputCellSize;
            const top = sInputOffsetY + r * sInputCellSize;
            return (
              <div
                key={`${r}-${c}`}
                className={styles.cellCrafting}
                title={title}
                style={{ width: sInputCellSize, height: sInputCellSize, left, top }}
              >
                {img ? (
                  <img
                    src={img}
                    alt={title || ch}
                    className={styles.itemImg}
                    style={{
                      width: `${Math.round(sInputCellSize * 0.8)}px`,
                      height: `${Math.round(sInputCellSize * 0.8)}px`,
                      maxWidth: 'none',
                      maxHeight: 'none',
                    }}
                  />
                ) : (
                  <div className={styles.empty} />
                )}
                {def?.count ? <div className={styles.countBadge}>{def.count}</div> : null}
              </div>
            );
          }),
        )}

        <div
          className={styles.resultCrafting}
          style={{ position: 'absolute', left: sResultOffsetX, top: sResultOffsetY, width: sResultBoxW, height: sResultBoxH }}
          title={result.label}
        >
          {result.item ? (
            <img
              src={resolveItemToUrl(result.item, mcVersion, textures)}
              alt={result.label || 'result'}
              className={styles.itemImg}
              style={{
                width: `${Math.round(sResultBoxW * 0.9)}px`,
                height: `${Math.round(sResultBoxH * 0.9)}px`,
                maxWidth: 'none',
                maxHeight: 'none',
              }}
            />
          ) : (
            <img
              src={resolveImagePath(result.image || '')}
              alt={result.label || 'result'}
              className={styles.itemImg}
              style={{
                width: `${Math.round(sResultBoxW * 0.9)}px`,
                height: `${Math.round(sResultBoxH * 0.9)}px`,
                maxWidth: 'none',
                maxHeight: 'none',
              }}
            />
          )}
          {result.count ? <div className={styles.countBadge}>{result.count}</div> : null}
        </div>
      </div>
    </div>
  );
};

export default MinecraftRecipe;
