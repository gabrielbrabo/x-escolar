import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    background-color: #474a51;
    box-shadow: 2px 0px 7px inset black;

    @media screen and (max-width: 768px) {
        box-shadow: 0px 0px 7px inset black;
    }
`;
export const User = styled.div`
    display: flex;
    align-items: end;
    width: 100%;
    height: 6vh;
`;

export const Emp = styled.div`
    display: grid;
`;
export const DivInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 15px;
    align-items: center;
    justify-content: center;
`;
export const Matter = styled.div`
    display: flex;
    background-color: #63C2D1;
    border-radius: 30px;
    min-height: 100px;
    width: 90%;
`;
export const Span = styled.div`
    margin-left: 15px;
    margin-top: 8px;
`;
export const AddEmp = styled.div`
    display: flex;
    margin-right: 10px;
`;
export const DivAddEmp = styled.div`
    height: 30px;
    display: flex;
    width: 90%;
    margin-bottom: 7px;
    justify-content: flex-end;
`;