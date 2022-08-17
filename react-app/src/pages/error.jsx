import styled, {keyframes} from 'styled-components';  
import HtmlArea from '../components/HtmlArea'; 
import React, {useState} from 'react';
import Paragraph from '../components/Paragraph';

export default function Configurations(props) {

    console.log('props', props)
    const [pageComplete, setPageComplete] = useState(true); 

    const Page = () => { 
   
        return <div>
            Pagina de Error
        </div>
    }

    return <>  
        <HtmlArea pageComplete={pageComplete} pageMain={<Page/>} />  
    </>

}
