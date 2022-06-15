import moment from 'moment'
import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { getComments } from '../services'
import parse from 'html-react-parser'


const CommentsContainer= styled.div`
  background-color:white ;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem; /* 8px */
  padding: 1.5rem 2rem 3.5rem 2rem;
  margin-bottom: 2rem ;
`
const CommentsHeader=styled.h3`
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  font-weight:600;
  border-bottom-width: 1px;
  padding-bottom:1rem ;
`
const Comment=styled.div`
  	border-bottom-width: 1px;
    border-color: rgb(243 244 246);
    margin-bottom: 1rem ;
    padding-bottom:1rem ;
`
const CommentName=styled.p`
  margin-bottom:1rem;
`
const CommentNameSpan=styled.span`
  font-weight:600;
`
const CommentContent=styled.p`
  	white-space: pre-line;
    color:rgb(75 85 99);
    width:100%;
`
const Comments = ({slug}) => {
  const [comments, setComments]=useState([])

  useEffect(()=>{
    getComments(slug).then((result)=>{
      setComments(result)
    })
  },[slug])

  return (
    <>
          <CommentsContainer>
            <CommentsHeader>
              {comments.length}
              {' '}
              Bình luận
            </CommentsHeader>
            {
              comments.map((comment)=>{
                return(
                  <Comment key={comment.createdAt}>
                    <CommentName>
                      <CommentNameSpan>
                        {comment.name}
                      </CommentNameSpan>
                      {' '}on{' '}{moment(comment.createdAt).format("MMM DD, YYYY")}
                    </CommentName>
                    <CommentContent>
                        {parse(comment.comment)}
                    </CommentContent>
                  </Comment>
                )
              })
            }
          </CommentsContainer>
    </>
  )
}

export default Comments