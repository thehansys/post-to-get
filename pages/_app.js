import '../styles/globals.css'
import {useEffect} from "react";
import { prefetch } from '@layer0/prefetch/window'


function MyApp({ Component, pageProps }) {

  // Prefetch test
  useEffect(() => {
    prefetch("/post","object",  {
      body : JSON.stringify({
        token : "something"
      }),
      method : "post"
    })
  }, [])


  return <Component {...pageProps} />
}

export default MyApp
