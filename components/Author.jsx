import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

const AuthorContainer= styled.div`
  text-align:center;
  margin-top:5rem;
  margin-bottom:2rem;
  padding:3rem;
  position: relative ;
  border-radius: 0.5rem; /* 8px */
  background-color:rgba(0, 0, 0, 0.2);
`
const AuthorImageWrapper=styled.div`

  position:absolute ;
  width:auto ;
  left:0;
  right:0rem;
  top: -3.5rem; /* 56px */
`
const AuthorImage=styled(Image)`
  vertical-align: middle ;
  border-radius:9999px;
  object-fit:cover ;
`
const AuthorName= styled.h3`
  color:white;
  margin: 1rem auto;
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  font-weight:700;
`
const AuthorBio = styled.p`
  color:white; 
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
`
const Author = ({author}) => {
  return (
    <AuthorContainer>
      <AuthorImageWrapper
      >
        <AuthorImage height="100px" width="100px" unoptimized src={author.photo.url} />
      </AuthorImageWrapper>
      <AuthorName>{author.name}</AuthorName>
        <AuthorBio>
          {author.bio}
        </AuthorBio>
    </AuthorContainer>
  )
}

export default Author