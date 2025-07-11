import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px 10px; /* padding lateral reduzido para mobile */
  display: flex;
  flex-direction: column; /* empilha vertical */
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 480px) {
    padding: 0px;
  }
`;

export const ContainerYearControl = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto 0 auto; /* margin top para dar respiro */
  text-align: center;
  padding: 40px 20px;
  border: 2px solid #333;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 0px;
  }
`;

export const YearBox = styled.div`
  margin: 20px 0;

  p {
    font-size: 1.2rem;
    margin: 0;

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }

  h1 {
    font-size: 3rem;
    margin: 10px 0 0 0;
    color: #333;

    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
`;

export const ButtonNextYear = styled.button`
  margin-top: 20px;
  background: #007bff;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 0;
  }
`;

// Modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;

  @media (max-width: 480px) {
    max-width: 90%;
    padding: 20px;
  }
`;

export const ModalButtons = styled.div`
  margin-top: 20px;

  button {
    margin: 0 10px;
    padding: 8px 16px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }

  button:first-child {
    background-color: #28a745;
    color: white;
  }

  button:last-child {
    background-color: #dc3545;
    color: white;
  }

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;

    button {
      margin: 5px 0;
      width: 100%;
    }
  }
`;
