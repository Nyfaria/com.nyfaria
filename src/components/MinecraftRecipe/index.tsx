import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

type ItemDef = {
  image?: string;
  item?: string;
  label?: string;
  count?: number;
};

type RecipeType = 'CRAFTING_TABLE' | 'FURNACE' | 'SMITHING';

export interface MinecraftRecipeProps {
  type?: RecipeType;
  pattern?: string[];
  keyMap?: Record<string, ItemDef>;
  input?: ItemDef;
  template?: ItemDef;
  base?: ItemDef;
  addition?: ItemDef;
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

export const MinecraftRecipe = ({ type = 'CRAFTING_TABLE', pattern, keyMap, input, template, base, addition, result, size = 48, mcVersion = '1.21.11', textures }: MinecraftRecipeProps & { mcVersion?: string }) => {
  if (type === 'FURNACE') {
    return <FurnaceRecipe input={input} result={result} mcVersion={mcVersion} textures={textures} />;
  }

  if (type === 'SMITHING') {
    return <SmithingRecipe template={template} base={base} addition={addition} result={result} mcVersion={mcVersion} textures={textures} />;
  }

  return <CraftingTableRecipe pattern={pattern || []} keyMap={keyMap || {}} result={result} size={size} mcVersion={mcVersion} textures={textures} />;
};

const FurnaceRecipe = ({ input, result, mcVersion = '1.21.11', textures }: { input?: ItemDef; result: ItemDef; mcVersion?: string; textures?: Record<string, string> }) => {
  const furnaceBg = resolveImagePath('furnace.png');
  const [bgDim, setBgDim] = useState<{w:number; h:number} | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = furnaceBg;
    img.onload = () => {
      setBgDim({w: img.naturalWidth, h: img.naturalHeight});
    };
  }, [furnaceBg]);

  const bgScale = 2;

  const inputOffsetX = 26;
  const inputOffsetY = 8;
  const inputCellSize = 18;

  const resultOffsetX = 82;
  const resultOffsetY = 21;
  const resultBoxW = 26;
  const resultBoxH = 26;

  const sInputOffsetX = inputOffsetX * bgScale;
  const sInputOffsetY = inputOffsetY * bgScale;
  const sInputCellSize = inputCellSize * bgScale;
  const sResultOffsetX = resultOffsetX * bgScale;
  const sResultOffsetY = resultOffsetY * bgScale;
  const sResultBoxW = resultBoxW * bgScale;
  const sResultBoxH = resultBoxH * bgScale;

  const containerWidth = bgDim ? Math.round(bgDim.w * bgScale) : 176;
  const containerHeight = bgDim ? Math.round(bgDim.h * bgScale) : 76;

  let inputImg: string | undefined;
  if (input) {
    if (input.image) inputImg = resolveImagePath(input.image);
    else if (input.item) inputImg = resolveItemToUrl(input.item, mcVersion, textures);
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
      >
        <img
          src={furnaceBg}
          alt="furnace background"
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

        <div
          className={styles.cellCrafting}
          title={input?.label}
          style={{ width: sInputCellSize, height: sInputCellSize, left: sInputOffsetX, top: sInputOffsetY }}
        >
          {inputImg ? (
            <img
              src={inputImg}
              alt={input?.label || 'input'}
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
          {input?.count ? <div className={styles.countBadge}>{input.count}</div> : null}
        </div>

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

const SmithingRecipe = ({ template, base, addition, result, mcVersion = '1.21.11', textures }: { template?: ItemDef; base?: ItemDef; addition?: ItemDef; result: ItemDef; mcVersion?: string; textures?: Record<string, string> }) => {
  const smithingBg = resolveImagePath('smithing.png');
  const [bgDim, setBgDim] = useState<{w:number; h:number} | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = smithingBg;
    img.onload = () => {
      setBgDim({w: img.naturalWidth, h: img.naturalHeight});
    };
  }, [smithingBg]);

  const bgScale = 2;

  const templateOffsetX = 11.5;
  const templateOffsetY = 27;
  const baseOffsetX = 30;
  const baseOffsetY = 27;
  const additionOffsetX = 48;
  const additionOffsetY = 27;
  const cellSize = 16;

  const resultOffsetX = 102;
  const resultOffsetY = 27;
  const resultBoxW = 16;
  const resultBoxH = 16;

  const sTemplateOffsetX = templateOffsetX * bgScale;
  const sTemplateOffsetY = templateOffsetY * bgScale;
  const sBaseOffsetX = baseOffsetX * bgScale;
  const sBaseOffsetY = baseOffsetY * bgScale;
  const sAdditionOffsetX = additionOffsetX * bgScale;
  const sAdditionOffsetY = additionOffsetY * bgScale;
  const sCellSize = cellSize * bgScale;
  const sResultOffsetX = resultOffsetX * bgScale;
  const sResultOffsetY = resultOffsetY * bgScale;
  const sResultBoxW = resultBoxW * bgScale;
  const sResultBoxH = resultBoxH * bgScale;

  const containerWidth = bgDim ? Math.round(bgDim.w * bgScale) : 260;
  const containerHeight = bgDim ? Math.round(bgDim.h * bgScale) : 68;

  let templateImg: string | undefined;
  if (template) {
    if (template.image) templateImg = resolveImagePath(template.image);
    else if (template.item) templateImg = resolveItemToUrl(template.item, mcVersion, textures);
  }

  let baseImg: string | undefined;
  if (base) {
    if (base.image) baseImg = resolveImagePath(base.image);
    else if (base.item) baseImg = resolveItemToUrl(base.item, mcVersion, textures);
  }

  let additionImg: string | undefined;
  if (addition) {
    if (addition.image) additionImg = resolveImagePath(addition.image);
    else if (addition.item) additionImg = resolveItemToUrl(addition.item, mcVersion, textures);
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
      >
        <img
          src={smithingBg}
          alt="smithing table background"
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

        <div
          className={styles.cellCrafting}
          title={template?.label}
          style={{ width: sCellSize, height: sCellSize, left: sTemplateOffsetX, top: sTemplateOffsetY }}
        >
          {templateImg ? (
            <img
              src={templateImg}
              alt={template?.label || 'template'}
              className={styles.itemImg}
              style={{
                width: `${Math.round(sCellSize * 0.9)}px`,
                height: `${Math.round(sCellSize * 0.9)}px`,
                maxWidth: 'none',
                maxHeight: 'none',
              }}
            />
          ) : (
            <div className={styles.empty} />
          )}
        </div>

        <div
          className={styles.cellCrafting}
          title={base?.label}
          style={{ width: sCellSize, height: sCellSize, left: sBaseOffsetX, top: sBaseOffsetY }}
        >
          {baseImg ? (
            <img
              src={baseImg}
              alt={base?.label || 'base'}
              className={styles.itemImg}
              style={{
                width: `${Math.round(sCellSize * 0.9)}px`,
                height: `${Math.round(sCellSize * 0.9)}px`,
                maxWidth: 'none',
                maxHeight: 'none',
              }}
            />
          ) : (
            <div className={styles.empty} />
          )}
        </div>

        <div
          className={styles.cellCrafting}
          title={addition?.label}
          style={{ width: sCellSize, height: sCellSize, left: sAdditionOffsetX, top: sAdditionOffsetY }}
        >
          {additionImg ? (
            <img
              src={additionImg}
              alt={addition?.label || 'addition'}
              className={styles.itemImg}
              style={{
                width: `${Math.round(sCellSize * 0.9)}px`,
                height: `${Math.round(sCellSize * 0.9)}px`,
                maxWidth: 'none',
                maxHeight: 'none',
              }}
            />
          ) : (
            <div className={styles.empty} />
          )}
        </div>

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

const CraftingTableRecipe = ({ pattern, keyMap, result, size = 48, mcVersion = '1.21.11', textures }: { pattern: string[]; keyMap: Record<string, ItemDef>; result: ItemDef; size?: number; mcVersion?: string; textures?: Record<string, string> }) => {
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
