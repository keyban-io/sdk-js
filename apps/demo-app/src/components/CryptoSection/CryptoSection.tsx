// src/components/CryptoSection/CryptoSection.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const CryptoSection: React.FC = () => {
  return (
    <div className="section">
      <div>Non-Native Cryptocurrencies</div>
      <div className="crypto">
        - AAVE: 0.005{' '}
        <button type="button">
          Send <FontAwesomeIcon className="fa" icon={faPaperPlane} />
        </button>
      </div>
      <div className="crypto">
        - LINK: 0.2{' '}
        <button type="button">
          Send <FontAwesomeIcon className="fa" icon={faPaperPlane} />
        </button>
      </div>
      <button type="button">View All</button>
    </div>
  );
};

export default CryptoSection;
