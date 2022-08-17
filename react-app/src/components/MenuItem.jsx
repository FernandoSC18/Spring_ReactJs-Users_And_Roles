import styled from "styled-components"
  
export default function MenuItem ({content, onClick, display}){

    return <MenuItemStyle onClick={onClick ? (e)=> {
        onClick(e)  
    }: null} display={display}>
        {content}
    </MenuItemStyle>

} 
 
const MenuItemStyle = styled.div` 
    display: ${({display}) => display ? display : 'inline-flex' }; 
    color: #fff;
    text-decoration: none;
    text-align: center;  
    justify-content: center; 
    padding: 15px ;
    margin: 2px 0;
    cursor: pointer;
    &&:hover{
        background: #00000010;
    } 
`  