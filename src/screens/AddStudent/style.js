import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 90vh;
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

export const List = styled.div`
    border: 1px solid gray;
    margin-top: 8px;
    margin-bottom: 8px;
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
export const Add = styled.div`
    display: grid;
    min-height: 90vh;
    width: 90%;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: black ;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
   
`;