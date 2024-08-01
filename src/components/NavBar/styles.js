import styled, { css } from "styled-components";

export const Container = styled.section`
  position: absolute;
  backdrop-filter: blur(3px);
  width: 100%;
  height: 0vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2E332E;
  opacity: 0;
  pointer-events: none;
  transform: translateY(50px);

  transition: .5s;

  > svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: white;
    transform: rotate(45deg);
    transition: .7s;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3.5rem;
    transform: scale(0.7);
    transition: .7s;

    @media(min-width: 800px) {
      gap: 1.5rem;
    }
  }
  a {
    color: white;
  }

  .container-user {
    display: grid;
    position: absolute;
    background-color: #a0a0a0;
    width: 95%;
    height: 10vh;
    padding: 5px;
    top: 7rem;

    .user {
      color: white;
    }
    .name-user {
      margin-bottom: 3px;
      font-size: 20px;
    }
    .type-user {
      margin: 0;
      font-size: 15px;
    }
    .butto-exit {
      width: 70px;
      height: 40px;
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }
  }

  ${({ isVisible }) => isVisible && css`
    opacity: 1;
    height: 100%;
    pointer-events: auto;
    transform: translateY(0px);

    > svg {
      transform: rotate(0deg);
    }

    nav {
      transform: scale(1);
    }
  `}
`;