import styled from 'styled-components';  
import HtmlArea from '../components/HtmlArea'; 
import React, {useState} from 'react';
import Paragraph from '../components/Paragraph';

export default function Home(props) {
    
  const pageComplete = useState(true); 

  const Page = () => { 

    return <HomeStyle>

        <br />
        <Paragraph text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corporis, maiores quibusdam culpa sequi, nesciunt asperiores dignissimos necessitatibus mollitia ipsa tempora facere aliquid voluptate explicabo quasi repudiandae exercitationem officia possimus?'}
            background={"#ffffff44"}
            radius={"5px"} 
        />
        <br />
        <Paragraph text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corporis, maiores quibusdam culpa sequi, nesciunt asperiores dignissimos necessitatibus mollitia ipsa tempora facere aliquid voluptate explicabo quasi repudiandae exercitationem officia possimus?'}
            background={"#ffffff44"}
            radius={"5px"} 
        />
        <br />
        <Paragraph text={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas corporis, maiores quibusdam culpa sequi, nesciunt asperiores dignissimos necessitatibus mollitia ipsa tempora facere aliquid voluptate explicabo quasi repudiandae exercitationem officia possimus?'}
            background={"#ffffff44"}
            radius={"5px"} 
        />

    </HomeStyle>
    
  }

  return <> 
  
      <HtmlArea pageComplete={pageComplete} pageMain={<Page/>} /> 
      
    </>
} 

const HomeStyle = styled.div` 
    position: relative;
    display: block;
    width: 100%; 
    height: 100%;  
`