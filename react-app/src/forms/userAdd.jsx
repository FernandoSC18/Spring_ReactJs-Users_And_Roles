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

export default function UserAdd ({params, closeModal}) {
 
    const iconAdd = <FontAwesomeIcon icon={faAdd} /> 
    const iconTrash = <FontAwesomeIcon icon={faTrash} /> 

    //Const to control submit
    const [isLoading, setIsLoading] = useState(false)
 
    //Const to control inputs values
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [ roles, setRoles ] = useState([])
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
                firstName: firstName,
                secondName: secondName,
                lastName: lastName,
                email: email,
                roles: rolesIds.length > 0 ? rolesIds.sort().join() : '',
                password: password 
            }
            
            const headers = fetchClient.headers()  
            
            const response = await fetchClient.post( 'api/user', bodyRequest, headers )
            .then( async (r) => r, (error) => error)

            
            if (response.code === 200){ 
                closeModal() 
                window.location.reload();  
            } else if (response.code !== 200){   
                console.log('response',  response)  
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
            setPasswordErrMsm('Las contrase??as no coinciden')
            setPasswordRepetErrMsm('Las contrase??as no coinciden')
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
                        params ? params.map((rol, i)=>{
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
                                const selectRol = params[selectValue.split('-')[0]]  

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
                    return <BoxTwoSpaceBetween key={rol.id }> 
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
            text={'\nContrase??a entre 8-15 caracteres con'+
            ' almenos una mayuscula, minucula, n??mero, caracter especial '+
            '(@#$%&)' +
            '\n\n'}/>

            <BoxTwoSpaceBetween>
                <Input type="password" label="Contrase??a"                      
                value={password} 
                autoComplete={false}
                required={true}
                setValue={setPassword} 
                validationMsm={passwordErrMsm}                    
                />   
                <InputSeparator/>
                <Input type="password" label="Repetir Contrase??a"                      
                value={passwordRepet} 
                autoComplete={false}
                required={true}
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