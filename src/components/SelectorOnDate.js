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
    const handleonChange = (date) => {
        console.log("mes", date.$M + 1, "dia", date.$D, "year", date.$y)

        setSelectedDate(date)
        setDay(date.$D)
        setMonth(date.$M + 1)
        setYear(date.$y)
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
                <DemoItem label="Desktop variant">
                    <DesktopDatePicker
                        views={['month', 'day']}  // Permite selecionar apenas mês e dia
                        format="DD/MM"  // Formato Brasileiro DD/MM
                        onChange={handleonChange}
                    />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default ResponsivePickers;