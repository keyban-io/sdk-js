import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QRCode from "qrcode.react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";

const WalletDashboard = styled.div`
  padding: 20px;
  background-color: var(--primary-lightest);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Notification = styled.span`
  cursor: pointer;
  color: var(--primary);
`;

const BackButton = styled.button`
  margin-top: 20px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  display: block;
  margin: 20px auto;

  &:hover {
    background-color: var(--primary-hover-color);
  }
`;

const AddressText = styled.h2`
  margin-bottom: 20px;
  word-wrap: break-word;
  font-size: 1.2em;
  color: var(--primary);
`;

const QRCodeContainer = styled.div`
  padding: 20px;
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  display: inline-block;
`;

const QRCodePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address = new URLSearchParams(location.search).get("address");

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <WalletDashboard>
      <Header>
        <span>Keyban WAAS Demo</span>
        <Notification>
          <FontAwesomeIcon icon={faBell} />
        </Notification>
      </Header>
      <Section>
        <AddressText>{address || "No address provided"}</AddressText>
        {address ? (
          <QRCodeContainer>
            <QRCode value={address} size={256} level="H" />
          </QRCodeContainer>
        ) : (
          <p>Loading address...</p>
        )}
        <BackButton type="button" onClick={handleBackClick}>
          Back to Dashboard
        </BackButton>
      </Section>
    </WalletDashboard>
  );
};

export default QRCodePage;
