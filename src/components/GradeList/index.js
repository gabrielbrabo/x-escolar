import React, { useState, useEffect } from 'react';
import { clssInfo, IndexGradeDaily, getIstQuarter, getIIndQuarter, getIIIrdQuarter, getIVthQuarter, getVthQuarter, getVIthQuarter } from '../../Api';
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

    const [startd, setStartd] = useState("");
    const [startm, setStartm] = useState("");
    const [starty, setStarty] = useState("");
    const [endd, setEndd] = useState("");
    const [endm, setEndm] = useState("");
    const [endy, setEndy] = useState("");


    const [bimonthly, setBimonthly] = useState([])

    const [stdt, setStdt] = useState([]);
    const [id_teacher, setid_teacher] = useState("");
    const [id_class, setid_class] = useState("");
    const [bimonthlyDaily, setbimonthlyDaily] = useState([]);

    const [loading, setLoading] = useState(false);
    //const [isTeacher, setIsTeacher] = useState([]);
    const [IndividualForm, setIndividualForm] = useState([]);
    const [nameTeacher, setnameTeacher] = useState([]);
    const [nameClass, setnameClass] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const year = new Date().getFullYear();
            const SelectbimonthlyDaily = JSON.parse(sessionStorage.getItem("Selectbimonthly-daily"));
            const SelectteacherDaily = JSON.parse(sessionStorage.getItem("Selectteacher-daily"));
            const Nameclass = JSON.parse(sessionStorage.getItem("Nameclass-daily"));
            const SelectclassDaily = sessionStorage.getItem("Selectclass-daily");
            const idSchool = SelectteacherDaily.id_school;

            setid_teacher(SelectteacherDaily._id);
            setid_class(SelectclassDaily);
            setbimonthlyDaily(SelectbimonthlyDaily.bimonthly);
            setnameTeacher(SelectteacherDaily.name);
            setnameClass(Nameclass.serie);

            if (SelectbimonthlyDaily.bimonthly === "1º BIMESTRE") {
                const IstQuarter = await getIstQuarter(year, idSchool);
                const res = IstQuarter.data.data.find((res) => res);
                setStartd(res.startday);
                setStartm(res.startmonth);
                setStarty(res.startyear);
                setEndd(res.endday);
                setEndm(res.endmonth);
                setEndy(res.endyear);
                setBimonthly(SelectbimonthlyDaily.bimonthly)
            }
            if (SelectbimonthlyDaily.bimonthly === "2º BIMESTRE") {
                const IIndQuarter = await getIIndQuarter(year, idSchool);
                const res = IIndQuarter.data.data.find((res) => res);
                setStartd(res.startday);
                setStartm(res.startmonth);
                setStarty(res.startyear);
                setEndd(res.endday);
                setEndm(res.endmonth);
                setEndy(res.endyear);
                setBimonthly(SelectbimonthlyDaily.bimonthly)
            }
            if (SelectbimonthlyDaily.bimonthly === "3º BIMESTRE") {
                const IIIrdQuarter = await getIIIrdQuarter(year, idSchool);
                const res = IIIrdQuarter.data.data.find((res) => res);
                setStartd(res.startday);
                setStartm(res.startmonth);
                setStarty(res.startyear);
                setEndd(res.endday);
                setEndm(res.endmonth);
                setEndy(res.endyear);
                setBimonthly(SelectbimonthlyDaily.bimonthly)
            }
            if (SelectbimonthlyDaily.bimonthly === "4º BIMESTRE") {
                const IVthQuarter = await getIVthQuarter(year, idSchool);
                const res = IVthQuarter.data.data.find((res) => res);
                setStartd(res.startday);
                setStartm(res.startmonth);
                setStarty(res.startyear);
                setEndd(res.endday);
                setEndm(res.endmonth);
                setEndy(res.endyear);
                setBimonthly(SelectbimonthlyDaily.bimonthly)
            }
            if (SelectbimonthlyDaily.bimonthly === "5º BIMESTRE") {
                const VthQuarter = await getVthQuarter(year, idSchool);
                const res = VthQuarter.data.data.find((res) => res);
                setStartd(res.startday);
                setStartm(res.startmonth);
                setStarty(res.startyear);
                setEndd(res.endday);
                setEndm(res.endmonth);
                setEndy(res.endyear);
                setBimonthly(SelectbimonthlyDaily.bimonthly)
            }
            if (SelectbimonthlyDaily.bimonthly === "6º BIMESTRE") {
                const VIthQuarter = await getVIthQuarter(year, idSchool);
                const res = VIthQuarter.data.data.find((res) => res);
                setStartd(res.startday);
                setStartm(res.startmonth);
                setStarty(res.startyear);
                setEndd(res.endday);
                setEndm(res.endmonth);
                setEndy(res.endyear);
                setBimonthly(SelectbimonthlyDaily.bimonthly)
            }
            console.log("bimonthly", bimonthly)
            if (year && id_class && bimonthly) {

                const resClass = await clssInfo(id_class);
                const student = resClass.data.data.find((res) => res).id_student.map((res) => {
                    return res || null;
                });
                setStdt(student);

                const bimestreMapping = {
                    "1º BIMESTRE": "id_iStQuarter",
                    "2º BIMESTRE": "id_iiNdQuarter",
                    "3º BIMESTRE": "id_iiiRdQuarter",
                    "4º BIMESTRE": "id_ivThQuarter",
                    "5º BIMESTRE": "id_vThQuarter",
                    "6º BIMESTRE": "id_viThQuarter",
                };

                const quarterIdKey = bimestreMapping[SelectbimonthlyDaily.bimonthly];
                if (quarterIdKey) {
                    try {
                        const idQuarter = SelectbimonthlyDaily._id;
                        const res = await IndexGradeDaily({
                            year,
                            id_class,
                            [quarterIdKey]: idQuarter,
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
                }
            }
            setLoading(false);
        })();
    }, [bimonthly, id_class, id_teacher, startd, startm, starty, endd, endm, endy]);

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
                    <h2>Conceitos do {bimonthlyDaily}</h2>
                    <DataBimonthly>
                        <span>
                            <strong>Início:</strong> {startd}/{startm}/{starty}
                        </span>
                        <span>
                            <strong>Fim:</strong> {endd}/{endm}/{endy}
                        </span>
                    </DataBimonthly>
                    <ContInfo>
                        <CtnrBtt>
                            <Button className="no-print" onClick={() => window.print()}>Imprimir</Button>
                        </CtnrBtt>
                        <span><strong>Professor:</strong> {nameTeacher}</span>
                        <span><strong>Turma:</strong> {nameClass}</span>
                    </ContInfo>
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
                                    {stdt.map((student) => (
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
