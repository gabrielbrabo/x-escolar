import styled from 'styled-components';

export const Area = styled.div`
  display: Flex;
  width: 450px;
  height: 40px;
  margin-bottom: 10px;
  background-color: #63C2D1;
  border-radius: 30px;
  align-items: center;
  justify-content: center; 

  @media screen and (max-width: 768px) {
    width: 230px;
  }
`;

export const Input = styled.input`
  width: 85%;
  height: 20px;
  font-size: 16px;
  background-color: transparent;
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;
`;


export const AreaEmp = styled.div`
  display: Flex;
  width: 350px;
  height: 40px;
  background-color: #63C2D1;
  border-radius: 30px;
  align-items: center;
  justify-content: center; 

  
  @media screen and (max-width: 768px) {
    width: 200px;
    height: 28px;
  }
`;

export const InputEmp = styled.input`
  width: 85%;
  height: 20px;
  background-color: transparent;
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;
`;

export const Select = styled.select`

`;