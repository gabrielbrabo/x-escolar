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

export const Info = styled.div`
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
    //padding: 5px;
    gap: 3px;
    border-radius: 5px;
    margin-bottom: 35px;
    min-width: 90%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media(max-width: 768px) {
        max-width: 100%;
        display: grid;
    }
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
        max-width: 100%;
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

    select {
        width: 80%;
        max-width: 400px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
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

    @media (max-width: 768px) {
    max-width: 90%;
  }
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
    max-width: 90%;
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

export const InputArea = styled.div`
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    padding: 15px;
    gap: 40px;
  }
`;
export const Input = styled.div`
  width: 100%;
`;

export const Button = styled.button`
  background-color: #28a745;
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
`;

export const ToGoBack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const Label = styled.label`
  align-self: flex-start;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 14px;
  }
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

export const DivBim = styled.div`
    display: flex;
`;

export const DivBimTable = styled.div`
  display: flex;
  border-collapse: collapse;

  @media(max-width: 768px) {
        max-width: 90%;
    }
`;

export const DivBimRow = styled.div`
  display: grid;
  border: 0px solid #ddd;
`;

export const DivBimHeader = styled.div`
  display: table-cell;
  text-align: center;
  font-weight: bold;
  padding: 3px;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
`;

export const DivBimCell = styled.div`
  display: table-cell;
  text-align: center;
  padding: 3px;
  border: 1px solid #ddd;
`;