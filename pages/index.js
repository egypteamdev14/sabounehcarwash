import Head from "next/head";
// import Image from 'next/image'
import { Inter } from "@next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { mainPageCard } from "@/helper/mainPageCard";
import { MdOutlineMoreHoriz } from "react-icons/md";
import AnalyticCard from "@/components/MainPage/AnalyticCard";
import Chart from "@/components/Chart";
import TableOrder from "@/components/OrderTable";
import { getAllOrders } from "@/services/orders";
import { useQuery } from "react-query";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, error, isLoading } = useQuery("getOrders", getAllOrders);
  console.log(data);
  return (
    <>
      <Head>
        <title>Sabouneh Car Wash</title>
        <meta name="description" content="Sabouneh Car Wash" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-page">
        <div className="home-card">
          {mainPageCard?.map((item, index) => (
            <AnalyticCard item={item} key={index} />
            // <div className='analytic-card' key={index}>
            //   <div className='first-child'>
            //     <div className='title'>
            //       <h5>{item.title}</h5>
            //       <p>Today</p>
            //     </div>
            //     <MdOutlineMoreHoriz />
            //   </div>
            //   <div className='second-child'>
            //     <div className='icon'>
            //     {item.icon}
            //     </div>

            //     <div className='numbers'>
            //       <p>145</p>
            //       <p className='text-muted'>
            //         <span className='me-2' style={{color: "#12B249"}}>12%</span>
            //         increase
            //       </p>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
        <Chart />
        <TableOrder data={data?.orders} />
      </main>
    </>
  );
}

export async function getStaticProps({ locale = "en-EN" }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
}
