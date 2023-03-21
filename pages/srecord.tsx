import {Button, Empty, Input} from 'react-vant';
import {NextPageWithLayout} from "./_app";
import React, {ReactElement, useEffect, useState} from "react";
import Layout from "../components/Layout";
// @ts-ignore
import money from "@/assets/images/money.png"
import Image from 'next/image'
import { Arrow } from '@react-vant/icons';
import mainApi from "../api";
import {CoinOrder, CoinOrderCreate, PayResponse} from "../api/samira-service-proxyApi";
import {formatDate, toNonExponential} from "../utils";
import CreateOrderPop from '../components/CreateOrderPop';
const curCount = 20
const Srecord: NextPageWithLayout = () => {
  const [curPage,setCurPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [load, setLoad] = useState(false)
  const [totals, setTotals] = useState(0)
  const [list, setList] = useState<CoinOrder[]>([])
  const [popupData, setPopupData] = useState<CoinOrder | null>(null)
  const [searchLoading,setSearchLoading] = useState(false)
  const getDate = (page?:number) => {
    setLoading(true)
    mainApi.ServicePayApi.listOrder({curPage:page||curPage,curCount,receiverUid:search}).finally(()=>{
      setLoading(false)
      setSearchLoading(false)
    }).then(res=>{
      setTotals(res.totalCount!)
      setList(v => v.concat(res.items||[]))
      setCurPage(v=>(page ?? v) + 1)
    })
  }
  useEffect(getDate,[])
  useEffect(()=>{
    setLoad(true)
  },[])
  const searchFun = ()=>{
    setSearchLoading(true)
    setList([])
    getDate(1)
  }
  console.log(list);

  return (
    <div className="p-[12px_16px_0px]">
      <Input
        className="!text-[14px] [border:1px_solid_#1EA68A] bg-[#F9F9FC] h-[50px] pl-[16px] rounded-[3px] mb-[12px] [&>input]:!text-[rgba(51,51,64,0.88)] !items-stretch [&>input]:self-center [&>input::placeholder]:text-[14px] [&>input::placeholder]:text-[rgba(61,61,89,0.18)]"
        value={search}
        onChange={str => setSearch(str)}
        suffix={
          <Button loading={searchLoading} onClick={searchFun} className="!bg-[#1EA68A] !rounded-[3px] !h-[50px] translate-x-[1px] label-3-semi-bold !px-[10px] !text-[#ffffff] !border-none">Cari</Button>
        }
        placeholder='Silakan Masukkan ID'
      />
      <table className="w-full">
        <thead>
          <tr className="flex items-center h-[40px] mb-[10px] label-3-semi-bold text-[rgba(71,71,101,0.55)]">
            <th className="flex-[.7]">ID</th>
            <th className="flex-1 flex justify-center">Barang</th>
            <th className="flex-1">Waku</th>
          </tr>
        </thead>
      </table>
      <div className="h-[calc(var(--pop-height)_-_234px)] overflow-y-auto pb-[16px]">
        <table className="w-full">
          <tbody className="text-[rgba(51,51,64,0.88)]">
            {
              list.length>0?list.map((item, idx) => (
                <tr key={idx} className={`whitespace-nowrap flex items-center h-[40px] mb-[10px] label-4-regular ${[5,7].includes(item.state) ? '' : 'text-[rgba(58,58,89,0.33)]'}`} onClick={() => setPopupData(item)}>
                  <td className="flex-[.7]">{item.receiverUid}</td>
                  <td className="flex-1 flex justify-center items-center">
                    <Image alt="" src={money} width={18} height={18} />
                    <span className={`ml-[4px] ${[5,7].includes(item.state) ? 'text-[#1EA68A]' : 'text-[rgba(58,58,89,0.33)]'} label-4-bold`}>{toNonExponential(item.price||0)}</span>
                  </td>
                  <td className="flex-1 flex justify-end items-center mr-1">
                    {formatDate(item.createTime!, 'DD/MM HH:mm:ss')}
                    <Arrow width={14} height={14} />
                  </td>
                </tr>
              )):load?<Empty className={'whitespace-nowrap'} description="Sudah tak terhitung jumlahnya" />:null
            }
          </tbody>
        </table>
        <div className="w-[70px] h-[18px] [border:1px_solid_#22BB9C] rounded-[20px] relative mx-auto">
          <div style={{
            width: `${list.length / totals * 100}%`
          }} className="rounded-[20px] h-full bg-[rgba(30,166,138,0.1)] absolute left-0 top-0"></div>
          <p className="relative label-4-regular leading-[18px] text-center text-[rgba(71,71,101,0.55)]">{list.length}/{totals}</p>
        </div>
        <div className="text-center mt-[10px] text-[12px] text-[rgba(58,58,89,0.33)]">
          {
            list.length >= totals
              ? <span>Tidak ada lagi</span>
              : loading
                ? <span>memuat...</span>
                : <Button onClick={()=>getDate()} className="!bg-[#EDEDF1] !rounded-[4px] !h-[28px] translate-x-[1px] label-4-regular !px-[30px] !text-[12px] !text-[rgba(58,58,89,0.33)] !border-none">Lebih</Button>
          }
        </div>
      </div>
      <CreateOrderPop good={!!popupData} close={() => setPopupData(null)} coinOrder={popupData || {}} />
    </div>
  )
}
Srecord.getLayout = function (page: ReactElement) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}
export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Srecord
