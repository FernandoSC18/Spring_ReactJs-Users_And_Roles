import styled from 'styled-components';  

export default function inputTextArea({ label, maxLength, value, required, setValue, placeHolder, readOnly, validationMsm}) {
 
    return <InputLabel validationMsm={validationMsm}> 
        <LabelText required={required}> {label} </LabelText>
        <InputText value={value} 
                readOnly={readOnly}
                maxLength={maxLength}
                onChange={(e) => setValue(e.target.value)} 
                placeholder={placeHolder}  
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
    width: 100%;
    &&:after{
        ${({validationMsm}) => afterLabel(validationMsm)}
    }
`

const RequiredInput = `
    &&::after{
        position: absolute;
        font-size: 25px;
        content: "*";
        width: max-content;
        height: max-content;
        color: red;
    }  
` 

const LabelText = styled.p`   
    position: relative;
    padding: 5px ;  
    margin: 0;
    font-size: 18px;
    ${({required}) => required ? RequiredInput : ''} 
`

const InputText = styled.textarea`  
    width: 100%;  
    max-width: 100%; 
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: '500';
    line-height: 30px; 
    border: ${({readOnly}) => readOnly ? 'none' : '2px solid #0066ff'} ;  
    border-radius: 5px;
    padding: 5px ;  
    box-sizing: border-box;

    &&:focus{ 
        background-color: none;
    }
    &&::placeholder{
        color: #CFD7E0;
    }  
`  