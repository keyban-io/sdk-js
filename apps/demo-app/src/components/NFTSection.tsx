import type React from 'react';
import styled from 'styled-components';

interface NFT {
  id: string;
  name: string;
  imageUrl: string;
}

interface NFTSectionProps {
  nfts: NFT[];
}

const NFTContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
`;

const NFTCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: transform 0.3s ease;
  width: 200px;

  &:hover {
    transform: scale(1.05);
    background-color: #f9f9f9;
  }
`;

const NFTImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const NFTDetails = styled.div`
  padding: 0.5rem;
`;

const NFTName = styled.h3`
  font-size: 1em;
  margin: 0;
  color: var(--primary);
`;

const NFTSection: React.FC<NFTSectionProps> = ({ nfts }) => {
  return (
    <NFTContainer>
      {nfts.map((nft) => (
        <NFTCard key={nft.id}>
          <NFTImage src={nft.imageUrl} alt={nft.name} />
          <NFTDetails>
            <NFTName>{nft.name}</NFTName>
          </NFTDetails>
        </NFTCard>
      ))}
    </NFTContainer>
  );
};

export default NFTSection;
