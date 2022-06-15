import React from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';
import OutsideClickHandler from 'react-outside-click-handler';

const Paper=styled.div`
    top:0;
    left:0;
    z-index:999 ;
    position: fixed ;
    height:100vh ;
    width: 100vw ;
    background:rgba(255,255,255,0.3);
    display:block;
    overflow:hidden ;
    transition:max-width 1s ;
    ${({open})=>{
        if (open) return (css`max-width:10000px;`)
        else return(css`max-width:0 ;`)
    }}
`
const Container=styled.div`
    top:0;
    left:0;
    z-index:9999 ;
    height:100vh ;
    width: 80vw ;
    background:#374151 ;
    padding:1.5rem;
    display:block ;
    display:flex;
    flex-direction: column ;
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
    padding-bottom:1rem ;
`
const X=styled(FontAwesomeIcon)`
    position:absolute ;
    top:0.5rem;right:25%;
    color:#1e293b;
    height:1.5rem;
`

const MobileMenu = ({open, onClose}) => {
console.log(open)
  return (
         <Paper open={open} onClick={()=>onClose(false)}>
            <Container  >
                <X icon={faX} onClick={()=>onClose(false)} />
                <MenuHeader>
                    DANH MỤC
                </MenuHeader>
                <MenuItem>
                134dasd mnb jk,jn ,mn  jkj  jjk k lfdkaldsk aklsdkas asd
                </MenuItem>
                <MenuItem>
                2
                </MenuItem>
                <MenuItem>
                3
                </MenuItem>
            </Container>
         </Paper>
  )
}

export default MobileMenu