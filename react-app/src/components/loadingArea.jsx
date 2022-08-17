import { useEffect } from "react"
import styled, {keyframes} from 'styled-components';  

export default function LoadingArea ({fullDysplay, show, color, message, background}) {  
 
 
  
    useEffect (() =>{  
    },[] )


    return  <LoadingAreaS fullDysplay={fullDysplay} show={show} background={background}>      
        {
                <LoaderS>
                    <LoaderInnerS color={color} /> 
                </LoaderS>
             }
             {
                 message && message !== '' 
                 ?  <LoadingMessageS>
                        <MessageS>
                            {message}
                        </MessageS>
                    </LoadingMessageS>
                 : null
             } 
            </LoadingAreaS>

} 


const pageLoaderKF = keyframes`    
    0% { transform: rotate(0deg);} 
    100% { transform: rotate(360deg);}
`;

const loadingFullDysplay = ` 
    margin: auto;   
    &&::before{
        text-align: center;
        vertical-align: middle;
        display: flex;
        flex-direction: column;
        justify-content: center;
        content: "";
        position: absolute;  
        width: 200vw;  
        height: 200vh;    
        left: -100%; 
        top: -100%;  
        background : #00000040;
    }
`

const loadingNoFullDysplay = ` 
`

const LoadingAreaS = styled.div`  
    display: ${props => props.show ? 'block' : 'none'  }; 
    background: ${props => props.background != null ? props.background : '#0000003e'  }; 
      
    position: absolute; 
    z-index: 9999;
    width: 100%;  
    height: 100%;     
    left: 0;
    right: 0;
    bottom: 0;
    top: 0; 

    ${({fullDysplay}) => fullDysplay ? loadingFullDysplay : loadingNoFullDysplay}  
`

const LoadingMessageS = styled.div` 
    position: absolute;   
    top: 25%;
    left: 0;
    right: 0;
    width: max-content; 
    max-width: 80%;   
    justify-content: center;
    margin:auto;
    height: auto;   
    padding: 0;  
    font-size: 18px; 
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);    

`

const MessageS = styled.div` 
    position: relative;    
    text-align: center; 
    background-color: #dddddd;
    width: 100%;
    max-width: 100%;   
    height: auto;      
    padding: 10px;
    border-radius: 5px;
`

const LoaderS = styled.div`  
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;  
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto; 
`

const LoaderInnerS = styled.div`    
    vertical-align: top;
    display: inline-block;
    width: 100%;
    height: 100%; 
    border-left: 10px solid ${props => props.color != null ? props.color : '#3493ff'}32; 
    border-right: 10px solid ${props => props.color != null ? props.color : '#3493ff'}32; 
    border-top: 10px solid ${props => props.color != null ? props.color : '#3493ff'}; 
    border-bottom: 10px solid ${props => props.color != null ? props.color : '#3493ff'};  
    border-radius: 50%;
    animation: ${pageLoaderKF} 1000ms normal linear infinite;  
    animation-delay: '0.0s'; 
`