import styled from 'styled-components';

export const Title = styled.div`
    width: 100%;
    height: 9.5vh;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #b1b1b1;
    color: #007fff;
    box-shadow: 5px 5px 20px #888888;

    .logo {
    display: flex;
    align-items: center;
    font-size: 25px;
    font-weight: bold;
    color: #3f40ea;

    img{
      height: 70px;
      width: 80px;
    }
    @media (max-width: 768px) {
      font-size: 15px;
      width: 80%;

      img{
        height: 50px;
        width: 60px;
      }
    }
  }
`;