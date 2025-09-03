import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const CardTitle = styled.h3`
  color: #333;
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
`;

const CardContent = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <StyledCard>
      <CardTitle>{title}</CardTitle>
      <CardContent>{children}</CardContent>
    </StyledCard>
  );
};

export default Card;
