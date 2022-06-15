import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import styled
 from 'styled-components'
import moment from 'moment'
import { SCREENS } from '../variables/Variables'

 const PostDetailContainer=styled.div`
    background-color: white;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-radius: 0.5rem; /* 8px */;
    padding:2rem;
    padding-bottom:3rem;
    margin-bottom: 2rem ;
    @media screen and (max-width: ${SCREENS.lg}){
        padding:0;
        padding-bottom:1.5rem;
    }
 `
 const FeaturedImageContainer = styled.div`
    position: relative;
    overflow:hidden ;
    height:50vw ;
    max-height:70vh;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding-bottom:20rem ;
    margin-bottom: 1.5rem;
`
const FeaturedImage =styled.img`  
    object-position: top;
    position:absolute ;
    height:100% ;
    width:100% ;
    object-fit:cover ;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-top-left-radius: 0.5rem; /* 8px */
    border-top-right-radius: 0.5rem; /* 8px */

`
const PostInfo = styled.div`
    display:flex ;
    align-items:center ;
    margin-bottom:2rem;
    margin-left:0rem ;
    @media screen and (max-width: ${SCREENS.lg}){
        margin-left:1rem ;
        width:95% ;
    }
`
const Author= styled.div`
  display:flex ;
  align-items: center ;
  margin-bottom:0 ;
  width:auto;
  margin-right: 2rem ;

`
const AuthorImage= styled.img`
  vertical-align: middle;
  border-radius:50% ;
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

const Date= styled.span`
`
const PostTitle=styled.h3`
    margin-bottom: 2rem;
    font-size: 1.875rem; /* 30px */
    line-height: 2.25rem; /* 36px */
    font-weight: 600 ;
`
const PostContent=styled.div`
    padding:0rem ;
    @media screen and (max-width: ${SCREENS.lg}){
        margin-left:1rem ;
        width:95% ;
    }
`
const H3=styled.h3`
font-size: 1.25rem; /* 20px */
line-height: 1.75rem; /* 28px */
font-weight:600 ;
margin-bottom:1rem ;
`
const P=styled.p`
margin-bottom:2rem ;
`
const H4=styled.h4`
font-size: 1rem; /* 16px */
line-height: 1.5rem; /* 24px */
font-weight:600 ;
margin-bottom:1rem;
`
const CalenderIcon=styled(FontAwesomeIcon)`
   height:1rem;
    padding:0 ;
    margin-right:0.5rem;
    color:#047857 ;
`
const PostDetail = ({post}) => {
    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;
    
        if (obj) {
          if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
          }
    
          if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
          }
    
          if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
          }
        }
    
        switch (type) {
          case 'heading-three':
            return <H3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</H3>;
          case 'paragraph':
            return <P key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</P>;
          case 'heading-four':
            return <H4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</H4>;
          case 'image':
            return (
              <img
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
              />
            );
          default:
            return modifiedText;
        }
      };
  return (
    <PostDetailContainer>
        <FeaturedImageContainer>
            <FeaturedImage src={post.featuredImage.url} alt={post.title} />
        </FeaturedImageContainer>
            <PostInfo>
                <Author>
                    <AuthorImage
                    alt={post.author.name}
                    height="30px"
                    widdth="30px"
                    src={post.author.photo.url}
                    />
                    <AuthorName>{post.author.name}</AuthorName>
                </Author>
                <CreatedAt>              
                    <CalenderIcon icon={faCalendar} />
                    <Date>{moment(post.createdAt).format('MMM DD, YYYY')}</Date>
                </CreatedAt>
               
            </PostInfo> 
            <PostContent>
                <PostTitle>
                        {post.title}
                </PostTitle>
                {post.content.raw.children.map((typeObj,index)=>{
                    const children=typeObj.children.map((item,itemIndex)=>getContentFragment(itemIndex,item.text,item))
                    return getContentFragment(index,children,typeObj,typeObj.type)
                })}
            </PostContent>
    </PostDetailContainer>
  )
}

export default PostDetail