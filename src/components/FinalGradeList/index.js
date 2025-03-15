import React, { useState, useEffect } from 'react';
import { clssInfo, FinalConceptsDaily, FinalConceptsDailyTeacher02 } from '../../Api';
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
    const [nameSchool, setnameSchool] = useState("");
    const [id_teacher, setid_teacher] = useState("");
    const [id_class, setid_class] = useState("");

    const [loading, setLoading] = useState(false);

    const [IndividualForm, setIndividualForm] = useState([]);
    const [nameTeacher, setnameTeacher] = useState([]);
    const [nameClass, setnameClass] = useState([]);

    const [RegentTeacher02, setclassRegentTeacher02] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const year = new Date().getFullYear().toString();
            const SelectteacherDaily = JSON.parse(sessionStorage.getItem("Selectteacher-daily"));
            const Nameclass = JSON.parse(sessionStorage.getItem("Nameclass-daily"));
            const SelectclassDaily = sessionStorage.getItem("Selectclass-daily");

            setnameSchool(SelectteacherDaily.id_school.name);
            setid_teacher(SelectteacherDaily._id);
            setid_class(SelectclassDaily);

            setnameTeacher(SelectteacherDaily.name);
            setnameClass(Nameclass.serie);
            setyear(year);

            const Employee02 = await Nameclass.classRegentTeacher02.find(res => {
                return res
            })

            setclassRegentTeacher02(Employee02)

            if (year && id_class) {

                const resClass = await clssInfo(id_class);
                const student = resClass.data.data.find((res) => res).id_student.map((res) => {
                    return res || null;
                });
                setStdt(student);

                try {
                    if (RegentTeacher02 === id_teacher) {
                        
                        const id_teacher02 = RegentTeacher02

                        const res = await FinalConceptsDailyTeacher02({
                            year,
                            id_class,
                            id_teacher02
                        })
                        const resForm = await res.data.data.filter(res => {
                            if (! null) {
                                return (res)
                            } else {
                                return (null)
                            }
                        })
                        setIndividualForm(resForm)
                    } else {
                        const res = await FinalConceptsDaily({
                            year,
                            id_class,
                            id_teacher,
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
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados:", error);
                }
                setLoading(false);
            }
        })();
    }, [id_class, id_teacher, RegentTeacher02]);

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

    const handlePrint = () => {
        const printContent = document.getElementById("printable-content");

        if (printContent) {
            const printWindow = window.open("", "_blank");
            printWindow.document.write(`
            <html>
              <head>
                <title>Impressão</title>
                <style>
                  body { font-family: Arial, sans-serif; margin: 20px; }
                  table { width: 100%; border-collapse: collapse; }
                  th, td { 
                    text-align: center;
                    border: 1px solid #ddd;
                    font-size: 8px;
                    padding: 1px; 
                  }
                    tr {
                      
                    }
                    .name-cell {
                        text-align: start;
                    }
                  @page {
                    size: A4 landscape; /* Define o formato da página como paisagem */
                    margin: 0;
                  }  
                  ContTable {
                    overflow-x: hidden; /* Permite rolagem horizontal */
                    width: max-content; /* Garante que a tabela ocupe a largura do conteúdo */
                    margin-left: auto; /* Centraliza horizontalmente */
                    margin-right: auto; /* Centraliza horizontalmente */
                  }
                    .printable-content {
                      visibility: visible; /* Exibe apenas o conteúdo dentro desta classe */
                      font-size: 15px;
                      //transform: scale(1); /* Ajusta a escala da tabela */
                    }
                  .data {
                    display: flex;
                    gap:15px;
                  }
                  .info {
                    display: flex;
                    flex-direction: column;
                  }
                    .no-print {
                      display: none !important;
                    }
                </style>
              </head>
              <body>
                ${printContent.innerHTML} 
              </body>
            </html>
          `);

            printWindow.document.close();

            // Força um pequeno delay antes de chamar print()
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        }
    };

    console.log("res form", IndividualForm)

    return (
        <PrintStyle>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <AttendanceContainer id="printable-content" className="printable-content">
                    <h2>Conceitos Finais</h2>
                    <ContInfo className="info">
                        <CtnrBtt>
                            <Button className="no-print" onClick={handlePrint}>Imprimir</Button>
                        </CtnrBtt>
                        <span><strong>Escola:</strong> {nameSchool}</span>
                        <span><strong>Professor:</strong> {nameTeacher}</span>
                        <span><strong>Turma:</strong> {nameClass}</span>
                    </ContInfo>
                    <DataBimonthly className="data">
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
                    <ToGoBack onClick={messageButtonClick} className="no-print">
                        <SignMessageButtonText>Voltar para o</SignMessageButtonText>
                        <SignMessageButtonTextBold>Perfil do Professor</SignMessageButtonTextBold>
                    </ToGoBack>
                </AttendanceContainer>
            )}
        </PrintStyle>
    );
};

export default IndividualFormList;
