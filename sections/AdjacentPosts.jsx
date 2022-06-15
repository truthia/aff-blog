import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { AdjacentPostCard } from '../components';
import { getAdjacentPosts } from '../services';
import { SCREENS } from '../variables/Variables';

const Container=styled.div`
  display:grid;
  grid-template-columns:repeat(8,1fr) ;
  gap:1.5rem;
  margin-bottom:2rem ;
  @media screen and (max-width:${SCREENS.lg}){
    grid-template-columns:repeat(1,1fr) ;
  }
`
const PreviousPost=styled.div`
  grid-column:1/5 ;
  position: relative;
  border-radius:0.5rem ;
  height:18rem ;
  ${({next})=>{
    if(!next) {return css`
      grid-column:1/9 ;
    `
    }
  }}
    @media screen and (max-width:${SCREENS.lg}){
      grid-column:1/9 ;
  }
`
const NextPost=styled.div`
  grid-column:5/9 ;
  position: relative;
  border-radius:0.5rem ;
  height:18rem ;
  ${({previous})=>{
    if(!previous)  {
      return css`
      grid-column:1/9 ;
    `
    }
  }}
    @media screen and (max-width:${SCREENS.lg}){
      grid-column:1/9 ;
  }
`
const AdjacentPosts = ({ createdAt, slug }) => {
  const [adjacentPost, setAdjacentPost] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getAdjacentPosts(createdAt, slug).then((result) => {
      setAdjacentPost(result);
      setDataLoaded(true);
    });
  }, [slug]);

  return (
    <Container>
      {dataLoaded && (
        <>
          {adjacentPost.previous && (
            <PreviousPost next={adjacentPost.next} >
              <AdjacentPostCard post={adjacentPost.previous} position="LEFT" />
            </PreviousPost>
          )}
          {adjacentPost.next && (
            <NextPost previous={adjacentPost.previous} >
              <AdjacentPostCard post={adjacentPost.next} position="RIGHT" />
            </NextPost>
          )}
        </>
      )}
    </Container>
  );
};

export default AdjacentPosts;
