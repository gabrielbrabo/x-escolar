import { Container } from "./styles";
import React, { useState, useEffect } from "react";

import { RiMenu3Fill } from 'react-icons/ri';

export function Header({ setMenuIsVisible }) {
    const [position_at_school, setPosition_at_school] = useState();
    const [name, setname] = useState();

    useEffect(() => {

        //setLoading(true);
        let position_at_school = sessionStorage.getItem("position_at_school")
        //let position =  sessionStorage.getItem("position_at_school")

        if (position_at_school) {
            const name = sessionStorage.getItem("name")
            setPosition_at_school(position_at_school)
            setname(name)
        }

    }, [])

    const handleLogout = () => {
        //logout()
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload()
    }

    return (
        <Container>
            <section>
                {/*<img src={logoImg} alt="Logo"/>*/}
                {
                    position_at_school === "GESTOR"
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
                    position_at_school === "PROFESSOR"
                    &&
                    <nav>
                        <a href="/home/school" >
                            Home
                        </a>
                        <a href="/myclasses" className="nav__link">
                            Minhas Turmas
                        </a>
                    </nav>
                }
            </section>
            <div className="user">
                <div>
                    <div className='name-user'>User: {name}</div>
                    <div className='type-user'>Função: {position_at_school}</div>
                </div>
                <button onClick={handleLogout} className='butto-exit'>Sair</button>
            </div>

            <section>
                <RiMenu3Fill onClick={() => setMenuIsVisible(true)} className="mobile" />
            </section>
        </Container>
    )
}