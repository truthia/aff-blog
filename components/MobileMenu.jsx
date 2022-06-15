import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
    top:0;
    left:0;
    z-index:9999 ;
    position: fixed ;
    height:100vh ;
    width: 80vw ;
    background:#374151 ;
    padding:1.5rem;
    display:none ;
`
const MenuHeader=styled.h3`
    color:white ;
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem; /* 28px */
    padding-bottom:1rem ;
`
const MenuItem=styled.div`
    color:white ;
    font-size: 1rem; /* 16px */
    line-height: 1.5rem; /* 24px */
`

const MobileMenu = () => {
  return (
    <Container>
        <MenuHeader>
            DANH MỤC
        </MenuHeader>
        <MenuItem>
        1
        </MenuItem>
        <MenuItem>
        2
        </MenuItem>
        <MenuItem>
        3
        </MenuItem>
    </Container>
  )
}

export default MobileMenu