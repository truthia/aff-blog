import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components';
import { css } from 'styled-components';
import { submitComment } from '../services';
import { SCREENS } from '../variables/Variables';

const CommentsFormContainer= styled.div`
  background-color:white ;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem; /* 8px */
  padding: 1.5rem 2rem 3.5rem 2rem;
  margin-bottom: 2rem ;
`
const FormHeader=styled.h3`
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  font-weight:600;
  border-bottom-width: 1px;
  padding-bottom:1rem ;
`
const FormInputs=styled.div`
  display:grid ;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap:1rem;
  margin-bottom:1rem ;
  ${
    (({checkbox})=>!checkbox&&css`
       grid-template-columns: repeat(2, minmax(0, 1fr));
    `)
  }
   @media screen and (max-width: ${SCREENS.lg}){
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`
const TextArea =styled.textarea`
  padding:1rem;
  margin-bottom:1rem ;
  outline:none ;
  width:100%;
  border-radius: 0.5rem; 
  background-color:#f3f4f6;
  color:#334155;
  border-color: rgb(229 231 235);
 ;
  &:focus{
    border-color:#475569;
  }
`
const Input=styled.input`
  border-style:solid;
  padding:1rem;
  outline:none ;
  width:100%;
  border-radius: 0.5rem; 
  background-color:#f3f4f6;
  color:#334155;
  border-color: rgb(229 231 235);
 ;
  &:focus{
    border-color:#475569;
  }
  ${({error})=>
    error? css`border-color:red;`:""
  }
`
const Error =styled.p`
 font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  color:red;
  
`
const ButtonSubmit=styled.button`
  transition:all 0.5s ease ;
  font-size:medium;
  color:white;
  display: inline-block;
  border:none;
  cursor: pointer;
  border-radius:9999px;
  padding:1rem;
  margin-top:1rem;
  background-color:#be185d;
  &:hover{
    background-color:#4338ca;
    
  }
`
const Success=styled.span`
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  float:right;
  font-weight:600 ;
  margin-top:0.75rem;
  color:#22c55e;
`
const CheckBoxLabel=styled.label`
  color:#6b7280;
  cursor: pointer;
  margin-left:0.5rem;
`
function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}
const CommentsForm = ({slug}) => {
  const [error,setError]= useState(false);
  const [emailError,setEmailError]= useState(false);
  const [localStorage, setLocalStorage]=useState(null);
  const [showSuccessMessage, setShowSuccessMessage]=useState(false);
  const commentEl = useRef();
  const nameEl= useRef();
  const emailEl= useRef();
  const storeDataEl=useRef();

  const handleFormSubmit=()=>{
    setError(false)
    setEmailError(false)

    const {value:comment}= commentEl.current
    const {value:name}=nameEl.current
    const {value:email}=emailEl.current
    const {checked: storeData}=storeDataEl.current

    if(!comment||!name||!email){
      setError(true)
      return
    }
    if(!ValidateEmail(email)){
      setEmailError(true)
      return
    }
    const commentObj= {name, email,comment,slug}
    if(storeData){
      window.localStorage.setItem("name",name)
      window.localStorage.setItem("email",email)
    }
    else {
      window.localStorage.removeItem("name",name)
      window.localStorage.removeItem("email",email)
    }

    submitComment(commentObj).then((res)=>{
      if(res) setShowSuccessMessage(true)
    });
  }

  useEffect(()=>{
    nameEl.current.value=window.localStorage.getItem("name")
    emailEl.current.value=window.localStorage.getItem("email")
  },[])

  return (
    <CommentsFormContainer >
      <FormHeader>Để lại bình luận</FormHeader>
        <TextArea ref={commentEl}
          placeholder='Bình luận'
          name="comment"
        >
        </TextArea>
      <FormInputs>
        <Input placeholder='Họ tên' ref={nameEl} />
        <Input type="email" placeholder='Email' error={emailError} ref={emailEl} />
        {emailError&&<Error style={{float:"right"}}>Email không hợp lệ.</Error>}
      </FormInputs>
      <FormInputs checkbox>
        <div>
          <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="true" />
          <CheckBoxLabel htmlFor='storeData'>Lưu thông tin bình luận.</CheckBoxLabel>
        </div>
      </FormInputs>
      {error&&<Error>Vui lòng điền đầy đủ thông tin.</Error>}
      <ButtonSubmit onClick={handleFormSubmit}>Đăng bình luận</ButtonSubmit>
      {showSuccessMessage&&<Success>
          Bình luận đang chờ được kiểm duyệt.
        </Success>}
    </CommentsFormContainer>
  )
}

export default CommentsForm