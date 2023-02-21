import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {



  return (
    <>
      <Head>
        <title>Sabouneh Car Wash</title>
        <meta name="description" content="Sabouneh Car Wash" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>
        Sabouneh
      </main>
    </>
  )
}


export async function getStaticProps({ locale = 'en-EN' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
}