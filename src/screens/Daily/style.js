import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 2px 0px 7px inset black;

    @media screen and (max-width: 768px) {
        box-shadow: 0px 0px 7px inset black;
    }
`;

export const Context = styled.div`
    width: 100%;
    height: 80%;
`;

export const Butons = styled.div`
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

  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;