import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const ContainerDivs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 93%;
  max-width: 1000px;
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const ContainerYear = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }
`;

export const DivAddEmp = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const AddEmp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  h3 {
    font-size: 1.2em;
  }

  @media (max-width: 768px) {

    h3 {
      margin-bottom: 10px;
    }
  }
`;

export const Btt02 = styled.button`
   background-color: #007BFF;
  color: white;
  border: none;
  height: 37px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
  @media (max-width: 768px) {
    padding:  8px;
  }
`;

export const DivDados = styled.div`
  width: 100%;

  p {
    font-size: 1em;
  }

  @media (max-width: 768px) {
    p {
      font-size: 0.9em;
    }
  }
`;

export const Btt03 = styled.button`
  background-color: #FFC107; /* Cor de aviso (amarelo) */
  color: #212529; /* Texto escuro para contraste */
  border: none;
  height: 37px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0a800; /* Amarelo mais escuro no hover */
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px);
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 0 10px #00000030;

  h3 {
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
  }

  .modal-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  .modal-button {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s;
  }

  .confirm {
    background: #4caf50;
    color: #fff;
  }

  .confirm:hover {
    background: #43a047;
  }

  .cancel {
    background: #f44336;
    color: #fff;
  }

  .cancel:hover {
    background: #e53935;
  }
`;
