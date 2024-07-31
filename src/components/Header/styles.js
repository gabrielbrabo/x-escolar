import styled from "styled-components";

export const Container = styled.header`
  background: #2E332E;
  
  height: 4vh;
  padding: 14px ;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    display: flex;
    height: 6vh;
    width: 20%;
    font-size: 30px;
    align-items: center;
    justify-content: center;
    color: #83D6E3;
  }

  .user {
    display: none;
  }
  
  @media(min-width: 768px) {
    .user {
      display: flex;
      background-color: #a0a0a0;
      width: 25%;
      height: 6vh;
      align-items: center;
      padding: 3px;
      justify-content: space-between;
      .name-user {
        font-size: 15px;
      }
      .type-user {
        font-size: 10px;
      }
      .butto-exit {
        width: 50px;
        height: 30px;
        top: 0.5rem;
      }
    }
  }

  > section {
    gap: 2rem;

    &:last-child {
      gap: 1rem;
    }

    > img {
      width: 230px;

      @media(max-width: 500px) {
        width: 120px;
      }
    }

    > nav {
      display: flex;
      gap: 1rem;

      a {
        color: white;
        font-size: 20px;
        position: relative;

        &:before {
          content: '';
          border-radius: 50px;
          bottom: 0px;
          position: absolute;
          width: 0%;
          height: 2px;
          background: #3CA63A;
          transition: .3s;
        }

        &:hover {
            &:before {
                width: 100%;
            }
        }
      }
    }
    .mobile {
      display: none;
    }

    @media(max-width: 768px) {
        .mobile {
            display: initial;
        }
      > nav {
        display: none;
      }
    }
  }

  @media(max-width: 768px) {
    padding: 14.5px 16px;
  }
`;