
import styled from 'styled-components';

//Boton Con Texto e Icono de FontAwesomeIcon
export default function BtnWithIcon ({title, content, icon, onClick, color, background}) {
 
    //type="button"
    /*
    The default value for the type attribute of button elements is "submit". Set it to type="button" to produce a button that doesn't submit the form.
    */
    return <Button type="button" title={title} onClick={onClick}      
            color={color}
            background={background}
            >  
                {icon}
                {content != null ? 
                <Text color={color} 
                background={background}> 
                    {content}
                </Text> : null}                    
            </Button>

}

const Text = styled.div`   
    padding: 0 0 0 10px; 
    color: ${({ color }) => color ? color : '#000000'};   
    display: inline-block; 
    vertical-align: middle;
    text-decoration: none;
` 

const Button = styled.button`  
    color: ${({ color }) => color ? color : '#000000'};     
    background: ${({ background }) => background ? background : '#FFFFFF'};   
    display: inline-flex; 
    align-items: center;
    vertical-align: middle;
    box-sizing: border-box;
    justify-content: center;    
    padding: 5px 10px;
    font-weight: bold;
    text-decoration: none;
    width: 100%; 
    margin: 5px 0;
    border: none;
    cursor: pointer;
    border-radius: 5px; 
    &&:hover{  
        color: ${({ background }) => background ? background : '#FFFFFF'};     
        background: ${({ color }) => color ? color : '#000000'};    
        ${Text}{ 
            color: ${({background}) => background ? background : '#FFFFFF'}; 
        }
    }
    text-decoration: none;
`  
  