import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

export const ContainerDivs = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 20px;
  @media (max-width: 1200px) {
  //  max-width: 90%;
  }
  @media (max-width: 768px) {
    padding-top: 10px;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const User = styled.div`
  /* Estilos para o componente User */
`;

export const Search = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FormSearch = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AreaEmp = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputEmp = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const FormFilter = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const DivNewEmp = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const DivButtomEdit = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
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

export const Emp = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
  @media (max-width: 768px) {
    width: 96%;
    padding: 5px;
  }
`;

export const ProfileInfo = styled.div`
    min-width: 50%;
  max-width: 420px;
  overflow: hidden;
`;

export const Span = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const DivInfo = styled.div`
  width: 100%;
  max-width: 1000px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  @media (max-width: 768px) {
    width: 96%;
    padding: 5px;
  }
`;

export const TitleInfo = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const DivAddEmp = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

export const AddEmp = styled.div`
  display: flex;
  justify-content: flex-end;
  //flex: 1;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const AddImpre = styled.div`
  display: flex;
  justify-content: flex-end;
  p {
    color: #8000ff; /* roxo vibrante */
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      color: #a64dff; /* roxo mais claro ao passar o mouse */
      text-decoration: underline;
    }
  }
`;

export const Matter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  span {
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

export const Btt01 = styled.button`
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
export const ButtonCancel = styled.div`
  display: flex;
  margin-top: 90px;
  justify-content: center;
  align-items: flex-end;
`;

export const DivShowMatter = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 30px;
    border-radius: 20px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    text-align: center;

    h2 {
        margin-bottom: 20px;
    }
`;

export const Input = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Label = styled.label`
    font-weight: 600;
    text-align: left;
`;

/*export const Select = styled.select`
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #ccc;
`;*/

export const ButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;

    button {
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        background-color: #e74c3c;
        color: white;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
            background-color: #c0392b;
        }
    }
`;


export const LoadingSpinner = styled.div`
  /* Estilos para o spinner de carregamento */
`;

export const DiaryWrapper = styled.div`
  background-color: #f7f7f7;
  padding: 0.6rem 1rem; /* ainda menor */
  border-radius: 12px;
  width: 100%;
  //max-width: 900px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  @media (max-width: 1024px) {
    max-width: 95%;
    padding: 0.5rem 0.8rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 0.4rem;
  }

  h2 {
    color: #158fa2;
    margin-bottom: 4px; /* menor espaço */
    text-align: center;
    font-size: 1.6rem;

    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
  }
`;

export const DiaryBimester = styled.div`
  margin-bottom: 0.3rem; /* ainda mais compacto */
  padding: 0.3rem 0.5rem; /* menos padding */
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;

  h3 {
    margin-bottom: 0.2rem;
    color: #0b698e;
    font-size: 1rem;

    @media (max-width: 600px) {
      font-size: 0.9rem;
    }
  }
`;

export const StatusLine = styled.div`
  display: flex;
  flex-direction: column; /* Alinha cada bloco (span+botão) um embaixo do outro */
  gap: 0.4rem;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between; /* faz o span colar à esquerda e o botão à direita */
    flex-wrap: wrap;
    gap: 0.5rem;
    background: #fff;
  }

  span {
    font-size: 0.85rem;
    color: #333;
    flex: 1 1 auto;
  }

  button {
    background: #158fa2;
    color: #fff;
    border: none;
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #0b698e;
    }

    @media (max-width: 600px) {
      width: auto; /* Evita botão quebrar pra linha de baixo */
    }
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;

  button {
    padding: 0.6rem 1.2rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background-color: #388e3c;
    }
  }
`;

export const BlurModal = styled.div`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const AlertBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

  p {
    margin-bottom: 1rem;
  }

  button {
    padding: 0.4rem 1rem;
    border: none;
    background-color: #4caf50;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }
`;
