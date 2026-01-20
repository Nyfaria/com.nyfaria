export const LICENSES: Record<string, {title?: string; paragraphs: string[]}> = {
  ARR: {
    title: 'All Rights Reserved (ARR) — Usage Notes',
    paragraphs: [
      'Regardless of this mod being "All Rights Reserved," you are allowed to use it in your modpack, depend on it to make addons and such, as long as you do not embed the jar anywhere and the downloads come directly from Modrinth or CurseForge.',
      'In short: redistribution of the JAR itself (embedding in another downloadable package) is not allowed — linking to and/or fetching from the official distribution (Modrinth/CurseForge) is required.',
    ],
  },
  MIT: {
    title: 'MIT License (summary)',
    paragraphs: [
      'This project is licensed under the MIT License. You are free to reuse, modify, and redistribute the code according to the terms of the MIT license. Include the copyright and license notice when redistributing.',
    ],
  },
  // Add other license types here as needed
};
