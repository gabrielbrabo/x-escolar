import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetClass } from '../../Api';
import {
    Container,
    List,
    Emp,
    Span,
    Search,
    DivNewEmp,
    FormFilter,
    FormSearch,
    AreaEmp,
    InputEmp,
    Select,
    Btt02,
    ContainerDivs
} from './style';
/*import {
    AreaEmp,
    InputEmp,
    Select
} from '../../components/Inputs';
import {
    Btt02,
} from '../../components/Buttons';*/
import LoadingSpinner from '../../components/Loading';

const Cla$$ = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState([]);
    const [Clss, setClss] = useState([]);
    const [busca, setBusca] = useState("");
    const [filter, setFilter] = useState(currentYear.toString());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const idSchool = sessionStorage.getItem("id-school");
            const resClass = await GetClass(JSON.parse(idSchool));
            setClss(resClass.data.data);

            const Year = resClass.data.data
                .map(y => y.year)
                .filter((valor, indice, self) => self.indexOf(valor) === indice);
            setYear(Year);
            setLoading(false);
            console.log(resClass)
        })();
    }, []);

    Clss.sort((a, b) => (a.serie < b.serie ? -1 : (a.serie > b.serie ? 1 : 0)));
    year.sort((a, b) => (a < b ? -1 : (a > b ? 1 : 0)));

    const NewClass = () => {
        navigate('/new/class');
    };

    const classInformation = (Clss) => {
        setLoading(true);
        sessionStorage.setItem("ClassInformation", Clss._id);
        sessionStorage.setItem("serieClass", Clss.serie);
        navigate(`/class/info/${Clss._id}`);
        setLoading(false);
    };

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ContainerDivs>
                    <Search>
                        <FormSearch>
                            <label>Buscar Turma</label>
                            <AreaEmp>
                                <InputEmp
                                    type="text"
                                    placeholder="Buscar por nome"
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                />
                            </AreaEmp>
                        </FormSearch>
                        <FormFilter>
                            <label>Filtra por Ano: </label>
                            <Select
                                id="position"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="">{currentYear}</option>
                                {year.map((c, index) => (
                                    <option key={index} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </Select>
                        </FormFilter>
                    </Search>
                    <List>
                        <DivNewEmp>
                            <Btt02 onClick={NewClass}>Nova Turma</Btt02>
                        </DivNewEmp>
                        {Clss.filter((fil) => (!filter || fil.year === filter))
                            .filter((val) => (!busca || val.serie.includes(busca.toUpperCase())))
                            .map((Clss) => (
                                <Emp
                                    onClick={() => classInformation(Clss)}
                                    key={Clss._id}
                                >
                                    <Span>{Clss.serie}</Span>
                                </Emp>
                            ))}
                    </List>
                </ContainerDivs>
            )}
        </Container>
    );
};

export default Cla$$;