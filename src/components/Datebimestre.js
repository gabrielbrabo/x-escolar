import React from 'react';
import styled from 'styled-components';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale('pt-br');
dayjs.extend(localizedFormat);

// Estilização dos componentes
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 600px; /* Largura máxima do componente */
    height: 370px; /* Largura máxima do componente */
    margin: auto; /* Centraliza horizontalmente */
    background: #f9f9f9; /* Cor de fundo */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra leve */

    @media (max-width: 768px) {
        width: 350px; /* Largura máxima do componente */
        height: 370px; /* Largura máxima do componente */
    }
`;

const InputContainer = styled(DemoContainer)`
    width: 100%; /* Faz com que o container use a largura total */
`;

const StyledInput = styled.input`
    width: 100%; /* O input ocupará toda a largura do container */
    padding: 10px;
    border: 1px solid #ccc; /* Borda do input */
    border-radius: 4px; /* Bordas arredondadas do input */
    margin-bottom: 10px; /* Espaçamento inferior */
`;



const ResponsivePickers = ({ setSelectedDateStart, setDayStart, setMonthStart, setYearStart, setSelectedDateEnd, setDayEnd, setMonthEnd, setYearEnd, }) => {
    const [selectedStart, setSelectedStart] = React.useState(null);
    const [selectedEnd, setSelectedEnd] = React.useState(null);

    const handleChangeStart = (date) => {
        // Atualiza a data selecionada
        setSelectedStart(date);
    };
    
    const handleChangeEnd = (date) => {
        // Atualiza a data selecionada
        setSelectedEnd(date);
    };
    if (selectedStart && selectedEnd) {
        // Se a data ainda está incompleta, não fazer nada
        const dayStart = selectedStart.date(); // Obtém o dia (1 a 31)
        const monthStart = selectedStart.month() + 1; // Obtém o mês (0 a 11, então adicionamos 1)
        const yearStart = selectedStart.year(); // Obtém o ano
        
        const dayEnd = selectedEnd.date(); // Obtém o dia (1 a 31)
        const monthEnd = selectedEnd.month() + 1; // Obtém o mês (0 a 11, então adicionamos 1)
        const yearEnd = selectedEnd.year(); // Obtém o ano

        //console.log("Mês:", month, "Dia:", day, "Ano:", year);

        setSelectedDateStart(selectedStart);
        setDayStart(dayStart);
        setMonthStart(monthStart);
        setYearStart(yearStart);
        
        setSelectedDateEnd(selectedEnd);
        setDayEnd(dayEnd);
        setMonthEnd(monthEnd);
        setYearEnd(yearEnd);
    }

    return (
        <Container>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <p>Inicio:</p>
                <InputContainer components={['DesktopDatePicker']}>
                    <DemoItem>
                        <DesktopDatePicker
                            views={['day', 'month']} // Permite selecionar apenas dia e mês
                            value={selectedStart}
                            onChange={handleChangeStart}
                            renderInput={(params) => <StyledInput {...params} />}
                            format="DD/MM"
                        />
                    </DemoItem>
                </InputContainer>
                <p>Fim:</p>
                <InputContainer components={['DesktopDatePicker']}>
                    <DemoItem>
                        <DesktopDatePicker
                            views={['day', 'month']} // Permite selecionar apenas dia e mês
                            value={selectedEnd}
                            onChange={handleChangeEnd}
                            renderInput={(params) => <StyledInput {...params} />}
                            format="DD/MM"
                        />
                    </DemoItem>
                </InputContainer>
                {/*<SaveButton onClick={handleSaveDate}>Definir Data</SaveButton>*/}
            </LocalizationProvider>
        </Container>
    );
};

export default ResponsivePickers;
