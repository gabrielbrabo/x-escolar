import React, { useState, useEffect } from 'react';
import { clssInfo, FinalConceptsDaily } from '../../Api';
import { useNavigate } from 'react-router-dom';
import {
    //Container,
    PrintStyle,
    AttendanceContainer,
    DataBimonthly,
    ContInfo,
    CtnrBtt,
    ContTable,
    TableHeader,
    Button,
    // uniqueDates,
    // formatDisplayDate,
    TableBody,
    //calculateTotals,
    InfoText,
    Table,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './style';

import LoadingSpinner from '../../components/Loading';

const IndividualFormList = () => {
    const navigate = useNavigate();

    const [year, setyear] = useState("");

    const [stdt, setStdt] = useState([]);
    const [id_teacher, setid_teacher] = useState("");
    const [id_class, setid_class] = useState("");

    const [loading, setLoading] = useState(false);

    const [IndividualForm, setIndividualForm] = useState([]);
    const [nameTeacher, setnameTeacher] = useState([]);
    const [nameClass, setnameClass] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const year = new Date().getFullYear().toString();
            const SelectteacherDaily = JSON.parse(sessionStorage.getItem("Selectteacher-daily"));
            const Nameclass = JSON.parse(sessionStorage.getItem("Nameclass-daily"));
            const SelectclassDaily = sessionStorage.getItem("Selectclass-daily");

            setid_teacher(SelectteacherDaily._id);
            setid_class(SelectclassDaily);

            setnameTeacher(SelectteacherDaily.name);
            setnameClass(Nameclass.serie);
            setyear(year);


            if (year && id_class) {

                const resClass = await clssInfo(id_class);
                const student = resClass.data.data.find((res) => res).id_student.map((res) => {
                    return res || null;
                });
                setStdt(student);

                try {
                    const res = await FinalConceptsDaily({
                        year,
                        id_class,
                    })
                    const resForm = await res.data.data.filter(res => {
                        if (! null) {
                            return (res)
                        } else {
                            return (null)
                        }
                    })
                    setIndividualForm(resForm)
                    console.log("individual form", res);
                    console.log("Form", resForm);
                } catch (error) {
                    console.error("Erro ao buscar dados:", error);
                }
                setLoading(false);
            }
        })();
    }, [id_class, id_teacher,]);

    /*IndividualForm.sort(function (a, b) {
        if (a.id_student.name < b.id_student.name) return -1
        if (a.id_student.name > b.id_student.name) return 1
        return 0
    })*/



    const uniqueMatters = [...new Set(IndividualForm.map((item) => item.id_matter.name))];
    // const uniqueGrade = [...new Set(IndividualForm.map((item) => item))];

    const getGrade = (studentId, date, index) => {
        const Grade = IndividualForm.find(
            (gradeFrom) => gradeFrom.id_student._id === studentId && gradeFrom.id_matter.name === date
        );
        if (Grade) {
            return (
                <td className={`status-cell matter-cell-${index}`}>
                    {Grade.studentGrade}
                </td>
            );
        }
        return <td className={`status-cell matter-cell-${index}`}>-</td>;
    };

    const messageButtonClick = () => {
        navigate(-1);
    };

    console.log("res form", IndividualForm)

    return (
        <PrintStyle>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <AttendanceContainer className="printable-content">
                    <h2>Conceitos Finais</h2>
                    <ContInfo>
                        <CtnrBtt>
                            <Button className="no-print" onClick={() => window.print()}>Imprimir</Button>
                        </CtnrBtt>
                        <span><strong>Professor:</strong> {nameTeacher}</span>
                        <span><strong>Turma:</strong> {nameClass}</span>
                    </ContInfo>
                    <DataBimonthly>
                        <span>
                            <strong>Ano: {year}</strong>
                        </span>
                    </DataBimonthly>
                    <ContTable>
                        {IndividualForm.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <tr>
                                        <th className="name-cell">Nome do Aluno</th>
                                        {uniqueMatters.map((matter, index) => (
                                            <th key={index} className={`matter-cell matter-cell-${index}`}>
                                                {matter}
                                            </th>
                                        ))}
                                    </tr>
                                </TableHeader>
                                <TableBody>
                                    {stdt
                                        .sort((a, b) => a.name.localeCompare(b.name)) // Ordena em ordem alfabética
                                        .map((student) => (
                                            <tr key={student._id}>
                                                <td className="name-cell">{student.name}</td>
                                                {uniqueMatters.map((date, index) => (
                                                    <React.Fragment key={index}>
                                                        {getGrade(student._id, date, index)}
                                                    </React.Fragment>
                                                ))}
                                            </tr>
                                        ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Table>
                                <InfoText>Não há nenhum registro</InfoText>
                            </Table>
                        )
                        }
                    </ContTable>
                    <ToGoBack onClick={messageButtonClick}>
                        <SignMessageButtonText>Voltar para o</SignMessageButtonText>
                        <SignMessageButtonTextBold>Perfil do Professor</SignMessageButtonTextBold>
                    </ToGoBack>
                </AttendanceContainer>
            )}
        </PrintStyle>
    );
};

export default IndividualFormList;
