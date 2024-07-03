import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
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
    margin-top: 25px;
    align-items: center;
    justify-content: center;
`;
export const Matter = styled.div`
    min-height: 150px;
    max-height: 150px;
    border: 1px solid gray;
    width: 90%;
    overflow: hidden;
    overflow-y: scroll;
`;
export const Span = styled.div`
border-bottom: 1px solid gray;
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