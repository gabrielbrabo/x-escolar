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
    color: white;
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

    a {
      color: white;
      font-size: 18px;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #ddd;
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
  width: 80%;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 20px;

  
`;

export const EmployeeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Pro = styled.div`
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
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 150px;
  }
`;

export const Name = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 17px;
  color: #333;

  
`;
export const Span = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 10px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const DivButtomEdit = styled.div`
  display: flex;
  align-items: center;
`;

export const Btt02 = styled.button`
  background-color: #d9534f;
  color: white;
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
