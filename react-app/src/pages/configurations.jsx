import HtmlArea from '../components/HtmlArea'; 
import React, {useEffect, useState, useRef} from 'react'; 
import Paragraph from '../components/Paragraph'; 
import Title from '../components/title'; 
import Input from '../components/input';
import InputBtn from '../components/inputBtn';
import fetchClient from '../services/fetch-client';

let isGettingConfigs = false

export default function Configurations( ) {
  
    const [isLoading, setIsLoading] = useState(false)
    const [pageComplete, setPageComplete] = useState(false); 
    const autorities = useRef([]);
 
    const [timeSession, setTimeSession] = useState( );  

    useEffect(()=> {

        autorities.current = localStorage.authorities ? JSON.parse(localStorage.authorities) : []
 
        if (!isGettingConfigs){ 
            getAllConfigs();
        }
    }, []) 
    
    useEffect(()=> { 
        if (timeSession ){  
            setPageComplete(true)
        }  
    }, [timeSession, pageComplete])  
    
    const getAllConfigs = async () => {
        isGettingConfigs = true
 
        const headers = fetchClient.headers() 

        let timeSessionDef = 30;
         
        //Get all users to show in table
        const response = await fetchClient.get( 'api/config', headers )
        .then( async (r) => r, (error) => error)     

        if (response.code === 200){ 
            const rolesList = JSON.parse(response.body)
            timeSessionDef = Number(rolesList[0].value) 
        }else if (response.code === 401){  
            console.log('401: ' )  
        }else if (response.code !== 200){  
            console.log("response: ", response) 
            console.log("Error desconocido, contacte con el administrador. " )  
        } 

        setTimeSession(timeSessionDef) 
        
        isGettingConfigs = false
 
    }  


    const Page = ({timeSession}) => {  
 
        const [inputSession, setInputSession] = useState( timeSession ); 
        const [timeSessionErr, setTimeSessionErr] = useState('');   

        const handleSubmit = async () => {
 
            setIsLoading(true)     
            if (chechValidations()){  
                const headers = fetchClient.headers() 
    
                const bodyRequest = {
                    id: 1, 
                    value: inputSession
                } 
                
                const response = await fetchClient.put( 'api/config', bodyRequest, headers )
                .then( async (r) => r, (error) => error) 
                
                console.log('Response', response)
            }      
    
            setIsLoading(false)
    
        }
     
        const chechValidations = () => {
    
            let isValidate = true
            setTimeSessionErr('')  
            
            if (!timeSession){
                setTimeSessionErr('Completa este Campo')
                isValidate = false
            } 
              
            return isValidate
    
        }
   
        return <>  
                <Title text={'COMFIGURACIONES'} />
                {  autorities.current && (autorities.current.includes('ROLE_PUT') && autorities.current.includes('ROLE_DEV') )
                    ? <div> 
                        
                        <Paragraph padding={'0'} breakLine={true} fontSize={'18px'}
                        text={'\n Tiempo de sessión: Minimo 1 minuto, máximo 8 horas \n\n'+
                        ' Considera que para 1 hora debes colocar el número 60' +
                        '\n\n'}/>
                        
                        <Input type="text" label={'Tiempo'}                 
                            value={inputSession}   
                            maxLength={20}  
                            placeHolder={'30'}
                            onChange={(e)=>{ 
                                const value = e.target.value;
                                if (!isNaN(value) && !value.includes('.') && !value.includes('-') ){ 
                                    let valueNumber = value; 
                                    if ( Number(value) < 1 ){ 
                                        valueNumber = 1
                                    }else if (Number(value) > 480) {  
                                        valueNumber = 480 
                                    }  
                                    setInputSession(Number(valueNumber)) 
                                }  
                            }}
                            validationMsm={timeSessionErr}                    
                            />  
                            
                        <div style={{maxWidth: '200px'}}> 
                            <InputBtn value={isLoading ? 'Espere...' : 'Guardar'} onClick={isLoading ? ()=> console.log('Espere') : handleSubmit} 
                            validationMsm={''}     
                            />  
                        </div>
                    </div>
                    : null
                } 
        </> 
    }

    return <>  
        <HtmlArea pageComplete={pageComplete} pageMain={timeSession ? <Page timeSession={timeSession}/> : <div>Cargando...</div>} />  
    </>

}
 