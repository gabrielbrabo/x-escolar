import styled from 'styled-components';

export const Container = styled.div`
width: 100%;
height: 90vh;
display: flex;
flex-direction: column;
box-shadow: 2px 0px 7px inset black;

@media screen and (max-width: 768px) {
    box-shadow: 0px 0px 7px inset black;
}
`;

export const InputArea = styled.div`
    display: grid;
    padding: 40px;
`;
export const ToGoBack = styled.button`
    justify-content: center;
    border: none;
    margin-top: 20px;
  
  

`;
