import React from 'react'

import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';


const Container=styled.div`
    position:relative  ;
    height: 18rem; /* 288px */
    
`
const BackgroundImageContainer=styled.div`
    position:absolute ;
    border-radius: 0.5rem; /* 8px */
    background-position: center;
    background-repeat:no-repeat ;
    background-size: cover;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    display: inline-block;
    width:100% ;
    height:18rem;

`
const BackgroundGradient=styled.div`
    position:absolute ;
    border-radius: 0.5rem; /* 8px */
    background-position: center;
    background: linear-gradient(125deg, rgba(156,163,175,0.5) 0%, rgba(55,65,81,0.5) 50%, rgba(0,0,0,0.5) 100%);
    width:100% ;
    height:18rem ;
` 
const FeaturedInfo=styled.div`
    display:flex ;
    flex-direction:column ;
    border-radius: 0.5rem; /* 8px */
    padding:1rem;
    align-items:center;
    position:absolute ;
    width:100% ;
    height:100% ;
`
const Date = styled.p`
    margin-bottom:1rem ;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
    font-weight:600 ;
    font-size: 0.75rem; /* 12px */
    line-height: 1rem; /* 16px */
    color:white;
`
const Title= styled.p`
    margin-bottom:1rem ;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
    color:white;
    font-weight:600 ;
    font-size: 1.25rem; /* 20px */
    line-height: 1.75rem; /* 28px */
`

const LinkSpan= styled.span`
    width:100%;
    height:100%;
    position:absolute ;
    cursor: pointer;
`
const LeftArrow=styled.div`
  position:absolute ;
  left:1rem;
  top:40%;
  text-align:center ;
  padding:0.5rem 1rem;
  padding-bottom: 0.3rem ;
  cursor: pointer;
  background-color:rgba(0,0,0,0) ;
  border-radius:99999px ;
  user-select: none;

`
const RightArrow=styled.div`
  position:absolute ;
  right:1rem;
  top:40%;
  text-align:center ;
  padding:0.5rem 1rem;
  padding-bottom: 0.3rem ;
  cursor: pointer;
  background-color:rgba(0,0,0,0) ;
  border-radius:99999px ;
  user-select: none;

`
const ArrowIcon=styled(FontAwesomeIcon)`
  width:100%;
  height:3rem;
  color:#db2777;
  
`

const AdjacentPostCard = ({post,position}) => {
  return (
    <Container >
        <BackgroundImageContainer style={{ backgroundImage: `url('${post.featuredImage.url}')` }} />
        <BackgroundGradient  />
        <FeaturedInfo >
        <Date>{moment(post.createdAt).format('MMM DD, YYYY')}</Date>
        <Title>{post.title}</Title>
        </FeaturedInfo>
        {position==="LEFT"&&(
             <LeftArrow>
                <ArrowIcon icon={faAngleLeft} />
            </LeftArrow>
        )}
        {position==="RIGHT"&&(
             <RightArrow>
                <ArrowIcon icon={faAngleRight} />
            </RightArrow>
        )}
        <Link href={`/bai-viet/${post.slug}`}><LinkSpan /></Link>
       
    </Container>
  )
}

export default AdjacentPostCard