import styled from 'styled-components';  

export default function input({ value, onClick, validationMsm}) {
 
    return <InputLabel validationMsm={validationMsm}>  
        <InputSubmit type={'submit'} 
                value={value} 
                onClick={(e) => {
                    e.preventDefault()
                    onClick()
                }}   
                />
    </InputLabel> 
}


const afterLabel = (text) => {  
    const content = text ? text : ''
  
    return ` 
        position: relative;
        display: inline-block; 
        content: '` + content + `';  
        color: #f33c3c;  
        width: 100%; 
        min-height: 1px; 
    `
  } 
  
const InputLabel = styled.label`  
    text-align: left;
    font-size: 15px; 
    display: block; 
    transition: all 500ms linear; 
    position: relative; 
    &&::before{
        ${({validationMsm}) => afterLabel(validationMsm)}
    }
`
 
const InputSubmit = styled.input`  
    width: 100%; 
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: '500';
    line-height: 30px;  
    border-radius: 5px;
    padding: 5px ;  
    box-sizing: border-box;  
    font-weight: 800;
    cursor: pointer;
    background: #0066ff;
    color: #FFF;
    &:hover{  
        background: #FFF;
        color: #0066ff;
    } 
`  