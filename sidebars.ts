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

  modsSidebar: [
    { type: 'doc', id: 'mods/intro', label: 'Welcome' },
    {
      type: 'category',
      label: 'AdvancedWallClimberAPI',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'doc',
        id: 'advancedwallclimberapi/intro',
      },
      items: [
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
      link: {
        type: 'doc',
        id: 'fancyframes/intro',
      },
      items: [
        'fancyframes/installation',
        'fancyframes/usage',
        { type: 'doc', id: 'fancyframes/recipe', label: 'Recipes' },
      ],
    },
    {
      type: 'category',
      label: 'Another Quality Ore Set',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'doc',
        id: 'anotherqualityoreset/intro',
      },
      items: [
        'anotherqualityoreset/usage',
        {
          type: 'category',
          label: 'Ore Sets',
          collapsed: true,
          items: [
            'anotherqualityoreset/oresets/easium',
            'anotherqualityoreset/oresets/medium',
            'anotherqualityoreset/oresets/hardium',
            'anotherqualityoreset/oresets/telos',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: "Nyf's Quivers",
      collapsible: true,
      collapsed: true,
      link: {
        type: 'doc',
        id: 'nyfsquiver/intro',
      },
      items: [
        { type: 'doc', id: 'nyfsquiver/recipes', label: 'Recipes' },
      ],
    },
    {
      type: 'category',
      label: 'Pet Shop',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'doc',
        id: 'petshop/intro',
      },
      items: [
        'petshop/behavior',
        {
          type: 'category',
          label: 'Items',
          collapsed: true,
          items: [
            'petshop/items/leashes',
            'petshop/items/pet-doors',
            'petshop/items/balls',
            'petshop/items/pet-treats',
          ],
        },
        {
          type: 'category',
          label: 'Villagers',
          collapsed: true,
          items: [
            'petshop/villagers/pet-supplier',
            'petshop/villagers/pet-groomer',
          ],
        },
        {
          type: 'category',
          label: 'Pets',
          collapsed: true,
          items: [
            {
              type: 'category',
              label: 'Dogs',
              collapsed: true,
              link: {
                type: 'doc',
                id: 'petshop/pets/dogs/intro',
              },
              items: [
                'petshop/pets/dogs/sable-husky',
                'petshop/pets/dogs/black-and-white-husky',
                'petshop/pets/dogs/super-mutt',
                'petshop/pets/dogs/sheltie',
                'petshop/pets/dogs/english-cocker-spaniel',
              ],
            },
            {
              type: 'category',
              label: 'Cats',
              collapsed: true,
              link: {
                type: 'doc',
                id: 'petshop/pets/cats/intro',
              },
              items: [
                'petshop/pets/cats/american-shorthair',
                'petshop/pets/cats/calico',
                'petshop/pets/cats/black-tuxedo',
                'petshop/pets/cats/munchkin',
              ],
            },
            {
              type: 'category',
              label: 'Birds',
              collapsed: true,
              link: {
                type: 'doc',
                id: 'petshop/pets/birds/intro',
              },
              items: [
                'petshop/pets/birds/white-striped-parrot',
                'petshop/pets/birds/gold-dashed-parrot',
                'petshop/pets/birds/red-accent-parrot',
                'petshop/pets/birds/tropical-parrot',
              ],
            },
            {
              type: 'category',
              label: 'Dragons',
              collapsed: true,
              link: {
                type: 'doc',
                id: 'petshop/pets/dragons/intro',
              },
              items: [
                'petshop/pets/dragons/aurora',
                'petshop/pets/dragons/mossflare',
              ],
            },
            {
              type: 'category',
              label: 'Misc',
              collapsed: true,
              link: {
                type: 'doc',
                id: 'petshop/pets/misc/intro',
              },
              items: [
                'petshop/pets/misc/derpy-ghost',
              ],
            },
          ],
        },
      ],
    }
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
