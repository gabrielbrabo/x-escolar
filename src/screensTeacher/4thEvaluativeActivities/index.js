import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clssInfo, getIVthQuarter, GetActivity, updateAvaliacao, createActivity, DestroyActivity } from '../../Api'

import {
    Container,
    ContainerDivs,
    List,
    ListChecked,
    //Emp,
    EmpEdit,
    //Span,
    //SpanEdit,
    //Conceito,
    // Input,
    Btt01,
    Btt02,
    //Grade,
    ContainerStudent,
    EditContainer,
    ErrorMessage,
    DataSelected,
    //Select,
    LegendBox,
    Info,
    BoxBtt,
    ToGoBack,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    FormContainer, Label, Input, Select, ButtonContainer, Button,
    FloatingWindow,
    ActivityItem,
    ActivityInfo,
    EditButton,
    EditWindow,
    BlurBackground,
    BoxButt,
    Overlay,
    Modal,
    DeleteButton,
    CancelButton,
    BoxBttcheck
} from './style';

import {
} from '../../components/Inputs'
import LoadingSpinner from '../../components/Loading'

import { SlActionUndo } from "react-icons/sl";

const IndexAttendance = () => {

    const navigate = useNavigate()
    const [open, setopen] = useState()
    const [Namematter, setNameMatter] = useState([])
    const [year, setYear] = useState('');
    const [bimonthly, setBimonthly] = useState([]);
    const [totalGrade, setTotalGrade] = useState([]);
    const [averageGrade, setAverageGrade] = useState([]);
    const [NotaDistri, setNotaDistri] = useState([]);
    const [id_matter, setMatter] = useState('');
    const [id_class, setId_class] = useState([])
    //const [studentGrade, setStudentGrade] = useState([]);
    const [id_ivThQuarter, setId_ivThQuarter] = useState('');
    //const [stdt, setStdt] = useState([])
    const [checked, setChecked] = useState([])
    const [id_teacher, setId_teacher] = useState([])
    //const [namestudent, setNamestudent] = useState('')
    const [UpdateIdActivity, setUpdateIdActivity] = useState(null);
    //const [update_Activity, setUpdateupdate_Activity] = useState(null);
    const [Updateactivity, setUpdateactivity] = useState(null);

    const [EditedDescription, setEditedDescription] = useState('');
    const [EditedTipo, setEditedTipo] = useState('');
    const [EditedValor, setEditedValor] = useState('');

    const [originalValor, setOriginalValor] = useState(null);

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    //const [grades, setGrades] = useState([]); // Estado para armazenar as notas individuais

    const [Activities, setActivities] = useState(null);

    const [RegentTeacher, setclassRegentTeacher] = useState([]);
    const [RegentTeacher02, setclassRegentTeacher02] = useState([]);
    //const [physicalEducation, setphysicalEducationTeacher] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [IdActivitydestroy, setIdActivitydestroy] = useState(null);

    const [ContStudent, setContStudent] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);

            const idSchool = sessionStorage.getItem("id-school");
            const classRegentTeacher = sessionStorage.getItem("classRegentTeacher");
            const classRegentTeacher02 = sessionStorage.getItem("classRegentTeacher02");
            //const physicalEducationTeacher = sessionStorage.getItem("physicalEducationTeacher");

            setclassRegentTeacher(JSON.parse(classRegentTeacher))
            setclassRegentTeacher02(JSON.parse(classRegentTeacher02))
            // setphysicalEducationTeacher(JSON.parse(physicalEducationTeacher))

            const IVthQuarter = await getIVthQuarter(year, JSON.parse(idSchool))
            const open = await IVthQuarter.data.data.map(res => {
                return res.statusSupervisor

            }).find(res => {
                return res
            })
            setopen(open)
            console.log("open", open)

            const id_teacher = localStorage.getItem("Id_employee");
            const currentYear = sessionStorage.getItem("yearGrade");
            const id_bimonthly = sessionStorage.getItem("id-IV")
            const nameMatter = sessionStorage.getItem("nameMatter")
            const id_mttr = sessionStorage.getItem("Selectmatter")
            const id_class = sessionStorage.getItem("class-info")
            // const resClass = await clssInfo(id_class)

            setMatter(id_mttr)
            setYear(currentYear)
            setId_ivThQuarter(id_bimonthly)

            const bim = await IVthQuarter.data.data.map(res => {
                return res.bimonthly

            })
            const tg = await IVthQuarter.data.data.map(res => {
                return res.totalGrade
            })
            const ag = await IVthQuarter.data.data.map(res => {
                return res.averageGrade
            })

            const bimString = bim.join(' '); // Transformar 'tg' em uma string separada por vírgulas
            const tgString = tg.join(' '); // Transformar 'tg' em uma string separada por vírgulas
            const agString = ag.join(' '); // Transformar 'ag' em uma string separada por vírgulas
            console.log("nameMatter2", nameMatter)

            console.log('tg', tgString, "ag", agString)
            setNameMatter(nameMatter)
            setId_class(id_class)
            setBimonthly(bimString)
            setTotalGrade(tgString)
            setAverageGrade(agString)
            setId_teacher(JSON.parse(id_teacher))


            // setLoading(false);
        })()
    }, [year, averageGrade, totalGrade,])

    useEffect(() => {
        if (id_matter && year && id_ivThQuarter && id_class) {
            setTimeout(() => setLoading(true), 0); // Força atualização no próximo ciclo de renderização

            const fetchActivities = async () => {
                try {
                    const resActivity = await GetActivity(year, bimonthly, id_matter, id_class);
                    if (resActivity.data.data) {
                        console.log("resActivity", resActivity.data.data);
                        setChecked(resActivity.data.data);

                        const resClass = await clssInfo(id_class);
                        const contStudent = await resClass.data.data.find(res => res)?.id_student;
                        console.log('cont stdt', contStudent);
                        setContStudent(contStudent);

                        const totalNotas = await resActivity.data.data.reduce((sum, activity) => sum + Number(activity.valor), 0);
                        setNotaDistri(totalNotas);
                    } else {
                        setChecked([]); // Se não houver atividades, garantir que fique vazio
                    }
                } catch (error) {
                    console.error("Erro ao buscar atividades:", error);
                } finally {
                    setLoading(false); // Desativar o loading após a requisição terminar
                }
            };

            fetchActivities();
        }

        //setLoading(false);
    }, [id_matter, year, id_ivThQuarter, id_class, bimonthly]);


    console.log("checked", checked)
    //console.log("stdt", stdt)

    console.log("totalGrade", totalGrade, "averageGrade", averageGrade,)


    const startEditing = (activity) => {
        setUpdateactivity(activity);
        setUpdateIdActivity(activity._id);
        setEditedDescription(activity.descricao)
        setEditedTipo(activity.tipo)
        setEditedValor(activity.valor)
        setOriginalValor(activity.valor); // Salva o valor antes da edição
        //setNamestudent(ctivity)
    };

    const saveEdit = async () => {
        setLoading(true);

        const editedValorNum = parseFloat(EditedValor.toString().replace(',', '.')) || 0;
        const notaDistriNum = parseFloat(NotaDistri.toString().replace(',', '.')) || 0;
        const totalGradeNum = parseFloat(totalGrade.toString().replace(',', '.')) || 0;
        const originalValorNum = parseFloat(originalValor?.toString().replace(',', '.')) || 0; // Garante que não seja undefined

        // Remove a nota antiga e adiciona a nova
        const totalNotasDistribuidas = notaDistriNum - parseFloat(originalValorNum.toString().replace(',', '.')) + editedValorNum;

        console.log("NotaDistri:", notaDistriNum);
        console.log("OriginalValor:", originalValorNum);
        console.log("EditedValor:", editedValorNum);
        console.log("Total calculado:", totalNotasDistribuidas);
        console.log("Nota total do bimestre:", totalGradeNum);

        if (totalNotasDistribuidas > totalGradeNum) {
            setErrorMessage('Erro: A soma das avaliações não pode ultrapassar a nota total do bimestre.');
        } else {
            await updateAvaliacao(UpdateIdActivity, EditedDescription, EditedTipo, EditedValor);
            setUpdateIdActivity(null);
            window.location.reload();
        }

        setLoading(false);
    };

    const Return = () => {
        navigate(-1)
    };

    const handleActivities = async () => {
        if (totalGrade.length <= 0 || averageGrade.length <= 0) {
            alert('⚠️ Não é possível adicionar avaliação, pois as notas total e média ainda não foram configuradas. Entre em contato com a secretaria para que as devidas configurações sejam realizadas.')
            return
        }
        setActivities(true)
    }

    const [form, setForm] = useState({ descricao: "", tipo: "Normal", valor: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Avaliação cadastrada:", form);
        const bimestreMapping = {
            "1º BIMESTRE": "id_iStQuarter",
            "2º BIMESTRE": "id_iiNdQuarter",
            "3º BIMESTRE": "id_iiiRdQuarter",
            "4º BIMESTRE": "id_ivThQuarter",
            "5º BIMESTRE": "id_vThQuarter",
            "6º BIMESTRE": "id_viThQuarter",
        };
        const quarterIdKey = bimestreMapping[bimonthly];
        console.log("quarterIdKey", quarterIdKey)
        if (quarterIdKey) {
            const tipo = form.tipo;
            const valor = form.valor.replace(',', '.');
            const id_teacher02 = RegentTeacher02;
            const descricao = form.descricao
            const totalNotasDistribuidas = NotaDistri + Number(valor); // Soma das notas já distribuídas com a nova
            console.log("NotaDistri", NotaDistri)
            console.log("totalNotasDistribuidas", totalNotasDistribuidas)
            if (totalNotasDistribuidas > Number(totalGrade.replace(',', '.'))) {
                setErrorMessage('Erro: A soma das avaliações não pode ultrapassar a nota total do bimestre.');
            } else {
                if (RegentTeacher02 === id_teacher) {
                    setLoading(true)
                    const res = await createActivity({
                        year,
                        bimonthly,
                        descricao,
                        tipo,
                        valor,
                        id_teacher02,
                        id_teacher: RegentTeacher,
                        id_matter,
                        id_class,
                        [quarterIdKey]: id_ivThQuarter
                    });
                    console.log("res creatActivit", res)
                    if (res) {
                        sessionStorage.setItem('id-activity', res.data.activity._id)
                        navigate('/$num-quarter-grade')
                    } else {
                        setErrorMessage('Erro, verifique os dados e tente novamente.');
                    }
                    setLoading(false)
                } else {
                    setLoading(true)
                    const res = await createActivity({
                        year,
                        bimonthly,
                        descricao,
                        tipo,
                        valor,
                        id_teacher02,
                        id_teacher,
                        id_matter,
                        id_class,
                        [quarterIdKey]: id_ivThQuarter
                    });
                    if (res) {
                        sessionStorage.setItem('id-activity', res.data.activity._id)
                        navigate('/$num-quarter-grade')
                        console.log("res creatActivit", res.data.activity._id)
                    } else {
                        setErrorMessage('Erro, verifique os dados e tente novamente.');
                    }
                    setLoading(false)
                }
            }

        }
    };

    const handleOpenModal = async (activity) => {
        console.log("activity", activity._id)
        setIdActivitydestroy(activity._id)
        setShowModal(true)
    };

    const confirmDelete = async () => {
        setLoading(true)
        const res = await DestroyActivity(IdActivitydestroy);
        if (res) {
            window.location.reload();
        }
        setLoading(false)
    };

    const handleAddNota = async (activity) => {
        const idActivity = activity._id
        sessionStorage.setItem('id-activity', idActivity)
        navigate('/$num-quarter-grade')
    };

    console.log('form', form)


    console.log("startEditing", startEditing._id)

    return (
        <Container>
            {loading ?
                <LoadingSpinner />
                :
                <ContainerDivs>
                    <h2>Avaliações</h2>
                    {open === 'aberto' ? (
                        <ContainerStudent>
                            <DataSelected>
                                <SlActionUndo fontSize={'30px'} onClick={Return} />
                                <Info>
                                    <p>Bimestre: 4º Bimestre</p>
                                    <p>Disciplina: {Namematter}</p>
                                </Info>
                                <LegendBox>
                                    <h3>Legenda</h3>
                                    <p>Nota Total: <strong style={{ color: '#1d7f14' }}>{totalGrade}</strong></p>
                                    <p>Nota Média: <strong style={{ color: 'blue' }}>{averageGrade}</strong></p>
                                    <p>Notas Distribuidas: <strong style={{ color: '#FFA500' }}>{NotaDistri}</strong></p>
                                </LegendBox>
                            </DataSelected>

                            <BoxBtt>
                                <Btt01 onClick={handleActivities}>Adicionar Avaliação</Btt01>
                            </BoxBtt>
                            {!UpdateIdActivity &&
                                <>
                                    {Activities === true &&
                                        <FloatingWindow>
                                            <List>
                                                {
                                                    <FormContainer>
                                                        <h3>Cadastro de Avaliação</h3>
                                                        <p style={{ color: '#158fa2' }}>{bimonthly}</p>
                                                        <Label>Descrição</Label>
                                                        <Input type="text" name="descricao" value={form.descricao} onChange={handleChange} />

                                                        <Label>Tipo</Label>
                                                        <Select name="tipo" value={form.tipo} onChange={handleChange}>
                                                            <option value="Normal">Normal</option>
                                                            <option value="Prova">Prova</option>
                                                            <option value="Trabalho">Trabalho</option>
                                                            <option value="Outra Atividade">Outra Atividade</option>
                                                        </Select>

                                                        <Label>Valor da Atividade</Label>
                                                        <Input type="number" name="valor" value={form.valor} onChange={handleChange} />
                                                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                                        <ButtonContainer>
                                                            <Button cancel onClick={() => {
                                                                setActivities(null);
                                                                setForm({ descricao: "", tipo: "Normal", valor: "" });
                                                            }}>
                                                                Cancelar
                                                            </Button>
                                                            <Button onClick={handleSubmit}>Salvar</Button>
                                                        </ButtonContainer>
                                                    </FormContainer>
                                                }
                                            </List>
                                        </FloatingWindow>
                                    }
                                    {checked.length > 0 ? (

                                        <ListChecked>
                                            {
                                                checked
                                                    .map(activity => (
                                                        <ActivityItem key={activity._id}>
                                                            <ActivityInfo>
                                                                {/*<p>{activity.id_matter.name}</p>  Nome da Matéria */}
                                                                <p>{activity.descricao}</p> {/* Valor da Atividade */}
                                                                <p>{activity.bimonthly}</p> {/* Bimestre */}
                                                                <p>Tipo: {activity.tipo}</p> {/* Tipo de Atividade */}
                                                                <p>Valor: <span style={{ color: '#FFA500' }}>{activity.valor}</span> pts</p>
                                                            </ActivityInfo>
                                                            <BoxBttcheck>
                                                                <EditButton onClick={() => startEditing(activity)}>Editar</EditButton>
                                                                <EditButton onClick={() => handleOpenModal(activity)}>Apagar</EditButton>
                                                                <EditButton
                                                                    style={{ background: activity.studentGrades.length >= ContStudent.length ? 'green' : 'red' }}
                                                                    onClick={() => handleAddNota(activity)}
                                                                >
                                                                    {activity.studentGrades.length >= ContStudent.length ? 'Ver Notas' : 'Notas Pendentes'}
                                                                </EditButton>
                                                            </BoxBttcheck>

                                                        </ActivityItem>
                                                    ))
                                            }
                                            <ToGoBack onClick={Return}>
                                                <SignMessageButtonText>Voltar para a</SignMessageButtonText>
                                                <SignMessageButtonTextBold>Turma</SignMessageButtonTextBold>
                                            </ToGoBack>
                                        </ListChecked>
                                    ) : (
                                        <p>Não há Avaliações cadastradas!</p>
                                    )
                                    }
                                </>
                            }
                            {UpdateIdActivity && (
                                <EditContainer>
                                    {/* Container para o fundo desfocado */}
                                    <BlurBackground />
                                    <EditWindow>
                                        <h3>Editando Avaliação</h3>
                                        {console.log("editingStudent", Updateactivity)}
                                        <EmpEdit>
                                            <Label>Descrição</Label>
                                            <Input
                                                type="text"
                                                name="descricao"
                                                value={EditedDescription}
                                                onChange={(e) => setEditedDescription(e.target.value)}
                                            />

                                            <Label>Tipo</Label>
                                            <Select
                                                name="tipo"
                                                value={EditedTipo}
                                                onChange={(e) => setEditedTipo(e.target.value)}
                                            >
                                                <option value="Normal">Normal</option>
                                                <option value="Prova">Prova</option>
                                                <option value="Trabalho">Trabalho</option>
                                                <option value="Outra Atividade">Outra Atividade</option>
                                            </Select>

                                            <Label>Valor da Atividade</Label>
                                            <Input
                                                type="number"
                                                name="valor"
                                                value={EditedValor}
                                                onChange={(e) => setEditedValor(e.target.value)}
                                            />
                                        </EmpEdit>
                                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                                        <BoxButt>
                                            <Btt02 onClick={() => setUpdateIdActivity(null)}>Cancelar</Btt02>
                                            <Btt02 onClick={saveEdit}>Salvar</Btt02>
                                        </BoxButt>
                                    </EditWindow>
                                </EditContainer>
                            )}

                            {showModal && (
                                <Overlay>
                                    <Modal>
                                        <h3>Tem certeza que deseja apagar essa Avaliação?</h3>
                                        <p>Todas as notas relacionadas a esta avaliação tambem seram apagadas!</p>
                                        <CancelButton onClick={() => setShowModal(false)}>Cancelar</CancelButton>
                                        <DeleteButton onClick={confirmDelete}>Apagar</DeleteButton>
                                    </Modal>
                                </Overlay>
                            )}

                            {/*!update_id_grade &&
                                <Btt02 onClick={Finalyze}>
                                    Finalizar
                                </Btt02>*/
                            }
                        </ContainerStudent>
                    ) : (
                        <p>3º Bimestre fechado, para editar contate o Diretor ou Supervisor.</p>
                    )}
                </ContainerDivs>
            }
        </Container>
    )
}

export default IndexAttendance