import styled from 'styled-components'
import { Layout } from '../components'
import '../styles/globals.scss'

const BackGround= styled.div`
   position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background-color: black;
  z-index: 99999;  /*just make sure it's the highest on the page*/
`

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
