/* eslint-disable react/jsx-pascal-case */  
import Home from './pages/Home.jsx';    
import Page404 from './pages/404.jsx'; 
import PageError from './pages/error';
import Login from './pages/login';  
import Users from './pages/users';  
import Roles from './pages/roles';  
import Configurations from './pages/configurations';  
import { createGlobalStyle } from 'styled-components'
 
import { 
  BrowserRouter,
  Routes,
  Route,
 } from "react-router-dom"; 
  

const GlobalStyle = createGlobalStyle`

  *{ 
        margin: 0;
        padding: 0;    
        font-size: 20px; 
        font-family: 'Helvetica', 'Helvetica Neue', 'Arial', sans-serif;
        user-select: none;
        -moz-user-select: none;
        -khtml-user-select: none; 
        -webkit-user-select: none;
        -o-user-select: none;    
  } 
  
    /*Permite que el footer este siempre al ultimo de todo sin ser position FIXED*/ 
    html {
        min-height: 100%;  
        width: 100%;
        height: 100%;
        position: relative;  
    }  
    
    body {
        display: block;
        position: relative;   
    }

    
    *::-webkit-scrollbar {   
        width: 5px;     /* Tamaño del scroll en vertical */
        height: 10px;    /* Tamaño del scroll en horizontal */ 
        display: block; 
    }
    *::-webkit-scrollbar-thumb { 
        background: #0073f7;
        border-radius: 4px;
    }
    *::-webkit-scrollbar-track {  
        background: #FFF;  
        border-radius: 5px; 
    }
    *::-webkit-scrollbar-track:hover { 
        background: #0073f790;
    }
    *::-webkit-scrollbar-track:active { 
        background: #000000;  
    }

    table { 
        border-collapse: collapse; 
    }

    tr {
        border-bottom: 2pt solid #00000079;
        padding: 100px 100px;
    } 
    
    th {
        color: #ffffff;
    }

    td, th{
        text-align: center;
        padding-top:20px;
        padding-bottom:20px; 

    }
 
    tr {
        //background: #88c5ffab;
    }
    tr:nth-child(2n) {
        //background: #ff89ff5f;
    }

` 
  
 
function App({  pageProps}) {
  
  const GetHomeComponet = () => <Home {...pageProps} />  
  const GetLogin = () => <Login {...pageProps} />    
  const Get404 = () => <Page404 {...pageProps} />   
  const GetError = () => <PageError {...pageProps} />  

  //Menu pages
  const GetUsers = () => <Users {...pageProps} />    
  const GetRoles = () => <Roles {...pageProps} />    
  const GetConfigs = () => <Configurations {...pageProps} />    


return <>
        <GlobalStyle /> 
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<GetHomeComponet />} />  
                <Route path="/inicio" element={<GetHomeComponet />} />   
                <Route path="/login" element={<GetLogin />} /> 
                <Route path="/usuarios" element={<GetUsers />} /> 
                <Route path="/roles" element={<GetRoles />} /> 
                <Route path="/configuraciones" element={<GetConfigs />} /> 

                <Route path="/error" element={<GetError />} />  
                <Route path="*" element={<Get404 />} />
            </Routes> 
        </BrowserRouter> 
  </> 
 
}

export default App;
  