import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {

  // Sidebar that lists Minecraft mods (each mod can be a category that expands to its docs)
  modsSidebar: [
    { type: 'doc', id: 'mods/intro', label: 'Welcome' },
    {
      type: 'category',
      label: 'AdvancedWallClimberAPI',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'advancedwallclimberapi/intro', label: 'Introduction' },
        'advancedwallclimberapi/installation',
        'advancedwallclimberapi/usage',
        'advancedwallclimberapi/api-reference',
      ],
    },
    {
      type: 'category',
      label: 'FancyFrames',
      collapsible: true,
      collapsed: true,
      items: [
        { type: 'doc', id: 'fancyframes/intro', label: 'Introduction' },
        'fancyframes/installation',
        'fancyframes/usage',
        { type: 'doc', id: 'fancyframes/recipe', label: 'Recipes' },
      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
