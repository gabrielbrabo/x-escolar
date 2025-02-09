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
    max-width: 400px; /* Largura máxima do componente */
    margin: auto; /* Centraliza horizontalmente */
    background: #f9f9f9; /* Cor de fundo */
    border-radius: 8px; /* Bordas arredondadas */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra leve */
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

const SaveButton = styled.button`
    padding: 10px 20px; /* Padding do botão */
    border: none;
    border-radius: 4px; /* Bordas arredondadas do botão */
    background-color: #007bff; /* Cor de fundo do botão */
    color: white; /* Cor do texto */
    margin-top: 30px;
    cursor: pointer;
    font-size: 16px; /* Tamanho da fonte */
    transition: background-color 0.3s; /* Efeito de transição */

    &:hover {
        background-color: #0056b3; /* Cor do botão ao passar o mouse */
    }
`;

const ResponsivePickers = ({ setSelectedDate, setDay, setMonth, setYear }) => {
    const [selected, setSelected] = React.useState(dayjs());

    const handleChange = (date) => {
        // Atualiza a data selecionada
        setSelected(date);
    };

    const handleSaveDate = () => {
        if (!selected) {
            // Se a data ainda está incompleta, não fazer nada
            return;
        }

        const day = selected.date(); // Obtém o dia (1 a 31)
        const month = selected.month() + 1; // Obtém o mês (0 a 11, então adicionamos 1)
        const year = selected.year(); // Obtém o ano

        console.log("Mês:", month, "Dia:", day, "Ano:", year);

        setSelectedDate(selected);
        setDay(day);
        setMonth(month);
        setYear(year);
    };

    return (
        <Container>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <InputContainer components={['DesktopDatePicker']}>
                    <DemoItem>
                        <DesktopDatePicker
                            views={['day', 'month']} // Permite selecionar apenas dia e mês
                            value={selected || null}
                            onChange={handleChange}
                            renderInput={(params) => <StyledInput {...params} />}
                            format="DD/MM"
                        />
                    </DemoItem>
                </InputContainer>
                <SaveButton onClick={handleSaveDate}>Salvar Data</SaveButton>
            </LocalizationProvider>
        </Container>
    );
};

export default ResponsivePickers;
