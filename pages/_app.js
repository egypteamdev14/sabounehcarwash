/* eslint-disable @next/next/no-page-custom-font */
import { Inter } from '@next/font/google'
import { appWithTranslation } from "next-i18next";
import "../styles/index.scss";

import { ToastContainer } from "react-toastify";
import MainLayout from '../layout/MainLayout'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SessionProvider, getSession, signIn, useSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux'
import store from '@/store';
import AuthGuard from '@/components/AuthGuard';
const inter = Inter({ subsets: ['latin'] })

function App({ Component, pageProps, session }) {

  const router = useRouter();

  return <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
    </Head>
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {router.pathname === "/signin" ?
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider> :
        <SessionProvider session={pageProps.session}>
          <Provider store={store}>
            <AuthGuard>
              {/* <MainLayout> */}
              <Component {...pageProps} />
              {/* </MainLayout> */}
            </AuthGuard>
          </Provider>
        </SessionProvider>
      }
    </>
  </>
}

export default appWithTranslation(App);


export async function getServerSideProps(context) {

  const session = await getSession({ req: context.req });


  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false
      }
    }
  }

  return {
    props: { session }, // will be passed to the page component as props
  }
}