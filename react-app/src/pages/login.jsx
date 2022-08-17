import styled, {keyframes} from 'styled-components';  
import React, { useEffect, useState } from 'react';  
import BackgroundBlur from '../components/BackgroundBlur';
import SignIn from '../forms/sessionLogin';
import SignUp from '../forms/sessionRegister'; 
import {  useNavigate} from 'react-router-dom'; 

export default function Session({ type }) {
 
    const [typeSession, setTypeSession] = useState('login') 
    const navigate = useNavigate(); 

    useEffect(()=> { 
        if ( localStorage.email != null){
            navigate("/") 
        }
    }, [])
 
    return <Page>
        <BackgroundBlur/>
        {
            typeSession === 'login' 
            ? <SignIn typeSession={typeSession} setTypeSession={setTypeSession} /> 
            : <SignUp typeSession={typeSession} setTypeSession={setTypeSession}/>
        }
    </Page>
}
 
const Page = styled.div`
    position: relative;
    display: block;
    width: 100%; 
    height: 100vh; 
`  