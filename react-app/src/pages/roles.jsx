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
import RolAdd from '../forms/rolAdd';
import RolEdit from '../forms/rolEdit';
import RolDelete from '../forms/rolDelete';

let isGettingRoles = false 
let isGettingMenus = false

export default function Roles(props) {
 
    const iconEdit = <FontAwesomeIcon icon={faEdit} /> 
    const iconAdd = <FontAwesomeIcon icon={faAdd} /> 
    const iconDel = <FontAwesomeIcon icon={faTrash} /> 

    const autorities = useRef([]);
    const [roles, setRoles] = useState();
    const [menusAvailables, setMenusAvailables] = useState()  
    const [pageComplete, setPageComplete] = useState(false); 
 
    useEffect(()=> { 
        
        initRolesPage();

    }, [])
    
    useEffect(()=> { 
        if (menusAvailables && roles){  
            setPageComplete(true)
        }
    }, [menusAvailables, roles, pageComplete])
    
    function initRolesPage () {
        autorities.current = localStorage.authorities ? JSON.parse(localStorage.authorities) : []

        if (!isGettingMenus && !menusAvailables ){
            getMenuList()
        } 
        
        if (!isGettingRoles 
        && !roles && (autorities.current && autorities.current.includes('ROLE_GET')  ) ) { 
            
            if ( autorities.current.includes('ROLE_ADMIN') ){ 
                getAllRoles();  
            }else{
                setRoles([])
            } 
        } 
        
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
        }else{ 
            setRoles([]) 
        }
 
        isGettingRoles = false
    } 
    
    const getMenuList = async () => {   
        isGettingMenus = true
        
        const headers = fetchClient.headers() 
        
        const response = await fetchClient.get( 'api/routes', headers )
        .then( async (r) => r, (error) => error)   
  
        setMenusAvailables(response ? JSON.parse(response.body) : []) 
         
        isGettingMenus = false
    }

    //Verify strings not null
    const getString = (text) => {
        return text ? text + " " : ''
    }


    const Page = () => { 
        
        const deleteModal = useModal('Eliminar'); 
        const editModal = useModal('Editar'); 
        const addModal = useModal('Agregar'); 
    
        const handleDeleteModal = (rol) => {
            console.log("handleDeleteModal", "rol")
            deleteModal.changeParameters(rol)
            deleteModal.changeShow()
        }
    
        const handleEditModal = (rol) => {
            editModal.changeParameters({rol, menusAvailables})
            editModal.changeShow()
        }
    
        const handleAddModal = () => {
            addModal.changeParameters(menusAvailables)
            addModal.changeShow()
        }
            
        const rolesList = (!roles || !menusAvailables) ? null : roles.map ((r, index) => {   
            const pathsRoles = r.menusAllows ? r.menusAllows.split(",") : []  

            return <tr key={r.id}>
                <td style={{whiteSpace: 'nowrap'}}>{r.id}</td> 
                <td>{ getString(r.name) } </td>
                <td>{getString(r.type)}</td>
                <td>
                    {pathsRoles.length > 0 ? pathsRoles.map((path, i)=>{
    
                        let currentPath = null
                        menusAvailables?.forEach(element => {
                            if (element.id == path){
                                currentPath = element
                                return 
                            }
                        });    

                        return currentPath ? <div key={currentPath.id}> {currentPath.id + " - " + currentPath.name} </div> : null
                    })
                    : (r.type && r.type === 'SYSTEM_DB' ? 'ROL DE DB' : 'Sin rutas disponibles')}</td> 
                <td>
                    <div style={{padding:'10px'}}> 
                        { (!(r.type && r.type.startsWith('SYSTEM')) || autorities.current.includes('ROLE_DEV') ) &&
                        autorities.current && (autorities.current.includes('ROLE_PUT') && autorities.current.includes('ROLE_ADMIN') ) ?   
                            <BtnWithIcon title={'Modifica un usuario'} content={'Editar'}  
                            onClick={()=> {handleEditModal(r)}} 
                            icon={iconEdit} color={'#FFF'} background={'#00c552'}/>
                            : null
                        }   
    
                        { (!(r.type && r.type.startsWith('SYSTEM')) || autorities.current.includes('ROLE_DEV') ) &&
                        autorities.current && (autorities.current.includes('ROLE_DELETE') && autorities.current.includes('ROLE_ADMIN') ) ?   
                            <BtnWithIcon title={'Elimina un usuario'} content={'Eliminar'} 
                            onClick={()=> {handleDeleteModal(r)}}
                            icon={iconDel} color={'#FFF'} background={'#ff0000'}/>
                            : null
                        }
                    </div>
                </td> 
            </tr> 
        })
   
        return <>  
                <Title text={'ROLES'} />
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
                                <th width="20%">Nombre</th>
                                <th width="20%">Tipo</th> 
                                <th width="40%">Rutas</th> 
                                <th width="10%">Acciones</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {rolesList} 
                        </tbody>
                    </table>
                </TableContainer> 

                <ModalHook modalHook={deleteModal} Content={RolDelete}/>
                <ModalHook modalHook={editModal} Content={RolEdit}/>
                <ModalHook modalHook={addModal} Content={RolAdd}/>
                     
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