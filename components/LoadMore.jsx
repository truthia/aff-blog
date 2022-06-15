import React from 'react'
import styled from 'styled-components'

const Container= styled.div`
    width:100% ;
    grid-column: 1/-1 ;
    display:flex ;
    flex-direction:column ;
    align-items:center ;
`
const Continue =styled.span`
  display:inline-block ;
  text-align:center;
  transition:all 0.5s ;
  background-color:#db2777 ;
  font-size: 24px;
  color:white;
  padding: 0.75rem 2rem;
  border-bottom-left-radius: 9999px;
  border-bottom-right-radius: 9999px;
  cursor: pointer;
  &:hover{
    transform: translateY(0.25rem);
  }
`

const LoadMore = () => {
  return (
    <Container>
        <Continue>

        </Continue>
    </Container>
  )
}

export default LoadMore