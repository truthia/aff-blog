import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { getCategories } from '../services'
import Link from 'next/dist/client/link' 
const CategoriesContainer= styled.div`
  background-color: white ;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem; /* 8px */
  padding:1.5rem;
  padding-top:0.5rem ;
  margin-bottom:2rem ;
`
const CategoriesHeader=styled.h3`
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  margin-bottom: 1.5rem ;
  font-weight:600 ;
  border-bottom-width: 1px;
`
const Category = styled.span`
  cursor: pointer;
  display:block ;
  padding-bottom: 0.75rem ;
  margin-bottom:0.75rem ;
`
const Categories = () => {
  const [categories, setCategories]=useState([])
  useEffect(()=>{
    getCategories().then((newCategories)=>{
      setCategories(newCategories)
    })
  },[])
  return (
    <CategoriesContainer>
      <CategoriesHeader>
        Danh mục
      </CategoriesHeader>
      {categories.map(category=>{
        return (
          <Link key={category.name} href={`/danh-muc/${category.slug}`}>
            <Category>
              {category.name}
            </Category>
          </Link>
        )
      })}
    </CategoriesContainer>
  )
}

export default Categories