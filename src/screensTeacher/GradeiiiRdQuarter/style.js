import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
`;

export const ContainerDivs = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: 20px;
    flex-direction: column;
`;

export const ContainerStudent = styled.div`
    width: 92%;
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 1000px;
    padding: 5px;
    gap: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;
`;
export const DataSelected = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;

    @media(max-width: 768px) {
        flex-direction: column;
    }
`;
export const DivButton = styled.div`
    width: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
    display: flex;
    justify-content: flex-end;
    gap: 20px;

    @media(max-width: 768px) {
        justify-content: center;
        align-items: center;
    }
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
`;

export const Emp = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    gap: 3px;
    border-radius: 5px;
    margin-bottom: 35px;
    min-width: 90%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Matter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 10px;
`;

export const DivInfo = styled.div`
    background-color: #f1f1f1;
    width: 90%;
    max-width: 600px;
    padding: 20px;
    padding-top: 40px;
    padding-bottom: 40px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        text-align: center;
        padding-bottom: 30px;
    }
`;
export const DivInfoDate = styled.div`
    background-color: #f1f1f1;
    width: 90%;
    max-width: 600px;
    padding: 20px;
    padding-top: 40px;
    padding-bottom: 40px;
    gap: 30px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        text-align: center;
        padding-bottom: 30px;
    }
`;

export const Span = styled.div`
    display: flex;
    align-items: center;
    border: none;
    width: 400px;
    height: 90%;
    font-size: 16px;
    color: #333;
    overflow-y: hidden;
    white-space: nowrap;

    @media(max-width: 768px) {
        max-width: 140px;
    }

`;
export const SpanChecked = styled.button`
    display: flex;
    align-items: center;
    gap: 20px;
    border: none;
    font-size: 16px;
    color: #333;
`;

export const Btt02 = styled.button`
    padding: 10px;
    width: 90px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    @media(min-width: 600px) {
        padding: 10px ;
    }
`;
export const Btt01 = styled.button`
    padding: 10px;
    width: 90px;background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    @media(min-width: 600px) {
        padding: 10px ;
    }
`;

export const SelectorContainer = styled.div`
    margin-bottom: 20px;
`;

export const EditContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    h3 {
        text-align: center;
    }
`;
export const InputGrade = styled.input`
    width: 60px;
`;
export const Grade = styled.div`
    display: flex;
    gap: 3px;
    align-items: center;
    justify-content: center;
`;
export const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const Info = styled.div`
`;

export const LegendBox = styled.div`
    max-width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
        margin: 0px;
        text-align: center;
    }

    p {
        margin: 5px;
    }

    @media(max-width: 768px) {
    }
`;