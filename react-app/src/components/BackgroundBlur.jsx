import styled from 'styled-components';  

export default function BackgroundBlur () {

    return <Background/> 
}

const Background  = styled.div`   
    width: 110%;
    height: 110vh; 
    margin: -5vh -5%;
    left: 0;
    top: 0;
    position: fixed;  
    z-index: -1;  
    background: url("images/blue.jpg"); 
    background-repeat: no-repeat;  
    background-size: auto; 
    background-position: top;   
    filter: blur(10px);
`