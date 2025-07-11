import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ContainerDivs = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) {
        width: 92%;
        padding: 10px;
    }
`;

export const ClassDetails = styled.div`
    background-color: #fff;
    width: 1000px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 768px) {
        width: 95%;
    }
`

export const ClassInfo = styled.span`
    font-size: 18px;
    color: #333;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 7px;
    gap: 20px;

    button {
        background-color: #158fa2;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;

        &:hover {
            background-color: #218838;
        }

        @media (max-width: 345px)  {
            font-size: 9pt; /* Smartphones pequenos */
        }
        @media (min-width: 345px) and (max-width: 390px) {
            font-size: 10pt; /* Smartphones pequenos */
        }
        @media (min-width: 390px) and (max-width: 768px) {
            font-size: 11pt; /* Smartphones pequenos */
        }

    }
`

export const MatterSection = styled.div`
    background-color: #fff;
    width: 600px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h2 {
        margin-bottom: 15px;
        font-size: 20px;
        color: #555;
    }

    @media (max-width: 768px) {
        width: 92%;
    }
`

export const MatterItem = styled.div`
    font-size: 16px;
    color: #333;
    padding: 8px 0;
`

export const StudentSection = styled.div`
    background-color: #fff;
    width: 1000px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h2 {
        margin-bottom: 15px;
        font-size: 20px;
        color: #555;
    }

    @media (max-width: 768px) {
        width: 95%;
    }
`

export const StudentItem = styled.li`
    font-size: 16px;
    color: #333;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    cursor: default;

    @media (max-width: 345px)  {
      font-size: 11px; /* Smartphones pequenos */
    }
    @media (min-width: 345px) and (max-width: 481px) {
      font-size: 9pt; /* Smartphones pequenos */
    }

    @media (min-width: 481px) and (max-width: 768px) {
      font-size: 16px; /* Tablets */
    }
`

export const InfoText = styled.div`
    font-size: 16px;
    color: #888;
    padding: 8px 0;
    text-align: center;
`
export const ToGoBack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
  margin-bottom: 20px;
  cursor: pointer;

  @media print {
    display: none; /* Ocultar na impressão */
  }
`;

export const SignMessageButtonText = styled.span`
  color: #333;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SignMessageButtonTextBold = styled.span`
  color: #333;
  font-weight: bold;
  margin-left: 5px;
  @media (max-width: 768px) {
    font-size: 14px;
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

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const DiaryWrapper = styled.div`
  background-color: #f7f7f7;
  padding: 0.6rem 1rem; /* ainda menor */
  border-radius: 12px;
  width: 90%;
  max-width: 900px;
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
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.3rem; /* gap reduzido */

  span {
    font-size: 0.85rem; /* fonte menor */
    color: #333;
    flex: 1 1 180px;
  }

  button {
    background: #158fa2;
    color: #fff;
    border: none;
    padding: 0.25rem 0.5rem; /* botão menor */
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
    flex-shrink: 0;

    &:hover {
      background: #0b698e;
    }

    @media (max-width: 600px) {
      width: 100%;
    }
  }
`;

export const StatusText = styled.span`
  font-size: 1rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
`;
