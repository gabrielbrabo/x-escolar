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
    /*.css-1q04gal-MuiDateCalendar-root {
        background-color: black;
        span {
            color: white;
        }
        button {
            color: white;
        }   
    }
    .css-18wn1yb-MuiButtonBase-root-MuiPickersDay-roott{
        color: black;
    }
    .css-14iq4xa-MuiDayCalendar-root {
        background-color: #3D3925;
        .css-i5q14k-MuiDayCalendar-header {
            background-color: #292929;
        }
    }*/
    .exit-frequec {
        display: flex;
        height: 30px;
        justify-content: center;
        align-items: center;
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
`;
export const DivNewEmp = styled.div`
    display: flex;
    height: 0px;
    justify-content: flex-end;
`;
export const Emp = styled.div`
    display: grid;
`;
export const Span = styled.div`
    margin-left: 15px;
    margin-top: 8px;
`;
export const FormFilter = styled.div`
    @media screen and (max-width: 768px) {
        display: grid;
    }
`;
export const FormSearch = styled.div`
    
`;