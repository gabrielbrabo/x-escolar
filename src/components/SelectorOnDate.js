import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const ResponsivePickers = ({ setSelectedDate, setDay, setMonth, setYear }) => {
    const handleonChange  = (date) => {
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={['DatePicker', 'DesktopDatePicker', 'MobileDatePicker']}
            >
                <DemoItem label="Desktop variant">
                    <DesktopDatePicker
                        onChange={handleonChange}
                    />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default ResponsivePickers;