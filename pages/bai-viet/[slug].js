import React from 'react'
import styled from 'styled-components'

import {getPosts,getPostDetails} from "../../services"
import {PostDetail, Categories, PostWidget, Author, Comments,CommentsForm, SearchBar} from "../../components"
import { SCREENS } from '../../variables/Variables'
import AdjacentPosts from '../../sections/AdjacentPosts'
const Container = styled.div`
 margin:0 auto;
  margin-bottom: 2rem ;
  padding:0 3rem;
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
    padding:0 2rem;
  }
  @media screen and (max-width: ${SCREENS['2xl']}){
    max-width: ${SCREENS['2xl']} ;
  }
`
const BodyContainer =styled.div`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap:3rem;
    @media screen and (max-width: ${SCREENS.lg}){
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`
const SideContainer = styled.div`
    grid-column: 9/ 13;
    @media screen and (max-width: ${SCREENS.lg}){
    grid-column: 1 ;
    }
`
const SideBarContainer=styled.div`
    position: sticky ;
    top:2rem;
`
const PostContainer = styled.div`
    grid-column: 1/ 9;
    @media screen and (max-width: ${SCREENS.lg}){
    grid-column: 1 ;
  }
`
const SearchBarMobile=styled.div`
  display:none ;
  @media screen and (max-width: ${SCREENS.lg}){
    display:block ;
  }
`
const SearchBarDesktop=styled.div`
  display:block ;
  @media screen and (max-width: ${SCREENS.lg}){
    display:none ;
  }
`

const PostDetails = ({post}) => {

  return (
    <Container>
      <SearchBarMobile>
        <SearchBar />
      </SearchBarMobile>
      <BodyContainer
      >
        <PostContainer>
          <PostDetail post={post} />
          <Author author={post.author} />
          <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </PostContainer>
        <SideContainer>
          <SearchBarDesktop>
            <SearchBar />
          </SearchBarDesktop>
          <SideBarContainer>
            <PostWidget slug={post.slug} categories={post.categories.map((category)=>category.slug)} />
            <Categories />
          </SideBarContainer>
        </SideContainer>
      </BodyContainer>
    </Container>
  )
}

export default PostDetails

export async function getStaticProps({params}){

  const data= await getPostDetails(params.slug);
  return {
    props:{post:data}
  }
}
export async function getStaticPaths(){
  const posts = await getPosts();
  return {
    paths: posts.map(({node:{slug}})=>({params:{slug}})),
    fallback:false
  }
}