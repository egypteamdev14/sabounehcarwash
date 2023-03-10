import Head from "next/head";
import dynamic from "next/dynamic";
// import Image from 'next/image'
import { Inter } from "@next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { mainPageCard } from "@/helper/mainPageCard";
// import { MdOutlineMoreHoriz } from "react-icons/md";
import AnalyticCard from "@/components/MainPage/AnalyticCard";
import Chart from "@/components/Chart";

import { getAllOrders } from "@/services/orders";
import { useQuery } from "react-query";

const inter = Inter({ subsets: ["latin"] });

import OrderTable from "@/components/OrderTable";

const PiaChart = dynamic(() => import("../components/MainPage/PiaChart"), {
    ssr: false,
});

export default function Home() {
    const { data, error, isLoading } = useQuery("getOrders", getAllOrders);
    console.log(data);
    return (
        <>
            <Head>
                <title>Sabouneh Car Wash</title>
                <meta name="description" content="Sabouneh Car Wash" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="main-page">
                <div className="home-card">
                    {mainPageCard?.map((item, index) => (
                        <AnalyticCard item={item} key={index} />
                    ))}
                </div>
                <div className="chart-comp mb-5">
                    <Chart />
                    <PiaChart />
                </div>
                <OrderTable data={data?.orders} />
            </main>
        </>
    );
}
