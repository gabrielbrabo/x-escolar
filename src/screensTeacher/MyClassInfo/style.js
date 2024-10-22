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
        width: 92%;
    }
`

export const ClassInfo = styled.span`
    font-size: 18px;
    color: #333;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    gap: 20px;

    button {
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
        width: 92%;
    }
`

export const StudentItem = styled.li`
    font-size: 16px;
    color: #333;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    cursor: default;
`

export const InfoText = styled.div`
    font-size: 16px;
    color: #888;
    padding: 8px 0;
    text-align: center;
`
