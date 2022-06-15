import React from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/dist/client/link'
import styled from 'styled-components'
import { SCREENS } from '../variables/Variables'

const PostCardContainer= styled.div`
  background-color: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem; /* 8px */;
  padding:1.5rem;
  padding-bottom:2rem;
  @media screen and (max-width: ${SCREENS.lg}){
    padding:0;
    padding-bottom:1.5rem;
  }
`

const FeaturedImageContainer = styled.div`
  position: relative;
  overflow:hidden ;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  padding-bottom:20rem ;
  margin-bottom: 1.5rem;
`
const FeaturedImage =styled.img`  
  object-position: top;
  position:absolute ;
  height: 20rem ;
  width:100% ;
  object-fit:cover ;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem; /* 8px */

  @media screen and (max-width: ${SCREENS.lg}){
    border-radius:0 ;
    border-top-left-radius: 0.5rem; /* 8px */
    border-top-right-radius: 0.5rem; /* 8px */
  }
`
const PostHeader = styled.h1`
  transition: color 0.7s ;
  text-align:center ;
  margin-bottom:1rem;
  cursor: pointer;
  &:hover{
    color:#db2777;
  }
  font-size: 24px;
  font-weight:600 ;
`
const PostInfo = styled.div`
  display:flex;
  text-align:center ;
  margin-bottom:1rem;
  width: 100% ;
  justify-content:center ;
  align-items:center ;
  @media screen and (max-width: ${SCREENS.lg}){
    display: block ;
  }
`
const Author= styled.div`
  display:flex ;
  align-items: center ;
  justify-content:center ;
  margin-bottom:0 ;
  width:auto;
  margin-right: 2rem ;
  @media screen and (max-width: ${SCREENS.lg}){
    margin-bottom:1rem ;
    width: 100%;
  }

`
const AuthorImage= styled.img`
  vertical-align: middle;
  border-radius:9999px ;
  width: 30px;
  height:30px;
  margin-right:0.25rem;
`
const AuthorName= styled.p`
  display:inline ;
  vertical-align: middle ;
  color:#374151;
`
const CreatedAt = styled.div`
  font-weight:500 ;
  color:#374151;
`
const CalenderIcon=styled(FontAwesomeIcon)`
    height:1rem;
    padding:0 ;
    margin-right:0.5rem;
    color:#047857 ;
`
const Date= styled.span`
`
const PostExcerpt= styled.p`
  text-align: center ;
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
  color:#374151;
  font-weight:500 ;
  padding:auto 5rem ;
  margin-bottom: 2rem;
  @media screen and (max-width: ${SCREENS.lg}){
    margin:0.25rem;
    margin-bottom:1rem ;
    padding:auto 1rem ;
  }
`
const Continue =styled.span`
  display:inline-block ;
  text-align:center;
  transition:all 0.5s ;
  background-color:#db2777 ;
  font-size: 24px;
  color:white;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  cursor: pointer;
  &:hover{
    transform: translateY(0.25rem);
  }
`
const PostCard = ({post}) => {
  return (
   <PostCardContainer>
     <FeaturedImageContainer>
       <FeaturedImage src={post.featuredImage.url} alt={post.title} />
     </FeaturedImageContainer>
     <PostHeader>
       <Link href={`/bai-viet/${post.slug}`}>
        {post.title}
       </Link>
     </PostHeader>
     <PostInfo>
       <Author>
        <AuthorImage
          alt={post.author.name}
          src={post.author.photo.url}
        />
        <AuthorName>{post.author.name}</AuthorName>
       </Author>
       <CreatedAt>
        <span>
        <CalenderIcon icon={faCalendar} />
        </span>
        <Date>{moment(post.createdAt).format('MMM DD, YYYY')}</Date>
       </CreatedAt>
     </PostInfo>
     <PostExcerpt>
       {post.excerpt}
     </PostExcerpt>
     <div style={{textAlign:"center"}}>
      <Link href={`/bai-viet/${post.slug}`}>
        <Continue>Đọc Tiếp</Continue>
      </Link>
     </div>
   </PostCardContainer>
  )
}

export default PostCard