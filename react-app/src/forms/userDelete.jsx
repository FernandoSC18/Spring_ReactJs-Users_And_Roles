import { useState } from 'react';
import styled, {keyframes} from 'styled-components';  
import LoadingArea from '../components/loadingArea';
import Input from '../components/input';
import InputBtn from '../components/inputBtn';
import fetchClient from '../services/fetch-client';

export default function UserDelete ({params, closeModal}) {

    const [isLoading, setIsLoading] = useState(false)
 

    const handleSubmit = async () => {  
        setIsLoading(true) 

        const body = {
            id : params.id
        }

        const headers = fetchClient.headers() 

        const response = await fetchClient.delete( 'api/user', body, headers )
        .then( async (r) => r, (error) => error)  
        console.log('response : ', response ) 
        closeModal() 
        window.location.reload();

        setIsLoading(false) 
    } 
    
    //Verify strings not null
    const getString = (text) => {
        return text ? text + " " : ''
    }

    return <div>
        <LoadingArea show={isLoading} fullDysplay={true} message={'Procesando...'} background={'#0000000'} /> 
        <form >
            <br />
            <Title>Estas a punto de eliminar un usuario, ¿Deseas continuar? </Title>
            <br />   
            <Input type="text" label="Id"                      
            value={getString(params.id) }
            readOnly={true}
            setValue={''} 
            validationMsm={''}                    
            />  
            <Input type="text" label="Nombre"                      
            value={getString(params.firstName) + getString(params.lastName) + getString(params.secondName)}
            readOnly={true}
            setValue={''} 
            validationMsm={''}                    
            />     
            
            <InputBtn value={'Continuar'} onClick={handleSubmit} 
            validationMsm={''}                    
            />  

        </form> 
    </div>  

}
 

const Title = styled.div` 
    font-size: 20px;
    font-weight: 700; 
`