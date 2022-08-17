import { useEffect, useState } from 'react';
import styled, {keyframes} from 'styled-components';  
import LoadingArea from '../components/loadingArea';
import Input from '../components/input';
import InputTextArea from '../components/inputTextArea'; 
import InputCheckBox from '../components/inputCheckBox';
import InputBtn from '../components/inputBtn';
import Paragraph from '../components/Paragraph';
import fetchClient from '../services/fetch-client';  


export default function RolEdit ({params, closeModal}) { 
    
    const {menusAvailables, rol: rolEdit } = params 
 
    //Const to control submit
    const [isLoading, setIsLoading] = useState(false)
 
    //Const to control inputs values
    const [name, setName] = useState(rolEdit.name ? rolEdit.name : '')
    const [description, setDescription] = useState(rolEdit.description ? rolEdit.description : '') 
    const [menus, setMenus] = useState( rolEdit.menusAllows ? rolEdit.menusAllows.split(',') : [])  
 
    //Const to show message if condition  is not met
    const [nameErrMsm, setNameErrMsm] = useState('')   
  
    const handleSubmit = async () => { 
        console.log( 'handleSubmit' )   
        setIsLoading(true)     
        if (chechValidations()){  

            const headers = fetchClient.headers() 

            const bodyRequest = {
                id: rolEdit.id,
                name: name.toUpperCase(),
                description: description, 
                menusAllows: menus.length > 0 ? menus.sort().join() : ''
            } 
            
            const response = await fetchClient.put( 'api/roles', bodyRequest, headers )
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

            <InputTextArea label="descripción"       
                maxLength={200}
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

                    const isChecked = menus.includes(value.id + '') 
  
                    return <InputCheckBox key={index} type={'checkbox'}  label={value.name}
                                id={value.id}
                                name={value.name} 
                                values={menus}  
                                checked={isChecked}
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