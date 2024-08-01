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
    color: #1465bb;

    @media(max-width: 768px) {
      width: 50%;
    }
  }

  .container-user {
    display: none;
  }
  
  @media(min-width: 851px) {

    .container-user {
      display: flex;
      background-color: ##2E332E;
      width: 25%;
      height: 6vh;
      align-items: center;
      padding: 3px;
      justify-content: space-between;

    .user {
      color: white;
    }
    .name-user {
      margin: 0px;
      font-size: 15px;
    }
    .type-user {
      margin: 0;
      font-size: 10px;
    }
    .butto-exit {
      width: 50px;
      height: 30px;
      top: 0.5rem;;
    }
  }

    .user {
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

    @media(max-width: 850px) {
        .mobile {
            display: initial;
            color: white;
        }
      > nav {
        display: none;
      }
    }
  }

  @media(max-width: 850px) {
    padding: 14.5px 16px;
  }
`;