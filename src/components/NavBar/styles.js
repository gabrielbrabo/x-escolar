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

    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);

  opacity: 0;
  pointer-events: none;
  transform: translateY(50px);

  transition: .5s;

  > svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    transform: rotate(45deg);
    transition: .7s;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    transform: scale(0.7);
    transition: .7s;
  }
  a {
    color: white;
  }

  .user {
    display: grid;
    position: absolute;
    background-color: #a0a0a0;
    width: 95%;
    height: 10vh;
    top: 7rem;
    .name-user {
      font-size: 20px;
    }
    .type-user {
      font-size: 15px;
    }
    .butto-exit {
      width: 50px;
      height: 30px;
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