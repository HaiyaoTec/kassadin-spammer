import {NextPageWithLayout} from "./_app";
import React, {ReactElement, useEffect, useState} from "react";
import Layout from "../components/Layout";
// @ts-ignore
import money from "@/assets/images/money.png"
// @ts-ignore
import nb1 from "@/assets/images/nb1.png"
// @ts-ignore
import nb2 from "@/assets/images/nb2.png"
// @ts-ignore
import nb3 from "@/assets/images/nb3.png"
// @ts-ignore
import ranking_banner from "@/assets/images/ranking_banner.png"
// import Image from 'next/image'
import {toNonExponential} from '../utils';
import mainApi from "../api";
import {ProxyUserRank} from "../api/samira-service-proxyApi";
import {Empty, Image} from "react-vant";

const nbs = [nb1, nb2, nb3]

const Ranking: NextPageWithLayout = () => {
    const [proxyUserRanks, setProxyUserRanks] = useState<ProxyUserRank[]>([])
    useEffect(() => {
        mainApi.ServicePayApi.listProxyRank().then(res => {
            setProxyUserRanks(res);
        })
    }, [])
    
    return (
        <div>
            <div className="relative h-[150px] bg-[#007CF7]">
                <Image fit="cover" alt="banner" src={ranking_banner}/>
            </div>
            <div className="bg-[#007CF7]">
                <div className="p-[30px_30px_20px] rounded-t-[24px] bg-[#ffffff]">
                    <table className="w-full">
                        <thead>
                        <tr className="text-[rgba(71,71,101,0.55)] label-3-semi-bold text-left h-[40px] mb-[10px] flex items-center">
                            <th className="w-[35px]"></th>
                            <th className="flex-1">Agen</th>
                            <th className="flex-1 text-center">Traded</th>
                            <th className="flex-1 text-right">Koin</th>
                        </tr>
                        </thead>
                        <tbody className="text-[rgba(51,51,64,0.88)]">
                        {
                            proxyUserRanks.length>0?proxyUserRanks.map((item, idx) => (
                                <tr key={idx} className="h-[40px] mb-[10px] flex items-center">
                                    <td className="w-[38px] h-[38px] mr-1 label-2-bold text-[rgba(58,58,89,0.33)] flex justify-center items-center">{
                                        nbs[idx]
                                            ? <Image width={23} height={28} src={nbs[idx]} alt={String(idx + 1)}/>
                                            : (idx + 1).toString().padStart(2, '0')
                                    }</td>
                                    <td className="flex items-center flex-1 max-w-[35%]">
                                        <Image className="rounded-[50%] overflow-hidden flex-shrink-0" width={30} height={30} src={item.avatar?.includes('http')?item.avatar:'https://img2.baidu.com/it/u=2015865969,3401990894&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=546'}
                                               alt="ava"/>
                                        <span className="max-w-[85px] ml-[4px] label-4-semi-bold whitespace-nowrap overflow-hidden text-ellipsis leading-[2em]">{item.username}</span>
                                    </td>
                                    <td className="label-4-regular w-[15%] text-center">{toNonExponential(item.count??0)}</td>
                                    <td className="flex items-center justify-end label-4-bold flex-1">
                                        <Image alt="" src={money} width={18} height={18}/>
                                        <span className="ml-[4px] text-[#1EA68A]">{toNonExponential(item.income??0)}</span>
                                    </td>
                                </tr>
                            )):<Empty className={'whitespace-nowrap'} description="Sudah tak terhitung jumlahnya" />
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
Ranking.getLayout = function (page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: {}, // will be passed to the page component as props
        revalidate: 600
    }
}

export default Ranking
