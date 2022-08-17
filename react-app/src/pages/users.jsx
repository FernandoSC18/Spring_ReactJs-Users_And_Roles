import styled, {keyframes} from 'styled-components';  
import HtmlArea from '../components/HtmlArea'; 
import React, {useEffect, useState, useRef} from 'react';
import BtnWithIcon from '../components/btnWithIcon'
import Paragraph from '../components/Paragraph';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import fetchClient from '../services/fetch-client';
import Title from '../components/title';
import ModalHook, {useModal} from '../hooks/modalHook';
import UserDelete from '../forms/userDelete';
import UserAdd from '../forms/userAdd';
import UserEdit from '../forms/userEdit';

let isGettingRoles = false 
let isGettingUsers = false

export default function Users(props) {
 
    const [users, setUsers] = useState( ); 
    const [roles, setRoles] = useState( ); 
    const [pageComplete, setPageComplete] = useState(false); 

    const iconEdit = <FontAwesomeIcon icon={faEdit} /> 
    const iconAdd = <FontAwesomeIcon icon={faAdd} /> 
    const iconDel = <FontAwesomeIcon icon={faTrash} /> 
    const autorities = useRef([]);
 
    useEffect(()=> {

        initUsersPage();

    }, [])
    
    useEffect(()=> { 
        if (users && roles){  
            setPageComplete(true)
        }
    }, [users, roles, pageComplete])
     

    function initUsersPage () {
        autorities.current = localStorage.authorities ? JSON.parse(localStorage.authorities) : []

        if ( !isGettingRoles
        && !roles && (autorities.current && autorities.current.includes('ROLE_GET') )){ 
            if ( autorities.current.includes('ROLE_ADMIN') ){ 
                getAllRoles();  
            }else{
                setRoles([])
            }
        }   

        if (!isGettingUsers 
        && !users && (autorities.current && autorities.current.includes('ROLE_GET')) ){ 
            getAllUsers(); 
        }   

    }

    const getAllUsers = async () => {
   
        isGettingUsers = true
        const headers = fetchClient.headers()  
         
        //Get all users to show in table
        const response = await fetchClient.get( 'api/users', headers )
        .then( (r) => r, (error) => error)     

        if (response.code === 200){ 
            const userList = JSON.parse(response.body)
            setUsers(userList) 
        }else if (response.code === 401){  
            console.log('401: ' )  
            setUsers([]) 
        }else if (response.code !== 200){  
            console.log("response: ", response) 
            console.log("Error desconocido, contacte con el administrador. " )  
            setUsers([]) 
        } else{
            setUsers([])  
        }
 
        isGettingUsers = false
    } 

    
    const getAllRoles = async () => { 
        isGettingRoles = true
 
        const headers = fetchClient.headers()   
         
        //Get all users to show in table
        const response = await fetchClient.get( 'api/roles', headers )
        .then( async (r) => r, (error) => error)      

        if (response.code === 200){ 
            const rolesList = JSON.parse(response.body) 
            setRoles(rolesList)
            
        }else if (response.code === 401){  
            console.log('401: ' )  
            setRoles([]) 
        }else if (response.code !== 200){  
            console.log("response: ", response) 
            console.log("Error desconocido, contacte con el administrador. " )  
            setRoles([]) 
        } else{
            setRoles([])  
        }
        
        isGettingRoles = false
 
    } 

    //Verify strings not null
    const getString = (text) => {
        return text ? text + " " : ''
    } 


    const Page = () => { 

        const deleteModal = useModal('Eliminar'); 
        const editModal = useModal('Editar'); 
        const addModal = useModal('Agregar'); 
    
        const handleDeleteModal = (user) => {
            deleteModal.changeParameters(user)
            deleteModal.changeShow()
        }
    
        const handleEditModal = (user) => {
            editModal.changeParameters({user, roles})
            editModal.changeShow()
        }
    
        const handleAddModal = () => {
            addModal.changeParameters(roles)
            addModal.changeShow()
        }
        
        const usersList = !users ? null : users.map ((u, index) => {  

            const rolesUser = u.roles ? u.roles.split(",") : []  
     
            return <tr key={u.id}>
                <td style={{whiteSpace: 'nowrap'}}>{u.id}</td> 
                <td>{ getString(u.firstName) + getString(u.lastName) + getString(u.secondName)} </td>
                <td>{getString(u.email)}</td>
                <td>
                    {rolesUser.length > 0 
                    ? rolesUser.map((rol, i)=> { 
     
                        let currenRol = null
                        roles?.forEach(element => {
                            if (element.id == rol){
                                currenRol = element
                                return 
                            }
                        });  
    
                        return <div style={{fontSize: '15px'}} key={i}> 
                            {currenRol ? currenRol.id + ' - ' + currenRol.name : ''} 
                        </div>
                    }) : null}
                </td>
                <td>
                    <div style={{padding:'10px'}}> 
                        { autorities.current && (autorities.current.includes('ROLE_PUT') && autorities.current.includes('ROLE_ADMIN') ) ?   
                            <BtnWithIcon title={'Modifica un usuario'} content={'Editar'}  
                            onClick={()=> {handleEditModal(u)}}
                            icon={iconEdit} color={'#FFF'} background={'#00c552'}/>
                            : null
                        }   
                        { autorities.current && (autorities.current.includes('ROLE_DELETE') && autorities.current.includes('ROLE_ADMIN') ) ?   
                            <BtnWithIcon title={'Elimina un usuario'} content={'Eliminar'} 
                            onClick={()=> {handleDeleteModal(u)}}
                            icon={iconDel} color={'#FFF'} background={'#ff0000'}/>
                            : null
                        }
                    </div>
                </td> 
            </tr> 
        })
   
        return <>  
                <Title text={'USUARIOS'} />
                {  autorities.current && (autorities.current.includes('ROLE_POST') && autorities.current.includes('ROLE_ADMIN') )
                    ? <BtnAdd> 
                        <BtnWithIcon title={'Agrega un nuevo usuario'} content={'Crear nuevo'} 
                        onClick={handleAddModal}
                        icon={iconAdd} color={'#FFF'} background={'#0066ff'}/>
                    </BtnAdd> 
                    : null
                }
                <TableContainer>
                    <table>
                        <thead>
                            <tr>
                                <th width="10%">ID</th>
                                <th width="20%">Nombre completo</th>
                                <th width="20%">Email</th> 
                                <th width="20%">Rol</th>
                                <th width="10%">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList} 
                        </tbody>
                    </table>
                </TableContainer>
 
                <ModalHook modalHook={deleteModal} Content={UserDelete}/>
                <ModalHook modalHook={editModal} Content={UserEdit}/>
                <ModalHook modalHook={addModal} Content={UserAdd}/>
        </> 
    }

    return <>  
        <HtmlArea pageComplete={pageComplete} pageMain={<Page/>} />  
    </> 

}

const TableContainer = styled.div` 
    overflow: auto;
`

const BtnAdd = styled.div` 
    position: absolute;
    margin: 15px 0 0 0;
    padding: 15px;
    right: 0; 
    top: 0;
    display: inline-block;  
    max-width: 200px;     
    @media (max-width: 300px) { 
        margin: 0;
        padding: 0;
        position: relative; 
        width: 100%;    
        max-width: 100%;     
    }
`