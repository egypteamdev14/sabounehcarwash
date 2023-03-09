import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from '@next/font/google'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { mainPageCard } from '@/helper/mainPageCard';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import AnalyticCard from '@/components/MainPage/AnalyticCard';

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
      <main className='main-page'>
        <div className='home-card'>
          {mainPageCard?.map((item, index) => (
            <AnalyticCard item={item} key={index}/>
          ))}
        </div>
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