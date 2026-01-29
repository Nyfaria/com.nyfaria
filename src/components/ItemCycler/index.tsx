import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

type ItemDef = {
  image?: string;
  item?: string;
  label?: string;
};

export interface ItemCyclerProps {
  items: ItemDef[];
  width?: number;
  height?: number;
  interval?: number;
  textures?: Record<string, string>;
  mcVersion?: string;
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
  } catch (e) {}
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
    return `${base.replace(/\/+$/, '')}/${path}`;
  }
  return `/img/items/${prefix}/${rest}${rest.endsWith('.png') ? '' : '.png'}`;
}

export const ItemCycler: React.FC<ItemCyclerProps> = ({
  items,
  width = 48,
  height = 48,
  interval = 1000,
  textures,
  mcVersion = '1.21.11',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slotDim, setSlotDim] = useState<{ w: number; h: number } | null>(null);

  const slotBg = resolveImagePath('slot.png');

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];

  let itemImg: string | undefined;
  if (currentItem) {
    if (currentItem.image) {
      itemImg = resolveImagePath(currentItem.image);
    } else if (currentItem.item) {
      itemImg = resolveItemToUrl(currentItem.item, mcVersion, textures);
    }
  }

  const itemSize = Math.round(Math.min(width, height) * 0.8);

  return (
    <div
      className={styles.itemCyclerContainer}
      style={{
        position: 'relative',
        width,
        height,
        display: 'inline-block',
      }}
    >
      <img
        src={slotBg}
        alt="slot background"
        className={styles.slotBackground}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: `${width}px`,
          height: `${height}px`,
          imageRendering: 'pixelated',
          pointerEvents: 'none',
        }}
      />
      <div
        className={styles.itemCyclerItem}
        title={currentItem?.label}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: itemSize,
          height: itemSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {itemImg && (
          <img
            src={itemImg}
            alt={currentItem?.label || 'item'}
            className={styles.itemCyclerImage}
            style={{
              width: `${itemSize}px`,
              height: `${itemSize}px`,
              imageRendering: 'pixelated',
              maxWidth: 'none',
              maxHeight: 'none',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ItemCycler;
