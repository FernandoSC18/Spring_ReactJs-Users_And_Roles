import { useState } from 'react';
import styled, {keyframes} from 'styled-components';  
import LoadingArea from '../components/loadingArea';
import Input from '../components/input';
import InputList from '../components/inputList';
import InputBtn from '../components/inputBtn';
import Paragraph from '../components/Paragraph';
import fetchClient from '../services/fetch-client';
import BtnWithIcon from '../components/btnWithIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function UserEdit ({params, closeModal}) { 
 
    const iconAdd = <FontAwesomeIcon icon={faAdd} /> 
    const iconTrash = <FontAwesomeIcon icon={faTrash} /> 

    //Const to control submit
    const [isLoading, setIsLoading] = useState(false)
 
 
    //Const to control inputs values
    const [firstName, setFirstName] = useState(params.user.firstName ? params.user.firstName : '')
    const [secondName, setSecondName] = useState(params.user.secondName ? params.user.secondName : '')
    const [lastName, setLastName] = useState(params.user.lastName ? params.user.lastName : '')
    const [email, setEmail] = useState(params.user.email ? params.user.email : '')
   
    const [ roles, setRoles ] = useState(params.roles ? params.roles.filter((rol, i)=>{ 
        if (params.user.roles.split(',').includes(rol.id + "") ) return rol
    }) : [])
    
    const [ password, setPassword ] = useState('')
    const [ passwordRepet, setPasswordRepet ] = useState('') 
 
    //Const to show message if condition  is not met
    const [nameErrMsm, setNameErrMsm] = useState('') 
    const [emailErrMsm, setEmailErrMsm] = useState('')
    const [rolErrMsm, setRolErrMsm] = useState('')
    const [passwordErrMsm, setPasswordErrMsm] = useState('')
    const [passwordRepetErrMsm, setPasswordRepetErrMsm] = useState('') 
    const [formErrMsm, setFormErrMsm] = useState('') 

    const handleSubmit = async () => {   
        
        setIsLoading(true)     
        if (chechValidations()){  


            const rolesIds = roles.length > 0 ? roles.map((r, i)=> r.id ) : []
            const bodyRequest = {
                id: params.user.id,
                firstName: firstName,
                secondName: secondName,
                lastName: lastName,
                email: email,
                roles: rolesIds.length > 0 ? rolesIds.sort().join() : '',
                password: password 
            }
            
            const headers = fetchClient.headers()  
            
            const response = await fetchClient.put( 'api/user', bodyRequest, headers )
            .then( async (r) => r, (error) => error)

            console.log('response',  response)  
            
            if (response.code === 200){ 
                closeModal() 
                window.location.reload();  
            } else if (response.code !== 200){    
                setFormErrMsm("Error desconocido, contacte con el administrador. " + response.body)
            }    
            
        }  
        setIsLoading(false)
    } 

    const chechValidations = () => {

        let isValidate = true
        
        setNameErrMsm('') 
        setRolErrMsm('') 
        setEmailErrMsm('') 
        setPasswordErrMsm('') 
        setPasswordRepetErrMsm('') 
        
        if (!firstName){
            setNameErrMsm('Completa este Campo')
            isValidate = false
        } 
 
        if (!roles || roles.length <= 0){
            setRolErrMsm('Agrege algun rol')
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
        if (password && !password == "" && !password.match(patternPassword)){
            setPasswordErrMsm('No cumple los rquisitos.') 
            isValidate = false
        } 
        
        if (passwordRepet && !passwordRepet == "" && !passwordRepet.match(patternPassword)){ 
            setPasswordRepetErrMsm('No cumple los rquisitos.') 
            isValidate = false
        } 

        return isValidate

    }
    
    //Verify strings not null
    const getString = (text) => {
        return text ? text + " " : ''
    }

    return <div>
        <LoadingArea show={isLoading} fullDysplay={true} message={'Procesando...'} background={'#0000000'} /> 
        <FormArea > 
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
 
            <BoxTwoSpaceBetween>
                <span>  
                    <span>Roles</span><span style={{color:'red', fontSize:'20px'}}>*</span>
                </span>
            </BoxTwoSpaceBetween>
            <BoxTwoSpaceBetween>
                <div style={{width: '100%'}}> 
                    <InputList name="rol" id="rol" list="roles" validationMsm={rolErrMsm}/>   
                    <datalist id="roles"> 
                    { 
                        params.roles ? params.roles.map((rol, i)=>{
                            return <option key={rol.id } value={i + '-' + rol.name} id={rol.id} />
                        })
                        : ''
                    }  
                    </datalist> 
                </div> 
                <InputSeparator/>
                <div style={{width: '100%'}}>
                <BtnWithIcon title={'Agrega rol seleccionado'} content={'Agrega rol seleccionado'} 
                        onClick={()=>{ 
 
                            const selectValue = document.getElementById('rol').value  
                            if (selectValue && selectValue != null){  
                                const selectRol = params.roles[selectValue.split('-')[0]] 
 
                                if (!selectRol || roles.includes(selectRol)) return 

                                const rolAdd =  roles.slice()
                                rolAdd.push(selectRol)
                                setRoles(rolAdd)
                            } 

                        }}
                        icon={iconAdd} color={'#FFF'} background={'#0066ff'}/>
                </div>
            </BoxTwoSpaceBetween> 

            {
                roles.map((rol, i)=> { 


                    return <BoxTwoSpaceBetween key={rol.id}> 
                        <Input type="text"                     
                        value={rol.name}   
                        readOnly={true}          
                        />    
                        <InputSeparator/>  
                        <div style={{padding:'0 0 5px 0', width: '100%' }}>  
                            <BtnWithIcon title={'Quitar rol'} content={'Quitar rol'} 
                                onClick={()=>{  
                                    const rolAdd = roles.slice()
                                    rolAdd.splice(i, 1) 
                                    setRoles(rolAdd) 
                                }}
                                icon={iconTrash} color={'#FFF'} background={'#ffaaaa'}/>
                        </div>  
                    </BoxTwoSpaceBetween> 
                })
            } 
              
            <Input type="text" label="Email"                      
            value={email} 
            required={true}
            autoComplete={false}
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
                autoComplete={false} 
                setValue={setPassword} 
                validationMsm={passwordErrMsm}                    
                />   
                <InputSeparator/>
                <Input type="password" label="Repetir Contraseña"                      
                value={passwordRepet} 
                autoComplete={false} 
                setValue={setPasswordRepet} 
                validationMsm={passwordRepetErrMsm}                    
                />     
            </BoxTwoSpaceBetween> 
            
            <InputBtn value={'Continuar'} onClick={handleSubmit} 
            validationMsm={formErrMsm}                    
            />  

        </FormArea> 
    </div>  

} 

const FormArea = styled.form`
    max-width : 500px; 
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