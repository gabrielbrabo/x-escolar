import React, { useState, useEffect } from 'react'
import { /*useNavigate,*/ useParams } from 'react-router-dom'
import {
    indexSchool
} from '../../Api'

import {
    Container,
    
    LoadingSpinnerContainer,
    ContainerDivs,
} from './style';

import LoadingSpinner from '../../components/Loading'

const SchoolInformation = () => {

    //const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const { id } = useParams()

    useEffect(() => {
        (async () => {
            setLoading(true);
            //const idSchool = 
            const res = await indexSchool(id)
            console.log("res info schools", res.data.data)
            setLoading(false);
        })()

    }, [id])

    

    return (
        <Container>
            {loading ? (
                <LoadingSpinnerContainer>
                    <LoadingSpinner />
                </LoadingSpinnerContainer>
            ) : (
                <ContainerDivs>
                    <p>{id}</p>
                </ContainerDivs>
            )}
        </Container>
    );
}

export default SchoolInformation;