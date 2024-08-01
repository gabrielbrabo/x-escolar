import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 0px 7px inset black;
    
    align-items: center;

    @media screen and (max-width: 768px) {
        justify-content: center;
        box-shadow: 0px 0px 7px inset black;
    }
`;

export const InputArea = styled.form`
    border-radius: 20px;
    display: flex;
    width: 40%;
    gap: 5px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #1465bb;
    font-size: 20px;
    color: white;

    @media screen and (max-width: 768px) {
        width: 70%;
        padding: 40px;
        gap: 20px;
    }
`;

export const Area = styled.div`
  display: Flex;
  width: 350px;
  height: 40px;
  margin-bottom: 10px;
  background-color: #ebe7eb;
  border-radius: 30px;
  align-items: center;
  justify-content: center; 

  @media screen and (max-width: 768px) {
    width: 330px;
    height: 45px;
  }
`;

export const Btt = styled.button`
    height: 50px;
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #8cfa81;
    font-size: 20px;
    border-radius: 30px;
    border: none;
    align-items: center;
    justify-content: center; 
`;

export const ToGoBack = styled.button`
    justify-content: center;
    border: none;
    margin-top: 20px;
  
  

`;
