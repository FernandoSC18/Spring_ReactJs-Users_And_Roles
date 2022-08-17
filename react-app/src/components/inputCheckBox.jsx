import styled from 'styled-components';  

export default function inputCheckBox({ label, type, id, checked, name, values, setValue}) {
 
    return <InputLabel > 
        <LabelText > {label} </LabelText>
        <InputText type={type}    
                    id={id}
                    name={name}
                    value={id} 
                    checked={checked}
                    onChange={(e) => {           

                    let currentMenus = values ? values.slice() : []
                    if (e.target.checked){
                        currentMenus.push (e.target.value)
                    }else{ 
                        currentMenus = currentMenus.filter((item) => item != e.target.value) 
                    }
                    setValue(currentMenus)
                }}  
                />
 
    </InputLabel> 
}
 
 
  
const InputLabel = styled.label`  
    text-align: left; 
    font-size: 15px; 

    display: inline-block;
    transition: all 500ms linear; 
    position: relative; 
    width: max-content;
    padding: 0 15px 0 0; 
`
 

const LabelText = styled.p`   
    position: relative;
    display: inline-block;
    padding: 5px ;  
    margin: 0; 
    font-size: 18px; 
`

const InputText = styled.input`  
    display: inline-block;   
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: '500';
    line-height: 30px;  
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