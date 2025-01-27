import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px 0px 7px inset black;

    @media screen and (max-width: 768px) {
        box-shadow: 0px 0px 7px inset black;
    }
`;

export const Context = styled.div`
    width: 100%;
    min-height: 80vh;
`;

export const Butons = styled.div`
    width: 100%;
    display: flex;
    min-height: 10vh;
    max-height: 10vh;
    background-color: #ced1c0;
    gap: 20px;
    box-shadow: 0px 0px 7px inset black;

    @media screen and (max-width: 768px) {
      padding-top: 20px;
      padding-bottom: 20px;
      flex-direction: column;
    }
`;
export const BottomButons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
export const UpperButons = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    
`;

export const Btt02 = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 360px)  {
      font-size: 10px; /* Smartphones pequenos */
    }

  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;