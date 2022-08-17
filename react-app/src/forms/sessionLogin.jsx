import styled, {keyframes} from 'styled-components';  
import React, { useEffect, useState } from 'react'; 
import LoadingArea from '../components/loadingArea'; 
import Input from '../components/input.jsx';
import InputBtn from '../components/inputBtn.jsx'; 
import fetchClient from '../services/fetch-client';
import {  useNavigate} from 'react-router-dom'; 
import CookieManage from '../utilities/cookies_manage'

export default function SignIn ({typeSession, setTypeSession}){ 

    const navigate = useNavigate(); 
    
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [validationEmail, setValidationEmail] = useState('')
    const [validationPassword, setValidationPassword] = useState('')
    const [validationBtn, setValidationBtn] = useState('')

    const handleSubmit = async () => { 
        console.log( 'handleSubmit' )   
        setIsLoading(true)     
        if (chechValidations()){  
 
            localStorage.clear();

            const bodyRequest = { 
                email: email, 
                password: password  
            }
              
            const response = await fetchClient.post( 'session/login', bodyRequest )
            .then( async (r) => r, (error) => error)   

            if (response.code === 200){ 
                const userDetails = JSON.parse(response.body)  
                localStorage.token = userDetails.token;  
                localStorage.authorities = JSON.stringify(userDetails.authorities.map((rol)=> rol.authority) );
                localStorage.email = email;  
                
                console.log('userDetails.sessionTime', userDetails.sessionTime)
                CookieManage.writeCookie('session_t', userDetails.sessionTime, userDetails.sessionTime);

                navigate('/') 
            }else if (response.code === 401){  
                setValidationBtn("Datos Incorrectos")
            }else if (response.code !== 200){   
                setValidationBtn("Error desconocido, contacte con el administrador. " + response.body) 
            }

        }  
        setIsLoading(false)
    } 

    const chechValidations = () => {

        let isValidate = true
        
        setValidationEmail('')  
        setValidationPassword('')   
        setValidationBtn('')
        
        const patternEmail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i          
        if (!email){
            setValidationEmail('Completa este Campo')
            isValidate = false
        }else if(!email.match(patternEmail)){
            setValidationEmail('Coloque una direccion de Email Valida.') 
            isValidate = false
        }  
        
        const patternPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;  
        if (!password){
            setValidationPassword('Completa este Campo')
            isValidate = false
        }else if(!password.match(patternPassword)){
            setValidationPassword('Recuerda que tu contraseña debe tener caracteres especiales, numeros y letras') 
            isValidate = false
        }  

        return isValidate

    } 

    return <SessionContainer>
        <LoadingArea show={isLoading} background={'#0000000'} /> 
        <SessionForm onSubmit={handleSubmit}>
            <br />
            <Title>Inicia Sesión</Title>
            <br />

            <Input type="text" label="Email"                      
            value={email} 
            required={true}
            autoComplete={true}
            setValue={setEmail} 
            placeHolder="Email"
            validationMsm={validationEmail}                     
            />  
            <Input type="password" label="Password"                      
            value={password}
            required={true}
            autoComplete={true}
            setValue={setPassword}
            placeHolder="Password"
            validationMsm={validationPassword}                    
            /> 
            <InputBtn value={'Iniciar sesión'} onClick={handleSubmit}
            validationMsm={validationBtn}                    
            />  
            <br /> 
            <br /> 
            <div>¿No tienes una cuenta?  <TxtHiper onClick={()=>{
                setTypeSession('logup')
            }}> Crear Cuenta</TxtHiper> </div>  
            <br /> 
            <br /> 
        </SessionForm> 
    </SessionContainer> 
}


const Page = styled.div`
    position: relative;
    display: block;
    width: 100%; 
    height: 100vh; 
`

const Title = styled.div` 
    font-size: 20px;
    font-weight: 700; 
`

const fadeIn = keyframes`
    0% { 
        transform: translateY(-250%) translateX(-50%);  
    }
    100% {  
        transform: translateY(0) translateX(-50%);  
    }
`

const SessionContainer = styled.div` 
    width: 500px;
    height: max-content;
    min-height: 300px;   
    max-width: 80%; 
    max-height: 90%;
    margin: auto;
    display: block;
    position: absolute;
    overflow-x: hidden;   
    overflow-y: auto;  
    padding: 0 20px; 
    top: 0;
    left: 50%;
    bottom: 0;
    -ms-transform: translateY(0) translateX(-50%);
    transform: translateY(0) translateX(-50%);  
    border-radius: 5px; 
    animation: ${fadeIn} 1s ease-in-out; 
    -webkit-box-shadow: 0 0 10px 5px #00000083;
    box-shadow: 0 0 10px 5px #00000083; 
    
    background: #9bc9fd;
`

const SessionForm = styled.form` 
    width: 100%; 
`  

const TxtHiper = styled.p`
    display: inline;
    text-align: center; 
    cursor: pointer;
    border: none;  
    text-decoration: underline;
    color: #0066ff;
`