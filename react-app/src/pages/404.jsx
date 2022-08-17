import HtmlArea from '../components/HtmlArea'; 
import { useNavigate} from 'react-router-dom'; 
import { useState } from 'react';

export default function Page404 ({theme}){

    const navigate = useNavigate()
    const [pageComplete, setPageComplete] = useState(true); 

    const AreaPage = () => {

        return <>
            Esto es el error 404
            
            <button onClick={()=> {                
                navigate("/")
            }}>
                Volver a inicio
            </button>
        </>
    }
    
    return <HtmlArea theme={theme} pageComplete={pageComplete} pageMain={ AreaPage } /> 
}