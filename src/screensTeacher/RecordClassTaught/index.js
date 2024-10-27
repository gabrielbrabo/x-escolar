import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Date from '../../components/Date'
import {
    
} from '../../Api';
import { Container, ContainerDivs, Label, InputArea, Input, ToGoBack, SignMessageButtonText, SignMessageButtonTextBold,  } from './style';
import LoadingSpinner from '../../components/Loading';

//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import dayjs from 'dayjs';

const Grade = () => {
    const navigate = useNavigate();
    //const [Selectmatter, setSelectMatter] = useState([]);
    //const [matter, setMatter] = useState([]);
    const [loading, setLoading] = useState(false);
    //const [errorMessage, setErrorMessage] = useState('');
    //const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState('')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')

    useEffect(() => {
        (async () => {
            setLoading(true);
            //const idSchool = sessionStorage.getItem("id-school");
            //const year = new Date().getFullYear();
            
            // setMatter(res.data.data);
            setLoading(false);
        })();
    }, []);

    const messageButtonClick = () => {
        navigate(-1);
    };

    /*const signClick = async () => {
        setLoading(true);

        // const Matter = await GetMatterDetails(Selectmatter);
        /*if (Matter) {
            const nameMatter = Matter.data.name;
            sessionStorage.setItem("nameMatter", nameMatter);
            console.log("nameMatter", nameMatter);
        }

        
        setLoading(false);
    };*/

    console.log("selectedDate", selectedDate)
    console.log("day", day)
    console.log("month", month)
    console.log("year", year)
    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ContainerDivs>
                    <h2>Selecione o Bimestre e Data da Aula</h2>
                    <InputArea>
                        <Input>
                            <Label>Data</Label>
                            <Date
                                setSelectedDate={setSelectedDate}
                                setDay={setDay}
                                setMonth={setMonth}
                                setYear={setYear}
                            />
                        </Input>
                        {/*errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>*/}
                        {/*<Button onClick={signClick}>Definir</Button>*/}
                        <ToGoBack onClick={messageButtonClick}>
                            <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                            <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                        </ToGoBack>
                    </InputArea>
                </ContainerDivs>
            )}
        </Container>
    );
};

export default Grade;
