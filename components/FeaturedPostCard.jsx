import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';


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
const AuthorImageContainer=styled.div`
    display:flex ;
    justify-items:center ;
    position:absolute ;
    width:100% ;
    justify-content:center ;
    bottom:1.25rem ;
`
const AuthorImage=styled(Image)`
    vertical-align:middle ;
    border-radius:9999px ;
    filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
    width: 30px;
    height:30px;
    margin-right:0.25rem;
    object-fit:cover ;
`
const AuthorName=styled.p`
    display:inline ;
    vertical-align:middle ;
    color:white ;
    margin-left:0.5rem ;
    font-weight:500 ;
    filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
`
const LinkSpan= styled.span`
    width:100%;
    height:100%;
    position:absolute ;
    cursor: pointer;
`
const FeaturedPostCard = ({ post }) => (
  <Container >
    <BackgroundImageContainer style={{ backgroundImage: `url('${post.featuredImage.url}')` }} />
    <BackgroundGradient  />
    <FeaturedInfo >
      <Date>{moment(post.createdAt).format('MMM DD, YYYY')}</Date>
      <Title>{post.title}</Title>
      <AuthorImageContainer >
      
        <AuthorImage
          unoptimized
          alt={post.author.name}
          height="30px"
          width="50px"
          src={post.author.photo.url}
        />
        <AuthorName >{post.author.name}</AuthorName>
      </AuthorImageContainer>
    </FeaturedInfo>
    <Link href={`/bai-viet/${post.slug}`}><LinkSpan /></Link>
  </Container>
);

export default FeaturedPostCard;