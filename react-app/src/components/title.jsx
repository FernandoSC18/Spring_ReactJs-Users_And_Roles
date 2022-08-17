import styled from "styled-components"

export default function Title ({text}){

    return <TitleH1>
        {text}
    </TitleH1>

}

const TitleH1 = styled.h1`
    color: #ffffff;
    margin: 30px 0 15px 0; 
`