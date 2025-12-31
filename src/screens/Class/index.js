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
import LoadingSpinner from '../../components/Loading';

const Cla$$ = () => {

    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState([]);
    const [Clss, setClss] = useState([]);
    const [positionAtEducationDepartment, setPositionAtEducationDepartment] = useState('')
    const [busca, setBusca] = useState("");
    const [filter, setFilter] = useState(currentYear.toString());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const idSchool = sessionStorage.getItem("id-school");
            const positionAtEducationDepartment = localStorage.getItem("positionAtEducationDepartment")
            const resClass = await GetClass(JSON.parse(idSchool));
            setClss(resClass.data.data);
            setPositionAtEducationDepartment(positionAtEducationDepartment)

            const Year = resClass.data.data
                .map(y => y.year)
                .filter((valor, indice, self) => self.indexOf(valor) === indice);
            setYear(Year);
            setLoading(false);
            console.log(resClass)
        })();
    }, []);

    Clss.sort((a, b) => (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)));
    year.sort((a, b) => (a < b ? -1 : (a > b ? 1 : 0)));

    const filteredClasses = Clss
        .filter((fil) => (!filter || fil.year === filter))
        .filter((val) => (!busca || val.name.includes(busca.toUpperCase())));

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

    console.log("filter", filter, "currentYear", currentYear)

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
                                <option value="">Todos{/*currentYear*/}</option>
                                {year.map((c, index) => (
                                    <option key={index} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </Select>
                        </FormFilter>
                    </Search>
                    <List>
                        {filter === JSON.stringify(currentYear) && !positionAtEducationDepartment
                            &&
                            <DivNewEmp>
                                <Btt02 onClick={NewClass}>Nova Turma</Btt02>
                            </DivNewEmp>
                        }
                        <p>Total de Turmas: {filteredClasses.length}</p>
                        {filteredClasses.filter((fil) => (!filter || fil.year === filter))
                            .filter((val) => (!busca || val.name.includes(busca.toUpperCase())))
                            .map((Clss) => (
                                <Emp
                                    onClick={() => classInformation(Clss)}
                                    key={Clss._id}
                                >
                                    <Span style={{ color: "#003e4f" }}>{Clss.name}</Span>
                                </Emp>
                            ))}
                    </List>
                </ContainerDivs>
            )}
        </Container>
    );
};

export default Cla$$;