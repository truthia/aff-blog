import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getFeaturedPosts, getPosts, getRecentPosts, getRecentPostsFooter } from '../services'
import { SCREENS } from '../variables/Variables'

const Container=styled.div`
  
    margin:2rem auto;
    padding:0 2.5rem;
    padding-bottom:2rem ;
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
const FooterContainer=styled.div`
    display:flex;
    flex-direction:row ;
    justify-content:space-around ;
    align-items:flex-start ;
    gap:2rem;
    border-top: 2px solid #60a5fa;
    padding: 1.5rem;
    
    display:flex ;
  
    @media screen and (max-width: ${SCREENS.lg}){
    flex-direction:column ;
  }
`
const FooterSection=styled.div`
    display:flex;
    flex-direction:column ;
    justify-content:flex-start ;
    align-items:flex-start ;
`
const FooterHeader=styled.h3`
    font-size: 1.25rem; /* 20px */
    line-height: 1.75rem; /* 28px */
    margin-bottom:2rem ;
    color:white;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));

`
const Logo=styled.p`
    font-weight:700 ;
    font-size: 2.25rem; /* 36px */
    line-height: 2.5rem; /* 40px */
    color:white;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
`
const AboutUs=styled.p`
    color:white;
    font-size: 1rem; /* 16px */
    line-height: 1.5rem; /* 24px */
`
const FooterPost=styled.div`
  display:flex ;
  align-items:center ;
  width:100%;
  margin-bottom:0.25rem;

`
const FooterPostsImage=styled.div`
  	width: 4rem; /* 64px */
    flex: none;
`
const Img=styled.img`
 vertical-align:middle ;
 border-radius: 0.5rem ;
 object-fit:cover ;
`
const FooterPostDetails =styled.div`
  margin-left: 1rem;
  cursor: pointer;
`

const FooterPostLink=styled(Link)`
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
  
`
const Footer = () => {
    const [recentPosts, setRecentPosts]=useState([])
    const [featuredPosts, setFeaturedPosts]=useState([])
    useEffect(()=>{
        getRecentPostsFooter().then((data)=>{
            setRecentPosts(data);
        })
        getFeaturedPosts().then((data)=>{
            setFeaturedPosts(data)
        })
    },[])
  return (
    <Container>
        <FooterContainer>
            <FooterSection>
                <FooterHeader>
                    GIỚI THIỆU VỀ CHÚNG TÔI
                </FooterHeader>
                <Logo>
                    TrungTran
                </Logo>
                <AboutUs>
                    Chúng tôi xây dựng một Blog hàng đầu về công nghệ thông tin
                </AboutUs>
            </FooterSection>
            <FooterSection>
                <FooterHeader>BÀI VIẾT MỚI</FooterHeader>
                {recentPosts.map((post)=>{
                    return(
                        <FooterPost key={post.title}>
                            <FooterPostsImage>
                            <Img alt={post.title} height="60px" width="60px" 
                            src={post.featuredImage.url}
                            />
                            </FooterPostsImage>
                            <FooterPostDetails>
                                <FooterPostLink href={`/bai-viet/${post.slug}`} key={post.title}>
                                    <span style={{color:"white"}}>{post.title}</span>
                                </FooterPostLink>
                            </FooterPostDetails>
                        </FooterPost>   
                    )
                })}
            </FooterSection>
            <FooterSection>
                <FooterHeader>BÀI VIẾT TIÊU BIỂU</FooterHeader>
                {featuredPosts.slice(0,7).map((post)=>{
                    return(
                        <FooterPost key={post.title}>
                            <FooterPostsImage>
                            <Img alt={post.title} height="60px" width="60px" 
                            src={post.featuredImage.url}
                            />
                            </FooterPostsImage>
                            <FooterPostDetails>
                                <FooterPostLink href={`/bai-viet/${post.slug}`} key={post.title}>
                                    <span style={{color:"white"}}>{post.title}</span>
                                </FooterPostLink>
                            </FooterPostDetails>
                        </FooterPost>   
                    )
                })}
            </FooterSection>
        </FooterContainer>
    </Container>
  )
}

export default Footer