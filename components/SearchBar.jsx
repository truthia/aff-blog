import React, { useRef, useState } from 'react'
import  styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { SCREENS } from '../variables/Variables'
import Link from 'next/link'
import { useRouter } from 'next/router' 

const Container= styled.div`
    background-color: white ;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-radius: 0.5rem; /* 8px */
    padding:0;
    margin-bottom:2rem ;
    position: relative ;

    background-color: Transparent;
    background-repeat:no-repeat;
`
const SearchBarInput=styled.input`
    border-style:solid;
    padding:0.5rem;
    outline:none ;
    width:100%;
    font-size:medium ;
    border-radius: 0.5rem; 
    background-color: rgba(203,213,225,0.5);
    background-repeat:no-repeat;
    color:#1d170f;
    border-color:#e2e8f0;
    -webkit-box-shadow: 0px 0px 0px 1px #E2E8F0; 
    box-shadow: 0px 0px 0px 1px #E2E8F0;
    ;
    &:focus{
        background-color: rgba(203,213,225,0.9);
    }
`
const SearchBarButton= styled.button`
    right:0.5rem;
    position:absolute ;
    font-size:medium;
    display: inline-block;
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;      
    cursor: pointer;
    border-radius:50%;
    padding:0.4rem 0.5rem;

`
const ButtonIcon=styled(FontAwesomeIcon)`
    width:100%;
    transition:all 0.5s ease ;
    height:1.5rem;
    color:#db2777;
    &:hover{
        color:#4338ca;
        
    }
`
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}
const SearchBar = () => {
    const router=useRouter()
    const [text,setText]=useState("");
    const keyHandler=(e)=>{
        if(e.keyCode==13){
            router.push(`/tim-kiem/${removeVietnameseTones(text).replace(/\s+/g, '-').toLowerCase()}`)
        }
    }
  return (
    <Container>
        <SearchBarInput placeholder='Tìm kiếm...' value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=>keyHandler(e)} />
        <SearchBarButton >
            <Link href={`/tim-kiem/${removeVietnameseTones(text).replace(/\s+/g, '-').toLowerCase()}`}>
                <ButtonIcon icon={faMagnifyingGlass} />
            </Link>
        </SearchBarButton>
    </Container>
  )
}

export default SearchBar