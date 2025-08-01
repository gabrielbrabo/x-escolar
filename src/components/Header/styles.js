import styled from "styled-components";

export const Container = styled.header`
  background: #b1b1b1;
  padding: 5px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logoHome {
    display: flex;
    align-items: center;
    font-size: 21px;
    font-weight: bold;
    color: #3a3a3a;
    gap: 5px;

    svg {
      height: 80px;
      width: 80px;
      color: #0056b3;
      animation: rotateLogo 70s linear infinite; /* Animação de rotação */
    }

    @keyframes rotateLogo {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    img{
      color: #007fff;
      height: 55px;
      width: 60px;
    }
    @media (max-width: 768px) {
      font-size: 15px;
      width: 80%;
      justify-content: flex-start;
      padding: 0;

      img{
        height: 40px;
        width: 45px;
      }

      svg {
        height: 40px;
        width: 45px;
        animation: rotateLogoMobile 70s linear infinite;
      }
    }

    @keyframes rotateLogoMobile {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  @media (max-width: 768px) {
      padding: 5px;
      padding-left: 10px;
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    nav {
      display: flex;
      gap: 1.8rem;

      .nav__link.active {
        color: #1466b8;
        font-weight: bold;
        border-bottom: 3px solid #ff8830;
      }

      a {
        color: #007fff;
        font-size: 18px;
        font-weight: bold;
        position: relative;
        text-decoration: none;

        &:before {
          content: '';
          position: absolute;
          width: 0%;
          height: 2px;
          background: #ff8830;
          bottom: -2px;
          left: 0;
          transition: width 0.3s;
        }

        &:hover {
        color: #1466b8;
      }

        &:hover:before {
          width: 100%;
        }
      }
    }

    @media (max-width: 850px) {
      display: none;
    }
  }

  .desktop-user-info {
    display: flex;
    align-items: center;

    @media (max-width: 850px) {
      display: none;
    }
  }

  .mobile-icon {
    display: none;
    font-size: 28px;
    color: white;
    cursor: pointer;

    @media (max-width: 850px) {
      display: block;
    }
  }
`;

export const Emp = styled.div`
  //border-radius: 8px;
  min-width: 250px;
  align-items: center;
  padding: 5px;
  margin-right: 10px;
  margin-left: 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const EmployeeInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Pro = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfilePhoto = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ddd;
  border-radius: 50%;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;cursor: pointer; /* Adiciona o cursor em formato de setinha ao passar o mouse */
`;

export const Name = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: #158fa2;

  &:first-child {
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
export const Span = styled.span`
  font-size: 13px;
  font-weight: bold;
  color: #158fa2;

  &:first-child {
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const DivButtomEdit = styled.div`
  display:flex;
  justify-content: flex-end;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Btt02 = styled.button`
background: transparent;
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
