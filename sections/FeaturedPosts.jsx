import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styled from 'styled-components';

import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar ,faAngleLeft,faAngleRight} from '@fortawesome/free-solid-svg-icons'
const Container=styled.div`
  margin-bottom:2rem;
`
const LeftArrow=styled.div`
  position:absolute ;
  left:1rem;
  top:40%;
  text-align:center ;
  padding:0.5rem 1rem;
  padding-bottom: 0.3rem ;
  cursor: pointer;
  background-color:#be185d ;
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
  background-color:#be185d ;
  border-radius:99999px ;
  user-select: none;

`
const ArrowIcon=styled(FontAwesomeIcon)`
  width:100%;
  height:3rem;
  color:white;
  
`
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
  }, []);

  const customLeftArrow = (
    <LeftArrow>
      <ArrowIcon icon={faAngleLeft} />
    </LeftArrow>
  );

  const customRightArrow = (
   <RightArrow>
    <ArrowIcon icon={faAngleRight} />
   </RightArrow>
  );

  return (
    <Container >
      <Carousel infinite customLeftArrow={customLeftArrow} customRightArrow={customRightArrow} responsive={responsive} itemClass="px-4">
        {dataLoaded && featuredPosts.map((post, index) => (
          <FeaturedPostCard key={index} post={post} />
        ))}
      </Carousel>
    </Container>
  );
};

export default FeaturedPosts;
