import Styled from 'styled-components';

import React, { useState, useEffect } from "react";

//import { useNavigate } from 'react-router-dom'

const Nav = Styled.div`
    display: flex;
    box-shadow: 2px 0px 5px black;
    
    *,
    *::after,
    *::before {
        margin: 0;
        box-sizing: border-box;
    }
    html {
        font-size: 62.5%;
    }
    body {
        font-size: 1.6rem;
    }

    .nav__menu {
        align-items: center;
        min-height: 80vh;
        background: rgb(0, 33, 65);
        flex-direction: column;
        transition: 0.5s ease-in;
        box-shadow: 2px 0px 5px black;
    
    }
    .nav__active {
        display: flex; 
        background-color: #474a51 ;
        width: 200px;
    }
    .nav__toggler div {
        width: 2.5rem;
        height: 0.2rem;
        margin: 0.4rem;
        background-color: #474a51 ;
        transition: 0.3s ease-in;
    }
    
    .toggle .line1 {
        transform: rotate(-45deg) translate(-4px, 5px);
    }
    .toggle .line2 {
        opacity: 0;
    }
    .toggle .line3 {
        transform: rotate(45deg) translate(-4px, -5px);
    }
    
    .nav__toggler {
    }
    
    @media screen and (max-width: 768px) {
        .nav__toggler {
            position: absolute;
        }
        .nav__menu {
            position: absolute;
            width: 100%;
            min-height: 81vh;
        }
    }
`;
/*const NavBrand = Styled.div`
    text-transform: uppercase;
    display: flex;
    c
    margin-right: 8rem;
    color: #99e7ff;

    .nav__logo {
        font-size: 4.5rem;
    }
`;*/
const Active = Styled.div`
    margin-top: 50px;
    .nav__item :hover {
        color: #3d879e;
    }

    @media screen and (max-width: 768px) {
        margin-top: 50px;
    }
`;
const NavItem = Styled.div`
    display: flex;
    border: none;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-bottom: 2px;
    box-shadow: 0px 2px 5px black;

    a {
        text-decoration: none;
        color: #99e7ff;
    }
`;

const Menu = Styled.div`
    display: grid;
    width: 100%;
`;

const Icon = Styled.div`
    background-color: #99e7ff;
    height: 6vh;
`;

function NavBar () {

    //const [mobile, setMobile] = useState(false);

    //const navigate = useNavigate()
    const [type, setType] = useState();
    const [mobile, setMobile] = useState();
    const [position_at_school, setPosition_at_school] = useState();
    const [active, setActive] = useState();
    const [icon, setIcon] = useState();
    const navToggle = () => {
        if (active === "nav__menu") {
            setActive("nav__menu nav__active");
            setIcon("nav__toggler toggle");
        } 
        
        if(active === "nav__menu nav__active") {
            setActive("nav__menu");
            setIcon("nav__toggler");
        }
        
        /*if (icon === "nav__toggler") {
            setIcon("nav__toggler toggle");
        } else setIcon("nav__toggler");*/
    };
    
    useEffect( () => {
        
        //setLoading(true);
        let Type =  sessionStorage.getItem("type")
        let position_at_school =  sessionStorage.getItem("position_at_school")
        //let position =  sessionStorage.getItem("position_at_school")
        
        if (Type) {
            setType(Type)
        }

        if (position_at_school) {
            setPosition_at_school(position_at_school)
        }

        if( navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)
        ){
    
            setActive("nav__menu")
            setIcon("nav__toggler");
            setMobile(true)
    
          //setLoading(false);
    
        } else {
          
            setActive("nav__menu nav__active")
            setIcon("nav__toggler toggle");
            setMobile(false)
    
          //setLoading(false);
    
        }
        sessionStorage.setItem("mobile", mobile)

    }, [type, mobile])

    return (
        <Nav className='home'>
            {
                active === "nav__menu nav__active" 
                && 
                <Active className={active}>
                    { 
                        type === 'school'
                        &&
                        <Menu>
                            <NavItem className="nav__item">
                                <a href="/home/school" className="nav__link">
                                    Home
                                </a>
                            </NavItem>
                            <NavItem className="nav__item">
                                <a href="/matter" className="nav__link">
                                    Materias
                                </a>
                            </NavItem>
                            <NavItem className="nav__item">
                                <a href="/employees" className="nav__link">
                                    Funcionarios
                                </a>
                            </NavItem>
                            <NavItem className="nav__item">
                                <a href="/class" className="nav__link">
                                    Turmas
                                </a>
                            </NavItem>
                            <NavItem className="nav__item">
                                <a href="/student" className="nav__link">
                                    Alunos
                                </a>
                            </NavItem>
                        </Menu>
                    }
                    
                    { 
                        type === 'employee' && position_at_school === "PROFESSOR"
                        &&
                        <Menu>
                            <NavItem className="nav__item">
                                <a href="/" className="nav__link">
                                    Home
                                </a>
                            </NavItem>
                            <NavItem className="nav__item">
                                <a href="/" className="nav__link">
                                    Minhas Turmas
                                </a>
                            </NavItem>
                            <NavItem className="nav__item">
                                <a href="/" className="nav__link">
                                Meus Alunos
                                </a>
                            </NavItem>
                        </Menu>
                    }
                </Active>
            }
            <Icon onClick={navToggle} className={icon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </Icon>
        </Nav>
    );
}

export default NavBar