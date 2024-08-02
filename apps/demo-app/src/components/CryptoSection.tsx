import type React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Section = styled.div`
  padding: 20px;
  background-color: var(--primary-lightest);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  margin-bottom: 5px;
`;

const CryptoTitle = styled.div`
  font-size: 1.5em;
  margin-bottom: 10px;
  font-weight: bold;
`;

const CryptoList = styled.div`
  margin-bottom: 20px;
`;

const CryptoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px;
  background-color: var(--container-background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
`;

const CryptoName = styled.span`
  font-size: 1.2em;
`;

const CryptoAmount = styled.span`
  font-size: 1.2em;
  margin-right: 20px;
`;

const SendButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-hover-color);
  }

  .fa {
    margin-left: 5px;
  }
`;

const ViewAllButton = styled.button`
  margin-top: 20px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-hover-color);
  }
`;

const CryptoSection: React.FC = () => {
  return (
    <Section>
      <CryptoTitle>Non-Native Cryptocurrencies</CryptoTitle>
      <CryptoList>
        <CryptoItem>
          <CryptoName>AAVE:</CryptoName>
          <CryptoAmount>0.005</CryptoAmount>
          <SendButton type="button">
            Send <FontAwesomeIcon className="fa" icon={faPaperPlane} />
          </SendButton>
        </CryptoItem>
        <CryptoItem>
          <CryptoName>LINK:</CryptoName>
          <CryptoAmount>0.2</CryptoAmount>
          <SendButton type="button">
            Send <FontAwesomeIcon className="fa" icon={faPaperPlane} />
          </SendButton>
        </CryptoItem>
      </CryptoList>
      <ViewAllButton type="button">View All</ViewAllButton>
    </Section>
  );
};

export default CryptoSection;
