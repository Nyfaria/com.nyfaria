import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        {/* Render tagline preserving blank lines as paragraph breaks and single newlines as line breaks */}
        <div className={clsx('hero__subtitle', styles.subtitleLeft)}>
            Welcome to Modding with Nyfaria!<br/><br/>

            Nyfaria, also known as Anthony Jones, is a well-known figure in the modding community. He creates and maintains a variety of popular mods that enhance the gameplay experience by adding new features and mechanics. Some of his notable mods include:<br/>

            1. Nyf's Spiders - This mod improves the behavior of spider, allowing them to climb walls and ceilings more realistically.<br/>
            2. Nyf's Quivers - This mod introduces Quivers with different capacities and various functionalities such as toggling between different types of arrows.<br/><br/>
            Nyfaria is active on platforms like GitHub and Discord, where he shares his work and collaborates with other developers. His contributes to the Minecraft modding community have made him a respected and influential figure among players and fellow Modders alike.<br/><br/>

            -ChatGPT
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      {/* HomepageFeatures removed so the three default feature cards do not show */}
    </Layout>
  );
}
