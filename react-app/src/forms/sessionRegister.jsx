import styled, {keyframes} from 'styled-components';  
import React, { useEffect, useState } from 'react';    
import LoadingArea from '../components/loadingArea';
import Input from '../components/input';
import InputBtn from '../components/inputBtn';
import Paragraph from '../components/Paragraph';
import fetchClient from '../services/fetch-client'; 

export default function SignUp ({typeSession, setTypeSession}){ 
 
    //Const to control submit
    const [isLoading, setIsLoading] = useState(false)

    //Const to control inputs values
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('') 
    const [ password, setPassword ] = useState('')
    const [ passwordRepet, setPasswordRepet ] = useState('') 
    
    //Const to show message if condition  is not met
    const [nameErrMsm, setNameErrMsm] = useState('') 
    const [emailErrMsm, setEmailErrMsm] = useState('') 
    const [passwordErrMsm, setPasswordErrMsm] = useState('')
    const [passwordRepetErrMsm, setPasswordRepetErrMsm] = useState('') 
    const [validationBtn, setValidationBtn] = useState('')

    const handleSubmit = async () => { 
        console.log( 'handleSubmit' )   
        setIsLoading(true)     
        if (chechValidations()){  

            const bodyRequest = {
                firstName: firstName,
                secondName: secondName,
                lastName: lastName,
                email: email, 
                password: password 
            }

            const response = await fetchClient.post( 'session/register', bodyRequest  )
            .then( async (r) => r, (error) => error)  

            if (response.code >= 200 && response.code <= 299){ 
                console.log('response : ', response )  
                window.location.reload(true)
            } else if (response.code !== 200){   
                setValidationBtn("Error: " + response.body) 
            }    
        }  
        setIsLoading(false)
    } 

    const chechValidations = () => {

        let isValidate = true
        
        setNameErrMsm('')  
        setEmailErrMsm('') 
        setPasswordErrMsm('') 
        setPasswordRepetErrMsm('') 
        
        if (!firstName){
            setNameErrMsm('Completa este Campo')
            isValidate = false
        }  
        
        const patternEmail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i          
        if (!email){
            setEmailErrMsm('Completa este Campo')
            isValidate = false
        }else if(!email.match(patternEmail)){
            setEmailErrMsm('Coloque una direccion de Email Valida.') 
            isValidate = false
        } 
        
        
        if (password && passwordRepet && password !== passwordRepet ){
            setPasswordErrMsm('Las contraseñas no coinciden')
            setPasswordRepetErrMsm('Las contraseñas no coinciden')
            isValidate = false 
        }
        
        const patternPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;  
        if (!password){
            setPasswordErrMsm('Completa este Campo')
            isValidate = false
        }else if(!password.match(patternPassword)){
            setPasswordErrMsm('No cumple los rquisitos.') 
            isValidate = false
        } 
        
        if (!passwordRepet){
            setPasswordRepetErrMsm('Completa este Campo')
            isValidate = false
        }else if(!passwordRepet.match(patternPassword)){
            setPasswordRepetErrMsm('No cumple los rquisitos.') 
            isValidate = false
        } 

        return isValidate

    }

    return <SessionContainer> 
        <LoadingArea show={isLoading} fullDysplay={true} message={'Procesando...'} background={'#0000000'} /> 
        <SessionForm >
            <br />
            <Title>Crear usuario </Title>
            <br />   
            
            <Input type="text" label="Nombre"                      
                value={firstName} 
                required={true}
                setValue={setFirstName} 
                validationMsm={nameErrMsm}                    
                />   
            <BoxTwoSpaceBetween> 
                <Input type="text" label="Apellido Materno"                      
                value={secondName}  
                setValue={setSecondName}               
                />     
                <InputSeparator/>
                <Input type="text" label="Apellido Paterno"                      
                value={lastName}  
                setValue={setLastName}                  
                />    
            </BoxTwoSpaceBetween> 
            <Input type="text" label="Email"                      
            value={email} 
            required={true}
            setValue={setEmail} 
            validationMsm={emailErrMsm}                    
            /> 

            <Paragraph padding={'0'} breakLine={true} fontSize={'14px'}
            text={'\nContraseña entre 8-15 caracteres con'+
            ' almenos una mayuscula, minucula, número, caracter especial '+
            '(@#$%&)' +
            '\n\n'}/>

            <BoxTwoSpaceBetween>
                <Input type="password" label="Contraseña"                      
                value={password} 
                required={true}
                setValue={setPassword} 
                validationMsm={passwordErrMsm}                    
                />   
                <InputSeparator/>
                <Input type="password" label="Repetir Contraseña"                      
                value={passwordRepet} 
                required={true}
                setValue={setPasswordRepet} 
                validationMsm={passwordRepetErrMsm}                    
                />     
            </BoxTwoSpaceBetween> 
             
            
            <InputBtn value={'Crear cuenta'} onClick={handleSubmit} 
            validationMsm={validationBtn}                    
            /> 

            <br /> <br /> 
            <div>¿Ya tienes una cuenta?  <TxtHiper onClick={()=>{
                setTypeSession('login')
            }}> Inicia Sesión</TxtHiper> </div>  
            <br /> <br /> 
        </SessionForm> 
    </SessionContainer> 
}
 

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
    max-height: 80%;
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

const InputSeparator = styled.div`
    width: 5px;
    height: 1px;
    display: inline-block;
    @media (max-width: 600px) {   
        display: none; 
    }
` 

const BoxTwoSpaceBetween = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;  
    @media (max-width: 600px) {   
        display: block;
        justify-content: center;
    }
`