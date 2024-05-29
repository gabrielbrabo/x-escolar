import { Container } from "./styles";
import React, { useState, useEffect } from "react";

import { RiMenu3Fill } from 'react-icons/ri';

export function Header({ setMenuIsVisible }) {
    const [type, setType] = useState();
    const [position_at_school, setPosition_at_school] = useState();

    useEffect(() => {

        //setLoading(true);
        let Type = sessionStorage.getItem("type")
        let position_at_school = sessionStorage.getItem("position_at_school")
        //let position =  sessionStorage.getItem("position_at_school")

        if (Type) {
            setType(Type)
        }

        if (position_at_school) {
            setPosition_at_school(position_at_school)
        }

    }, [])
    return (
        <Container>
            <section>
                {/*<img src={logoImg} alt="Logo"/>*/}
                {
                    type === 'school'
                    &&
                    <nav>
                        <a href="/home/school" >
                            Home
                        </a>
                        <a href="/matter" className="nav__link">
                            Materias
                        </a>
                        <a href="/employees" className="nav__link">
                            Funcionarios
                        </a>
                        <a href="/class" className="nav__link">
                            Turmas
                        </a>
                        <a href="/student" className="nav__link">
                            Alunos
                        </a>
                    </nav>
                }
                {
                    type === 'employee' && position_at_school === "PROFESSOR"
                    &&
                    <nav>
                        <a href="/home/school" >
                            Home
                        </a>
                        <a href="/class" className="nav__link">
                            Turmas
                        </a>
                        <a href="/student" className="nav__link">
                            Alunos
                        </a>
                    </nav>
                }
            </section>

            <section>
                <RiMenu3Fill onClick={() => setMenuIsVisible(true)} className="mobile" />
            </section>
        </Container>
    )
}