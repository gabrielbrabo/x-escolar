import * as React from 'react';
import dayjs from 'dayjs';
import DayjsUtils from '@date-io/dayjs'
import 'dayjs/locale/pt-br';
import localizedFormat from 'dayjs/plugin/localizedFormat'
//import ptBR  from 'date-fns/locale/pt-BR'
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
//import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

import { GetMatter, GetAttendance } from '../../Api'

import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

//import { styled } from '@mui/material/styles';
import { StyledContainer, StyledDateCalendar, ExitButton, SelectContainer, Label, Select } from './Styles';

//import { containerCalendar } from './Styles';
const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
const monthsPtBr = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

dayjs.locale('pt-br');
dayjs.extend(localizedFormat);

/*const StyledDateCalendar = styled(DateCalendar)`

  & .MuiPickersDay-root {
    color: white; // Cor dos dias no calendário
  }
  & .MuiTypography-root {
    color: white; // Cor dos dias no calendário
  }
  & svg {
    color: white;
  }
  & .MuiPickersCalendarHeader-root {
    background-color: black;
  }
  & .MuiDayCalendar-header {
    background-color: #292929;
  }
  & .MuiPickersSlideTransition-root {
    background-color: #3D3925;;
  }
`;*/

function fakeFetch( /*date,*/ signal) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            //const daysInMonth = date.daysInMonth();
            const daysToHighlight = [];
            const daysToHighlightF = [];
            resolve({ daysToHighlight, daysToHighlightF });
        });
        signal.onabort = () => {
            clearTimeout(timeout);
            reject(new DOMException('aborted', 'AbortError'));
        };
    });
}


function ServerDay(props) {
    const { highlightedDays = [], highlightedDaysF = [], day, outsideCurrentMonth, ...other } = props;
    const isSelected =
        !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
    const isSelectedF =
        !props.outsideCurrentMonth && highlightedDaysF.indexOf(props.day.date()) >= 0;
    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? <IoCheckmarkSharp color='#00fa00' font-size="30px" /> : undefined || isSelectedF ? <IoCloseSharp color='#ff050a' font-size="30px" /> : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}
const initialValue = dayjs();

export default function DateCalendarServerRequest() {
    const requestAbortController = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = React.useState([]);
    const [highlightedDaysF, setHighlightedDaysF] = React.useState([]);
    const [matter, setMatter] = React.useState([]);
    const [id_matter, setFilter] = React.useState([]);
    const Year = new Date().getFullYear();
    const Month = new Date().getMonth() + 1;
    var [month, setMonth] = React.useState([Month]);

    React.useEffect(() => {
        (async () => {
            const idSchool = sessionStorage.getItem("id-school")
            console.log("id_school", idSchool)
            const res = await GetMatter(JSON.parse(idSchool))
            setMatter(res.data.data)
            const id_student = sessionStorage.getItem("StudentInformation")
            const resGetAttendance = await GetAttendance(Year, month, id_student, id_matter)
            const attendance = await resGetAttendance.data.data.map(res => {
                if (res.status === "P") {
                    return JSON.parse(res.day)
                }
                return null
            }).filter(res => {
                if (res != null) {
                    return res
                }
                return null
            })
            const attendancef = await resGetAttendance.data.data.map(res => {
                if (res.status === "F") {
                    return JSON.parse(res.day)
                }
                return null
            }).filter(res => {
                if (res != null) {
                    return res
                }
                return null
            })
            setHighlightedDays(attendance);
            setHighlightedDaysF(attendancef);
        })()
        //console.log("currentMonth", Month, "currentYear", Year)
        fetchHighlightedDays(initialValue);
        // abort request on unmount
        return () => requestAbortController.current?.abort();
    }, [Month, month, Year, id_matter]);
    console.log("month", month)

    const fetchHighlightedDays = (date) => {
        const controller = new AbortController();
        fakeFetch(date, {
            signal: controller.signal,
        })
            .then(({ daysToHighlight, daysToHighlightF }) => {
                setHighlightedDays(daysToHighlight);
                setHighlightedDaysF(daysToHighlightF);
                setIsLoading(false);
            })
            .catch((error) => {
                // ignore the error if it's caused by `controller.abort`
                if (error.name !== 'AbortError') {
                    throw error;
                }
            });
        requestAbortController.current = controller;
    };

    const handleMonthChange = (date) => {
        console.log("Mes", date.$M + 1, "Ano", date.$y)
        //setMonth([])
        if (requestAbortController.current) {
            // make sure that you are aborting useless requests
            // because it is possible to switch between months pretty quickly
            requestAbortController.current.abort();
        }
        setIsLoading(true);
        //setHighlightedDays([]);
        fetchHighlightedDays(date);
        setMonth(date.$M + 1)
    };

    const setDate = () => {
        setFilter([])
        setMonth([Month])
    };

    const countPresences = highlightedDays.length;
    const countAbsences = highlightedDaysF.length;

    return (
        <StyledContainer>
            <SelectContainer>
               <Label> Para ver a frequecia selecione uma materia abaixo </Label>
                <div>
                    <Select id="position"
                        value={id_matter}
                        onChange={
                            (e) => setFilter(e.target.value)
                        }
                    >
                        <option value="">Selecione</option>
                        {
                            matter.map(c => (
                                <option value={c._id}>{c.name}</option>
                            ))
                        }
                    </Select>
                </div>
            </SelectContainer>

            {
                id_matter.length > 0
                &&
                <LocalizationProvider locale={dayjs.locale('pt-br', { months: monthsPtBr, weekdays: diasDaSemana, })} utils={DayjsUtils} dateAdapter={AdapterDayjs}>
                    <p><IoCheckmarkSharp color='#00fa00' font-size="30px" />Presenças: {countPresences} | <IoCloseSharp color='#ff050a' font-size="30px" />Ausências: {countAbsences}</p>
                    <StyledDateCalendar
                        defaultValue={initialValue}
                        loading={isLoading}
                        onMonthChange={handleMonthChange}
                        renderLoading={() => <DayCalendarSkeleton />}
                        slots={{
                            day: ServerDay,
                        }}
                        slotProps={{
                            day: {
                                highlightedDays,
                                highlightedDaysF
                            },
                        }}
                        views={['day']}
                        readOnly
                        months={monthsPtBr}
                    >
                    </StyledDateCalendar>
                    <ExitButton className='exit-frequec' onClick={setDate} >
                        fecha frequecia ^
                    </ExitButton>

                </LocalizationProvider>
            }
        </StyledContainer>
    );
}