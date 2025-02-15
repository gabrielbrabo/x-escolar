import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import DayjsUtils from '@date-io/dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
const monthsPtBr = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

dayjs.locale('pt-br');
dayjs.extend(localizedFormat);

const ResponsivePickers = ({ setSelectedDate, setDay, setMonth, setYear }) => {

    const currentYear = new Date().getFullYear().toString();

    const handleonChange = (date) => {

        if (!date || !date.isValid()) {
            return; // Verifique se a data é válida
          }

        console.log("Mês:", date.month() + 1, "Dia:", date.date(), "Ano:", date.year());

        setSelectedDate(date);
        setDay(date.date());
        setMonth(date.month() + 1); // `month()` retorna o índice do mês
        setYear(currentYear)
    }
    /*const dateonChange = props => {
        const day = sessionStorage.getItem("dia")
        props.handleDate(day)
    }*/

    return (
        <LocalizationProvider locale={dayjs.locale('pt-br', { months: monthsPtBr, weekdays: diasDaSemana, })} utils={DayjsUtils} dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={['DatePicker', 'DesktopDatePicker', 'MobileDatePicker']}
            >
                <DemoItem >
                    <DesktopDatePicker
                        views={['day', 'month']}  // Permite selecionar apenas mês e dia
                        format="DD/MM/YY"  // Formato Brasileiro DD/MM
                        onChange={handleonChange}
                        slotProps={{
                            textField: {
                                sx: {
                                    backgroundColor: 'white',
                                    borderRadius: '4px',  // Borda arredondada opcional
                                    input: {
                                        color: 'black', // Cor do texto para garantir visibilidade
                                    }
                                }
                            }
                        }}
                    />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default ResponsivePickers;