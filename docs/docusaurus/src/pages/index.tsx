// File: `index.tsx`

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

// Assuming YourSVGImage is now a React component
import YourSVGImage from '@site/static/img/logo.svg'; // Make sure this import matches your setup

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div style={{ alignItems: 'center' }}>
          {/* Directly render the SVG React component */}
          {/* <YourSVGImage style={{ width: '80px', height: '80px', marginRight: '10px' }} /> */}
          <Heading as="h1" className="hero__title">
            KEYBAN Documentation
          </Heading>
        </div>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
