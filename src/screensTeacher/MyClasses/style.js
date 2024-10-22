import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ContainerDivs = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        width: 92%;
    }
`;

export const Search = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 1000px;
    padding: 20px;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 15px;
    background-color: #ffffff;
    border-radius: 8px;
    gap: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const FormSearch = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-weight: bold;
        margin-bottom: 5px;
    }

    @media (max-width: 768px) {
        margin-bottom: 15px;
        width: 100%;
    }
`;

export const FormFilter = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-weight: bold;
        margin-bottom: 5px;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const AreaEmp = styled.div`
    display: flex;
    align-items: center;
`;

export const InputEmp = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 92%;
`;

export const Select = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 92%;

   
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 15px;
    width: 90%;
    max-width: 1000px;
    padding: 20px;
    gap: 20px;
`;

export const Emp = styled.div`
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
        padding: 15px;
    }
`;

export const Span = styled.span`
    font-size: 18px;
`;

