import React from 'react'
import { useState,useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Link from 'next/dist/client/link' 

import { getRecentPosts,getSimilarPosts } from '../services'


const PostWidgetContainer=styled.div`
  background-color: white ;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem; /* 8px */
  padding:1.5rem;
  padding-top:0.5rem ;
  margin-bottom:2rem ;
`
const PostWidgetHeader= styled.h3`
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  margin-bottom: 1.5rem ;
  font-weight:600 ;
  border-bottom-width: 1px;
`
const RelatedPost=styled.div`
  display:flex ;
  align-items:center ;
  width:100%;
  margin-bottom:1rem;

`
const RelatedPostsImage=styled.div`
  	width: 4rem; /* 64px */
    flex: none;
`
const Img=styled.img`
 vertical-align:middle ;
 border-radius: 9999px ;
 object-fit:cover ;
`
const RelatedPostDetails =styled.div`
  margin-left: 1rem;
`
const DateCreated= styled.p`
  color:#6b7280;
  font-size: 0.75rem; /* 12px */
  line-height: 1rem; /* 16px */

`
const RelatedPostLink=styled(Link)`
  font-size: 1rem; /* 16px */
  line-height: 1.5rem; /* 24px */
`
const PostWidget = ({categories,slug}) => {
  const [relatedPosts, setRelatedPosts]=useState([])
  useEffect(()=>{
    if(slug){
      getSimilarPosts(categories,slug).then((result)=>{result.reverse();setRelatedPosts(result)})
    }
    else{
      getRecentPosts().then((result)=>{result.reverse();setRelatedPosts(result)})
    }
    ;
  },[slug])
  return (
   <PostWidgetContainer>
     <PostWidgetHeader>
       {slug?"Bài viết liên quan":"Bài viết mới"}
     </PostWidgetHeader>
      {relatedPosts.map(post=>{
        return(
          <RelatedPost key={post.title}>
            <RelatedPostsImage>
              <Img alt={post.title} height="60px" width="60px" 
              src={post.featuredImage.url}
              />
            </RelatedPostsImage>
            <RelatedPostDetails>
              <DateCreated>
                {moment(post.createAt).format("MMM DD,yyyy")}
              </DateCreated>
              <RelatedPostLink href={`/bai-viet/${post.slug}`} key={post.title}>
                {post.title}
              </RelatedPostLink>
            </RelatedPostDetails>
          </RelatedPost>   
        )
      })}
     
   </PostWidgetContainer>
  )
}

export default PostWidget