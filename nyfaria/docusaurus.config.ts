import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: 'Home',
    tagline: 'Welcome to Modding with Nyfaria!\n' +
        '\n' +
        'Nyfaria, also known as Anthony Jones, is a well-known figure in the modding community. He creates and maintains a variety of popular mods that enhance the gameplay experience by adding new features and mechanics. Some of his notable mods include:\n' +
        '\n' +
        'Nyf\'s Spiders - This mod improves the behavior of spider, allowing them to climb walls and ceilings more realistically.\n' +
        'Nyf\'s Quivers - This mod introduces Quivers with different capacities and various functionalities such as toggling between different types of arrows.\n' +
        'Nyfaria is active on platforms like GitHub and Discord, where he shares his work and collaborates with other developers. His contributes to the Minecraft modding community have made him a respected and influential figure among players and fellow Modders alike.\n' +
        '\n' +
        '-ChatGPT',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    // Set the production url of your site here
    url: 'https://nyfaria.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'facebook', // Usually your GitHub org/user name.
    projectName: 'nyfaria', // Usually your repo name.

    onBrokenLinks: 'throw',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    // Useful options to enforce blogging best practices
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        colorMode: {
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: 'Nyfaria',
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.png',
            },
            items: [
                // Docs version dropdown (shows released versions and "next")
                {
                    type: 'docsVersionDropdown',
                    position: 'left',
                    dropdownActiveClassDisabled: true,
                    versions: {
                        '1.21.1': {
                            label: '1.21.1'
                        },
                        '1.21.5': {
                            label: '1.21.5'
                        }
                    }
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'modsSidebar',
                    position: 'left',
                    label: 'Mods',
                    to: '/docs',
                },
                {to: '/blog', label: 'Blog', position: 'left'},
                {
                    href: 'https://github.com/Nyfaria/',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'AdvancedWallClimberAPI',
                            to: '/docs/advancedwallclimberapi/intro',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Discord',
                            href: 'https://discordapp.com/invite/WbNYM68Bkt',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'GitHub',
                            href: 'https://github.com/Nyfaria/',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Nyfaria. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
