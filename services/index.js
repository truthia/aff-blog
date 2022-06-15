import {request, gql} from 'graphql-request'
import axios from 'axios';

const graphqlAPI= process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async ()=>{
    const query = gql`
            query MyQuery {
                postsConnection {
                    edges {
                    node {
                        author {
                        bio
                        name
                        id
                        photo {
                            url
                        }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                        url
                        }
                        categories {
                        slug
                        name
                        }
                    }
                    }
                }
        }
    `
    const result= await request (graphqlAPI,query)

    return result.postsConnection.edges
}

export const getRecentPosts = async ()=>{
    const query=gql`
        query GetPostDetails(){
            posts(
                orderBy:createdAt_ASC
                last:3
            ){
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }
    `
     const result= await request (graphqlAPI,query)

     return result.posts
}
export const getRecentPostsFooter = async ()=>{
  const query=gql`
      query GetPostDetails(){
          posts(
              orderBy:createdAt_ASC
              last:7
          ){
              title
              featuredImage{
                  url
              }
              createdAt
              slug
          }
      }
  `
   const result= await request (graphqlAPI,query)

   return result.posts
}
export const getPostDetails = async (slug)=>{
    const query = gql`
            query GetPostDetails($slug:String!) {
                post(where:{slug:$slug}) {
                        author {
                        bio
                        name
                        id
                        photo {
                            url
                        }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                        url
                        }
                        categories {
                        slug
                        name
                        }
                        content {
                        raw
                        }
                }
        }
    `
    const result= await request (graphqlAPI,query,{slug})

    return result.post
}
export const getSimilarPosts = async (categories,slug)=>{
    const query=gql`
        query GetPostDetails($slug:String!,$categories:[String!]){
            posts(
                where:{slug_not:$slug,AND:{categories_some:{slug_in:$categories}}}
                last:3
            ){
                title
                featuredImage{
                    url
                }
                createdAt
                slug
            }
        }
    `
     const result= await request (graphqlAPI,query,{categories,slug})

     return result.posts
}
export const getCategories =async()=>{
    const query=gql`
        query GetCategories{
            categories{
                name
                slug
            }
        }
    `
    const result= await request (graphqlAPI,query)
    return result.categories
}

export const submitComment = async(obj)=>{
    const options = {
        headers: {"content-type": "application/json"}
    }
    const result= await axios.post("/api/comments"
      ,JSON.stringify(obj),options)
    // const result = await fetch("/api/comments",{
    //     method:"POST",
    //     headers: {
    //             'Content-Type': 'application/json'
    //     },
    //     body:JSON.stringify(obj)
    // })

    return result
}
export const getComments= async (slug)=>{
    const query = gql`
        query GetComments($slug:String!){
            comments(where:{post:{slug:$slug}}){
                name
                createdAt
                comment
            }
        }
    `
    const result=await request(graphqlAPI,query,{slug})

    return result.comments
}
export const getAdjacentPosts = async (createdAt, slug) => {
    const query = gql`
      query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
        next:posts(
          first: 1
          orderBy: createdAt_ASC
          where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
        previous:posts(
          first: 1
          orderBy: createdAt_DESC
          where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug, createdAt });
  
    return { next: result.next[0], previous: result.previous[0] };
  };

  export const getFeaturedPosts = async () => {
    const query = gql`
      query GetCategoryPost() {
        posts(where: {featuredPost: true}) {
          author {
            name
            photo {
              url
            }
          }
          featuredImage {
            url
          }
          title
          slug
          createdAt
        }
      }   
    `;
  
    const result = await request(graphqlAPI, query);
  
    return result.posts;
  };
  export const getCategoryPost = async (slug) => {
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: {categories_some: {slug: $slug}}) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `
    const result=await request (graphqlAPI,query,{slug})
    return result.postsConnection.edges
  };
export const getSearchResult= async(text)=>{
  const words=new Set(text.split("-"))
  let resultsList=[]
  const query = gql`
  query GetSearchResult($word: String!) {
    postsConnection(where: {_search: $word}) {
      edges {
        cursor
        node {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
        }
      }
    }
  }
`
for(let word of words){
  let result = await request (graphqlAPI,query,{word})
  resultsList.push(...result.postsConnection.edges)
}


return resultsList
}
  