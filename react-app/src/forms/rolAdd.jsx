import { useEffect, useState } from 'react';
import styled, {keyframes} from 'styled-components';  
import LoadingArea from '../components/loadingArea';
import Input from '../components/input';
import InputCheckBox from '../components/inputCheckBox';
import InputBtn from '../components/inputBtn';
import Paragraph from '../components/Paragraph';
import fetchClient from '../services/fetch-client';  


export default function RolAdd ({params, closeModal}) {

    const menusAvailables = params
 
    //Const to control submit
    const [isLoading, setIsLoading] = useState(false)
 
    //Const to control inputs values
    const [name, setName] = useState('')
    const [description, setDescription] = useState('') 
    const [menus, setMenus] = useState('')  
 
    //Const to show message if condition  is not met
    const [nameErrMsm, setNameErrMsm] = useState('')   
  
    const handleSubmit = async () => { 
        console.log( 'handleSubmit' )   
        setIsLoading(true)     
        if (chechValidations()){  

            const headers = fetchClient.headers() 

            const bodyRequest = {
                name: name.toUpperCase(),
                description: description,
                type: 'APP',
                menusAllows: menus.length > 0 ? menus.sort().join() : ''
            } 
            
            const response = await fetchClient.post( 'api/roles', bodyRequest, headers )
            .then( async (r) => r, (error) => error)      
            
            console.log('response', response)  
            closeModal() 
            window.location.reload();
        }      

        setIsLoading(false)
    } 

    const chechValidations = () => {

        let isValidate = true
        
        setNameErrMsm('')  
        
        if (!name){
            setNameErrMsm('Completa este Campo')
            isValidate = false
        } 
        
        if ( !name.startsWith('ROLE_') || name.length < 6 ){
            setNameErrMsm('Rol Invalido' )
            isValidate = false
        } 
 
   
        return isValidate

    }
     

    return <div>
        <LoadingArea show={isLoading} fullDysplay={true} message={'Procesando...'} background={'#0000000'} /> 
        <FormArea > 
            <br />   

            <Paragraph padding={'0'} breakLine={true} fontSize={'14px'}
            text={'El nombre debe seguir el prefijo "ROLE_" es decir "ROLE_NOMBRE" '+ 
            '\n'}/>
            <Input type="text" label="Nombre"                      
                value={ name.toUpperCase()} 
                required={true}
                setValue={setName} 
                placeHolder={"ROLE_NAME"}
                validationMsm={nameErrMsm}                    
                />     

            <Input type="text" label="descripción"                      
                value={description}  
                setValue={setDescription} 
                validationMsm={''}                    
                />   

            <Paragraph padding={'0'} breakLine={true} fontSize={'14px'}
            text={'\n Menus a los que el rol dara acceso'+ 
            '\n'}/> 

            <Input type="text" label="Menus"                      
                value={menus}  
                setValue={setMenus} 
                readOnly={true}
                validationMsm={''}                    
                />      

            {
                menusAvailables.length >= 0 ? menusAvailables.map((value, index)=>{
  
                    return <InputCheckBox key={index} type={'checkbox'}  label={value.name}
                                id={value.id}
                                name={value.name} 
                                values={menus}  
                                setValue={setMenus}  
                                />  
                }) : 'El usuario solo puede asignar rutas a las que este tenga acceso'
            }
            <br />
            
            <InputBtn value={'Continuar'} onClick={handleSubmit} 
            validationMsm={''}                    
            />  

        </FormArea> 
    </div>  

} 

const FormArea = styled.form`
    max-width : 500px; 
`
 