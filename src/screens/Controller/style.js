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

export const UploadContainer = styled.div`
  display: grid;
  width: 100%;
  max-width: 800px;
  margin: 40px auto 0 auto; /* margin top para dar respiro */
  text-align: center;
  justify-content: center;
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

export const Preview = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

export const FileInput = styled.input`
  margin-bottom: 10px;
`;

export const ButtonUpload = styled.button`
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

export const ButtonDelete = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  max-width: 200px;

  &:hover {
    background-color: #c0392b;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

export const ModalOverlayDelete = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  background: white;
  padding: 20px 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

export const ModalButtonsDelete = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;

  button {
    padding: 8px 20px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }

  button:first-child {
    background-color: #e74c3c;
    color: white;
  }

  button:last-child {
    background-color: #bdc3c7;
  }

  button:hover:first-child {
    background-color: #c0392b;
  }

  button:hover:last-child {
    background-color: #a5a5a5;
  }
`;

export const TurmaList = styled.ul`
  text-align: left;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const TurmaItem = styled.li`
  margin-bottom: 8px;
  font-weight: 500;
`;

export const Button = styled.button`
  margin-top: 15px;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: #007bff;
  color: white;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background: #0056b3;
  }
`;