import React from 'react';
import styled from 'styled-components';  
import { useEffect, useRef, useState } from 'react';   
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import fetchClient from '../services/fetch-client';
import MenuItem from './MenuItem';
import { Link } from "react-router-dom";
import BackgroundBlur from './BackgroundBlur';
import { useNavigate, useLocation} from 'react-router-dom'; 
import CookieManage from '../utilities/cookies_manage'

let isGettingRoutes = false

export default function HtmlArea (props) {   
    
    const location = useLocation(); 
    const navigate = useNavigate(); 
      
    const [currentPage, setCurrentPage ] = useState ( )    
    const [isLogin, setIsLogin] = useState(false) 
    const [menuList, setMenuList] = useState() 
    const refMenu = React.useRef();  

    //Cokie manage 
    useEffect(()=>{   
        
        if (CookieManage.readCookie('session_t')){
            //console.log("Login")
            setIsLogin(true)
        }else{ 
            //console.log("No login") 
            deadSession()
        }  

        const timeMiliseconds = 5000

        var timerID;
        timerID = setInterval( () => intervalFunction(), timeMiliseconds ) 
            
        function intervalFunction() {   
            console.log('intervalFunction', timeMiliseconds)
            
            if (!CookieManage.readCookie('session_t')){
                if (isLogin){
                    navigate("/login")
                }
                deadSession();    
            }  
        }  

        return () => { 
            clearInterval(timerID);
        };  
    },[isLogin]) 
 
    useEffect(()=>{   
        if (!props.pageComplete) return 

        setCurrentPage(props.pageMain)    
 
        //getMenuList get user menu 
        const getMenuList = async () => {  
            isGettingRoutes = true;

            const headers = fetchClient.headers() 

            const response = await fetchClient.get( 'api/routes', headers )
            .then( async (r) => r, (error) => error)   

            let menuNames = []
            let menuOptions = []
            if (response.code === 200){ 
                const listMenu = JSON.parse(response.body)
                for (let i=0; i < listMenu.length; i++){
                    menuOptions.push({
                        id: listMenu[i].id,
                        name: listMenu[i].name
                    });
                    menuNames.push(listMenu[i].name.toUpperCase())
                }
                setMenuList (menuOptions) 

            } else if (response.code !== 200){  
                console.log( response.body)  
            }              

            //Redirect to correct page when 404 or unauthorized page
            const pathName = location.pathname.slice(1).toUpperCase();
             
            if  ( menuOptions.length <= 0) { 
                setMenuList ( [{ id: 1, name: 'inicio' }])  
            }
            
            if ( !(pathName === '' || pathName === 'INICIO' || pathName === 'UNAUTHORIZED' || menuNames.includes(pathName)) ){   
                navigate("/login") 
            } 
 
 
            isGettingRoutes = false;
        }

        if (!menuList && !isGettingRoutes){  
            getMenuList(); 
        } 
    }, [props.pageComplete])

    const deadSession = () => {  
        setMenuList ([]) 
        localStorage.clear(); 
        CookieManage.deleteCookie('session_t')
        setIsLogin(false)   
    }
    
 
    //OPen and close Menu with animation 
    const hanldeMenu = () => {
        
        let display = getComputedStyle(refMenu.current).getPropertyValue("display")  
        if (display == 'block'){  
            refMenu.current.style.transform = 'translateY(-100vh) '
            setTimeout( () => { refMenu.current.style.display = 'none' }, 50 ) 
        }else{ 
            refMenu.current.style.display = 'block'  
            setTimeout( () => { refMenu.current.style.transform = 'translateY(0vh)' }, 50 ) 
        } 
    }


    const BarAndMenu = () => {
        
        const menuBars = <FontAwesomeIcon icon={faBars} /> 
        const profileUser = <FontAwesomeIcon icon={faUser} /> 

        return <div>   
            
            <MovilArea>

                <Link to="/">
                    <LogoStyle src='logo.png' />
                </Link>

                <MovilIcons>   
                    <MenuItem onClick={hanldeMenu} content={  
                        <Icon> 
                            {menuBars}
                        </Icon> } 
                    /> 
                      
                    <MenuItem onClick={()=>{ 
                        if (isLogin){  
                            navigate("/")  
                            deadSession();  
                        }else{
                            navigate("/login") 
                        }  
                    }} content={  
                        <Icon> 
                            {profileUser}
                        </Icon>  } 
                    />  

                </MovilIcons>

            </MovilArea>
            <MenuListMovile ref={refMenu}>

                {menuList ? menuList.map((value, index)=> { 
                        
                    return <Link key={value.id} 
                    style={{ textDecoration: 'none' }}
                    to={"/" + value.name.toLowerCase()}>
                        <MenuItem content={ value.name  } display={'block'}/> 
                    </Link> 
                }) : null} 
            </MenuListMovile>

            
            <DesktopArea>  
                <BoxTwoSpaceBetween> 
                    <Link to="/">
                        <LogoStyle src='logo.png' />
                    </Link>
                     
                    <MenuItem onClick={()=> {
                                if (isLogin){  
                                    navigate("/") 
                                    deadSession();  
                                }else{
                                    navigate("/login") 
                                }  
                            }} content={ 
                        <div> 
                            <Icon> 
                                {profileUser}
                            </Icon> 
                            <div >{isLogin ? `Cerrar sesión` : ` Ingresa `}</div> 
                        </div>} 
                    />  

                </BoxTwoSpaceBetween> 
                <MenuListDesk >

                    {menuList ? menuList.map((value, index)=> {

                        return <Link key={value.id} 
                        style={{ textDecoration: 'none' }}
                        to={"/" + value.name.toLowerCase()}>
                            <MenuItem content={ value.name  } /> 
                        </Link> 
                    }) : null} 
                    

                </MenuListDesk>
            </DesktopArea> 
 
        </div>

    }
    
    return <HTMLStyle>    
        <BackgroundBlur/>
        
        <BarAndMenu />

        <PageStyle> 
            {currentPage}   
        </PageStyle>
    </HTMLStyle>    
} 
  
const HTMLStyle = styled.div`
    position: relative;
    display: block;
    width: 100%; 
    height: 100%;   
` 

const PageStyle = styled.div` 
    position: relative;
    display: block; 
    width: 100%;  
    padding: 15px ;
    box-sizing: border-box;
    max-width: 1200px;
    height: 100%;  
    margin: 0 auto; 
    @media (max-width: 768px) { 
        margin: 70px auto;
    }
`
 

//Barra y Menu 
const LogoStyle = styled.img` 
    display: inline-block;
    width: 250px;
    max-width: 25%;  
    min-width: 150px;
`

const Icon = styled.div`  
    display: inline-flex;
    width: max-content;   
    max-width: 250px;  
    height: max-content;
    color: #ffffff;   
` 
 
const MenuListDesk = styled.div`   
    display: flex;  
    position: relative; 
    width: 100%;  
    box-sizing: border-box; 
    text-align: right;
    align-items:center;
    justify-content: right;
    height: max-content;
    @media (max-width: 768px) { 
        transition: none; 
        visibility: hidden;
    }
`

const DesktopArea = styled.div`    
    position: relative;
    display: block;
    justify-content: space-between; 
    align-items:center; 
    width: 100%;  
    margin: 40px 0;
    padding: 15px 15px 0 0;
    box-sizing: border-box;
    max-width: 1200px;
    margin: auto;

    @media (max-width: 768px) {   
        display: none;
    } 
`

const MovilIcons = styled.div` 
    display: flex;
    align-items: center;  
    justify-content: flex-end; 
    width: 100%; 
`   

const MenuListMovile = styled.div`  
    position: fixed;
    width: 100%; 
    min-height: 100px;
    padding: 15px 0 0 0;
    z-index: 1;
    display: none;   
    transition: all 1000ms; 
    &&::before{ 
        content: "";
        position: absolute; 
        z-index: -1;
        width: 200%;
        height: 100%;  
        top: 0;
        background: url("images/blue.jpg"); 
        background-repeat: no-repeat;  
        background-size: auto; 
        background-position: top;  
        filter: blur(10px);
    }
    @media (min-width: 768px) {
        transition: none; 
        visibility: hidden;
    }
`

 
const MovilArea = styled.div`    
    display: none;  
    @media (max-width: 768px) {  
        width: 100%; 
        top: 0;
        left: 0;
        padding: 0 25px;
        box-sizing: border-box;
        position: fixed;  
        z-index: 999;
        display: flex;  
        align-items: center;  
        justify-content: space-between;  
    }   
    &&:after {
        content: "";
        position: absolute;
        z-index: -1;
        top: -20%; 
        left: -50%;
        width: 200%; 
        height: 120%; 
        background: url("images/blue.jpg"); 
        background-repeat: no-repeat;  
        background-size: auto; 
        background-position: top;  
        filter: blur(10px);
    }
` 


const BoxTwoSpaceBetween = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; 
`