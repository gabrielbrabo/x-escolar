import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const Area = styled.div`
  display: Flex;
  width: 450px;
  height: 55px;
  background-color: #ebe7eb;
  border-radius: 30px;
  align-items: center;
  justify-content: center; 

  @media screen and (max-width: 768px) {
    width: 300px;
  }
`;

export const InputArea = styled.div`
    border-radius: 20px;
    display: flex;
    width: 70%;
    gap: 15px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background-color: #1465bb;
    gap: 30px;

    @media screen and (max-width: 768px) {
        gap: 50px;
    }
`;

export const Text = styled.button`
    background-color: transparent;
    border: none;
    font-size: 20px;
`;