// src/components/NFTSection/NFTSection.tsx

import type React from 'react';
import styled from 'styled-components';

const NFTSectionWrapper = styled.div`
  padding: 20px;
  background-color: var(--primary-lightest);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  margin-bottom: 5px;
`;

const NFTSection: React.FC = () => {
  return (
    <NFTSectionWrapper>
      <h2>NFTs</h2>
      <div>5</div>
    </NFTSectionWrapper>
  );
};

export default NFTSection;
