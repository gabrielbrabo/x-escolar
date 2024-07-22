import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
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
export const Search = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    padding-top: 8px;
    justify-content: space-around;
    width: 100%;
`;
export const DivInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
export const List = styled.div`
    border: 1px solid gray;
`;
export const DivNewEmp = styled.div`
    display: flex;
    height: 0px;
    justify-content: flex-end;
`;
export const Emp = styled.div`
    display: flex;
    height: 30px;
    align-items: center;
    border-top: 1px solid gray;
`;
export const Span = styled.div`
    margin-left: 8px;
`;
export const FormFilter = styled.div`
    @media screen and (max-width: 768px) {
        display: grid;
    }
`;
export const FormSearch = styled.div`
    
`;
export const DivAddEmp = styled.div`
    height: 30px;
    display: flex;
    width: 90%;
    margin-bottom: 7px;
    justify-content: flex-end;
`;
