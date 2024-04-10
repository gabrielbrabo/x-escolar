import styled from 'styled-components';

export const Btt01 = styled.button`
    height: 50px;
    margin-top: 20px;
    background-color: #268596;
    border-radius: 30px;
    border: none;
    align-items: center;
    justify-content: center; 
`;

export const SignMessageButton = styled.button`
    justify-content: center;
    border: none;
    margin-top: 20px;
    background-color: #83D6E3;
`;

export const SignMessageButtonText = styled.text`
    font-size: 19px;
    color: #268596;
`;

export const SignMessageButtonTextBold = styled.text`
    font-size: 16px;
    color: #268596;  
    font-weight: bold;
    margin-left: 5px;
`;

export const Btt02 = styled.button`
    height: 50px;
    background-color: #268596;
    border-radius: 10px;
    border: none;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {   
        height: 40px;
    }
    
`;