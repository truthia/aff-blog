import Link from 'next/link'
import React,{useContext,useState,useEffect} from 'react'
import styled from 'styled-components'
import { getCategories } from '../services'
import { SCREENS } from '../variables/Variables'
import MobileMenu from './MobileMenu'

const categories= [{name:"React",slug:"react"},{name:"Web Development",slug:"web-dev"}]

const Container = styled.div`
  margin:0 auto;
  margin-bottom: 2rem ;
  padding:0 2.5rem;
  width:100% ;
 

  @media screen and (max-width: ${SCREENS.sm}){
    max-width: ${SCREENS.sm} ;
  }
  @media screen and (max-width: ${SCREENS.md}){
    max-width: ${SCREENS.md} ;
    padding:0 1rem;
  }
  @media screen and (max-width: ${SCREENS.lg}){
    max-width: ${SCREENS.lg} ;
  }
  @media screen and (max-width: ${SCREENS.xl}){
    max-width: ${SCREENS.xl} ;
  }
  @media screen and (max-width: ${SCREENS['2xl']}){
    max-width: ${SCREENS['2xl']} ;
  }
`
const HeaderContainer = styled.div`
    border-bottom: 2px solid #60a5fa;
    padding: 1.5rem;
    display:flex ;
    flex-direction:row ;
    align-items:center ;
    justify-content:space-between ;


`
const LogoContainer=styled.div`
    display:block ;
    
`
const Logo =styled.span`
    cursor: pointer;
    font-weight:700 ;
    font-size: 2.25rem; /* 36px */
    line-height: 2.5rem; /* 40px */
    color:white;
    @media screen and (max-width: ${SCREENS.md}){
      font-size: 2rem
  }
`

const CategoriesContainer= styled.div`
     display:block ;

    @media screen and (max-width: ${SCREENS.md}){
      display:none ;
   
    }
`
const CategoryLink=styled.span`
    margin-top:0.5rem;
    text-align: center ;
    color:white;
    margin-left:1rem;
    font-weight: 600;
    cursor: pointer;
    @media screen and (max-width: ${SCREENS.md}){
    
    }
`

const Header = () => {
  const [categories, setCategories]=useState([])
  useEffect(()=>{
    getCategories().then((newCategories)=>{
      setCategories(newCategories)
    })
  },[])
  return (
    <Container>
        <HeaderContainer>
          <MobileMenu />
            <LogoContainer>
                <Link href="/">
                    <Logo >TrungTran</Logo>
                </Link>
            </LogoContainer>
            <CategoriesContainer>
                {
                    categories.map((category)=>{
                        return <Link key={category.slug} href={`/danh-muc/${category.slug}`}>
                            <CategoryLink>
                                {category.name}
                            </CategoryLink>
                        </Link>
                        
                    })
                }
            </CategoriesContainer>
        </HeaderContainer>
    </Container>
  )
}

export default Header