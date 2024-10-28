import React, { useState, useEffect } from 'react';
import { indexRecordClassTaught, clssInfo } from '../../Api';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    ContainerDivs,
    StudentSection,
    Table,
    ContainerTable,
    TableRow,
    Span,
    DateCell,
    InfoText,
    Button,
    DescriptionCell,
    Register,
    ButtonReg,
} from './style';
import LoadingSpinner from '../../components/Loading';

const Grade = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isTeacher, setIsTeacher] = useState([]);
    const [id_employee, setId_employee] = useState([]);
    const [recordClassTaught, setRecordClassTaught] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_employee = localStorage.getItem("Id_employee");
            const id_class = sessionStorage.getItem("class-info");
            const year = new Date().getFullYear();
            const res = await indexRecordClassTaught(year, id_class);
            setRecordClassTaught(res.data.data || []);
            setId_employee(JSON.parse(id_employee));

            const resClass = await clssInfo(id_class);
            const isTeacher = resClass.data.data.find(res => res)?.id_employee.find(res => res)?._id;

            setIsTeacher(isTeacher);
            setLoading(false);
        })();
    }, []);

    const toggleRowExpansion = (index) => {
        setExpandedRows((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const getDescriptionPreview = (description) => {
        const maxLength = 100;
        return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
    };

    return (
        <Container>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <ContainerDivs>
                    <StudentSection>
                        <h2>Registros de Aulas Lecionadas</h2>
                        <Table>
                            <>
                                {isTeacher === id_employee && (
                                    <Register>
                                        <ButtonReg onClick={() => navigate("/record-class-taught")}>
                                            Registrar Nova Aula
                                        </ButtonReg>
                                    </Register>
                                )}
                                {recordClassTaught.length > 0 ? (
                                    recordClassTaught
                                        .sort((a, b) => new Date(b.year, b.month - 1, b.day) - new Date(a.year, a.month - 1, a.day))
                                        .map((res, index) => (
                                            <React.Fragment key={index}>
                                                <ContainerTable>
                                                    <Span>
                                                        <div>Professor: <p>{res.id_teacher.name}</p></div>
                                                        <div>Turma: <p>{res.id_class.serie}</p></div>
                                                    </Span>

                                                    <TableRow>
                                                        <DateCell>{`${res.day}/${res.month}/${res.year}`}</DateCell>
                                                        <DescriptionCell>
                                                            <div className={`description ${expandedRows.includes(index) ? 'expanded' : 'collapsed'}`}>
                                                                <div
                                                                    style={{
                                                                        whiteSpace: 'pre-wrap', // Para manter quebras de linha
                                                                        wordWrap: 'break-word',  // Para não cortar palavras
                                                                    }}
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: expandedRows.includes(index) ? res.description : getDescriptionPreview(res.description)
                                                                    }}
                                                                />
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                <Button onClick={() => toggleRowExpansion(index)}>
                                                                    {expandedRows.includes(index) ? 'Ver Menos' : 'Ver Mais'}
                                                                </Button>
                                                            </div>
                                                        </DescriptionCell>
                                                    </TableRow>
                                                </ContainerTable>
                                            </React.Fragment>
                                        ))
                                ) : (
                                    <InfoText>Não há nenhum registro</InfoText>
                                )}
                            </>
                        </Table>
                    </StudentSection>
                </ContainerDivs>
            )}
        </Container>
    );
};

export default Grade;
