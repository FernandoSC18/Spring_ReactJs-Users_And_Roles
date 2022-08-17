import styled from 'styled-components';  

export default function Paragraph ({text, color, align, background, radius, padding, fontSize, breakLine}) {
  
    return <Text color={color} 
    align={align} 
    background={background} 
    radius={radius}
    padding={padding}
    fontSize={fontSize}
    breakLine={breakLine}
    >
        {text}
    </Text>;

} 

const Text = styled.p`
    color: ${({color}) => color ? color : null};
    text-align: ${({align}) => align ? align : null};
    background: ${({background}) => background ? background : null};
    border-radius: ${({radius}) => radius ? radius : null};
    padding: ${({padding}) => padding ? padding : "15px"};
    overflow: hidden;
    font-size: ${({fontSize}) => fontSize ? fontSize : ''};

    //breakLine 
    white-space: ${({breakLine}) => breakLine ? 'pre-wrap' : 'normal'} ; 
`