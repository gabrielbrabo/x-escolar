import React, { useState, useEffect } from 'react';
import { indexRecordClassTaught } from '../../Api';
import {
    Container,
    ContainerDivs,
    StudentSection,
    Table,
    TableRow,
    DateCell,
    InfoText,
    Button,
    DescriptionCell,
} from './style';
import LoadingSpinner from '../../components/Loading';

const Grade = () => {
    const [loading, setLoading] = useState(false);
    const [recordClassTaught, setRecordClassTaught] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]); // Controla linhas expandidas

    useEffect(() => {
        (async () => {
            setLoading(true);
            const id_class = sessionStorage.getItem("class-info");
            const year = new Date().getFullYear();
            const res = await indexRecordClassTaught(year, id_class);
            setRecordClassTaught(res.data.data);
            setLoading(false);
        })();
    }, []);

    const toggleRowExpansion = (index) => {
        setExpandedRows((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const getDescriptionPreview = (description) => {
        const maxLength = 100; // Ajuste para aumentar o resumo
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
                            {recordClassTaught.length > 0 ? (
                                recordClassTaught
                                    .sort((a, b) => {
                                        const dateA = new Date(a.year, a.month - 1, a.day);
                                        const dateB = new Date(b.year, b.month - 1, b.day);
                                        return dateB - dateA;
                                    })
                                    .map((res, index) => (
                                        <React.Fragment key={index}>
                                            <TableRow>
                                                <DateCell>{`${res.day}/${res.month}/${res.year}`}</DateCell>
                                                <DescriptionCell>
                                                    {expandedRows.includes(index)
                                                        ? res.description
                                                        : getDescriptionPreview(res.description)}
                                                    <Button onClick={() => toggleRowExpansion(index)}>
                                                        {expandedRows.includes(index) ? 'Ver Menos' : 'Ver Mais'}
                                                    </Button>
                                                </DescriptionCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))
                            ) : (
                                <InfoText>Não há nenhum estudante</InfoText>
                            )}
                        </Table>
                    </StudentSection>
                </ContainerDivs>
            )}
        </Container>
    );
};

export default Grade;
