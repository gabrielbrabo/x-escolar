import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
  }
  
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

export const ContainerDivs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 3000px;
`;

export const Details = styled.div`
    background-color: #fff;
    width: 1000px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 768px) {
      
      padding: 15px;  
        width: 95%;
    }
`;

export const ContDiv = styled.div`
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const Info = styled.span`
    font-size: 18px;
    color: #333;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 7px;
    gap: 20px;

    button {
        background-color: #158fa2;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
        &.active {
          background-color: #218838;
          border-bottom: 3px solid #d35400;
          color: white;
          border-radius: 4px;
        }

        &:hover {
            background-color: #218838;
        }

        @media (max-width: 345px)  {
            font-size: 9pt; /* Smartphones pequenos */
        }
        @media (min-width: 345px) and (max-width: 390px) {
            font-size: 10pt; /* Smartphones pequenos */
        }
        @media (min-width: 390px) and (max-width: 768px) {
            font-size: 11pt; /* Smartphones pequenos */
        }

    }
`

export const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Context = styled.div`
    display: flex;
    //align-items: center;
    width: 100%;
    min-height: 80vh;
    border-radius: 8px;
`;

export const EditButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0rem;
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
`

export const ModalInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`

export const ModalSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`

export const ModalButton = styled.button`
  padding: 0.5rem 1rem;
  cursor: pointer;
`

