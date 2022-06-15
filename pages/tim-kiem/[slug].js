import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import { SCREENS } from '../../variables/Variables'
import {PostCard,PostWidget,Categories, SearchBar} from "../../components";
import { FeaturedPosts } from '../../sections/index';
import { getSearchResult } from '../../services';
import { useEffect, useRef } from 'react';

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

const BodyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap:3rem;
  @media screen and (max-width: ${SCREENS.lg}){
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`
const PostsContainer = styled.div`
    grid-column: 1/ 9;
    display:grid ;
    grid-template-columns:repeat(2,1fr) ;
    gap:1rem;
    @media screen and (max-width: ${SCREENS.lg}){
    grid-column: 1 ;
    grid-template-columns:repeat(1,1fr) ;
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
const NoResult= styled.div`
     background-color: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem; /* 8px */;
  padding:2rem;
  padding-bottom:3rem;
  margin-bottom: 2rem ;
  grid-column: 1/3 ;
  @media screen and (max-width: ${SCREENS.lg}){
    padding-top:1.5rem;
    grid-column:1 ;
  }
`
const Search = ({posts}) => {
    return (
        <Container >
        <Head>
          <title>Aff Blog</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SearchBarMobile>
          <SearchBar />
        </SearchBarMobile>
        <FeaturedPosts />
        <BodyContainer>
          <PostsContainer >
            {posts.map((post,index)=>{
              return (
                <PostCard key={post.node.title} post={post.node} />
              )
            })}
             {posts.length<1&&
            <NoResult>
                <h3>Không tìm thấy kết quả nào.</h3>
            </NoResult>}
          </PostsContainer>
          <SideContainer>
            <SearchBarDesktop>
              <SearchBar />
            </SearchBarDesktop>
            <SideBarContainer>
              <PostWidget />
              <Categories />
            </SideBarContainer>
          </SideContainer>
        </BodyContainer>
      </Container>
    )
}


export default Search

export async function getStaticProps({params}){
    const data= await getSearchResult(params.slug)||[];
    return {
      props:{posts:data}
    }
}
export async function getStaticPaths() {
    return {
      paths: [],
      fallback: "blocking",
    };
  }