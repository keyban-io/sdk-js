import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

type FeatureItem = {
  title: string;
  imageSrc: string;
  description: JSX.Element;
  buttonLabel?: string; // New optional property for button label
  buttonLink?: string; // New optional property for button link
};

// Update your FeatureList to include a label and link for each button
const FeatureList: FeatureItem[] = [
  {
    title: 'Smart Wallet as a Service',
    imageSrc: require('@site/static/img/smart-wallet-as-a-service.png').default,
    description: (
      <>
        Onboard millions of users with your favorite applications.
      </>
    ),
    buttonLabel: 'Get started', // Set button label
    buttonLink: '/smart-wallet', // Set relative or absolute path
  },
  {
    title: 'Tokenization as a Service',
    imageSrc: require('@site/static/img/tokenization-as-a-service.png').default,
    description: (
      <>
        Tokenize products, services, and loyalty cards in a snap. Leverage end-to-end traceability.
      </>
    ),
    buttonLabel: 'Get started',
    buttonLink: '/tokenization',
  },
  {
    title: 'Privacy preserving customer relationship',
    imageSrc: require('@site/static/img/privacy-preserving-customer-relationship.png').default,
    description: (
      <>
        Compute insights from end-to-end digital passport tracking. No GDPR, no cookies.
      </>
    ),
    buttonLabel: 'Get started',
    buttonLink: '/privacy',
  },
];

function Feature({ title, imageSrc, description, buttonLabel, buttonLink }: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureItem)}>
      <div className="text--center">
        <img src={imageSrc} className={styles.featureSvg} alt={title} />
      </div>
      <div className={clsx('text--center padding-horiz--md', styles.featureContent)}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
      {buttonLabel && buttonLink && (
        <div className="text--center">
          <Link to={buttonLink} className={clsx('button button--primary', styles.featureButton)}>
            {buttonLabel}
          </Link>
        </div>
      )}
    </div>
  );
}


export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
