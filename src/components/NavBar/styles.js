import styled, { css } from 'styled-components';

export const Container = styled.section`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(46, 51, 46, 0.9);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transform: translateY(50px);
  transition: 0.5s;
  gap: 40px;

  > svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #ff8830;
    transform: rotate(45deg);
    transition: 0.7s;
    cursor: pointer;
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    transform: scale(0.7);
    transition: 0.7s;

    .nav__link.active {
        color: #ff8830;
        font-weight: bold;
        border-bottom: 3px solid  white;
      }

    a {
      color: white;
      font-size: 18px;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #ff8830;
      }
    }

    @media (max-width: 800px) {
      gap: 3rem;
    }
  }

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 1;
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

export const Emp = styled.div`
  width: 95%;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 20px;
    
  p {
    margin: 0;
    text-align: center;
    height: 10px;
    font-size: 13px;
  }

  svg{
    width: 100%;
    display: flex;
    align-items: center;
  }
  
`;

export const EmployeeInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Pro = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
`;

export const ProfilePhoto = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ddd;
  border-radius: 50%;
  margin-right: 15px;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 180px;

  @media (max-width: 768px) {   
    max-width: 100%;
  }
`;

export const Name = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 17px;
  font-weight: bold;
  color: #158fa2;

  
`;
export const Span = styled.span`
  white-space: nowrap;
  display: inline-block;
  margin-bottom: 5px;
  font-size: 10px;
  font-weight: bold;
  color: #158fa2;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const DivButtomEdit = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Btt02 = styled.button`
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c9302c;
  }
  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;
