import React from 'react';
import styled from 'styled-components';

const LoadingSpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;

  p { 
    font-size: 20px;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s linear infinite;
  }

  @media (max-width: 768px) {
    .spinner {
      width: 36px;
      height: 36px;
    }
  }

  @media (min-width: 769px) {
    .spinner {
      width: 48px;
      height: 48px;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = () => (
  <LoadingSpinnerWrapper>
    <p>Aguarde</p>
    <div className="spinner"></div>
  </LoadingSpinnerWrapper>
);

export default LoadingSpinner;