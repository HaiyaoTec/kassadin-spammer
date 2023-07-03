import {Button, Empty, Input,Popup,Form,Cell} from 'react-vant';
import Select from 'react-select';
import {NextPageWithLayout} from "./_app";
import React, {ReactElement, useEffect, useState} from "react";
import Layout from "../components/Layout";
// @ts-ignore
import money from "@/assets/images/money.png"
import Image from 'next/image'
import { Arrow } from '@react-vant/icons';
import mainApi from "../api";
import {copyText, formatDate, toNonExponential} from "../utils";
import {SpammerOrder, SpammerOrderResp} from "../api/kassadin-promot-spammer-api";
// @ts-ignore
import Copy from "@/assets/svgs/copy.svg";
const curCount = 20
const Home: NextPageWithLayout = () => {
  const [curPage,setCurPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [load, setLoad] = useState(false)
  const [totals, setTotals] = useState(0)
  const [spammerOrder, setSpammerOrder] = useState<SpammerOrder[]>([])
  const [detailData, setDetailData] = useState<SpammerOrder>({})
  const [searchLoading,setSearchLoading] = useState(false)

  const [detailPop,setDetailPop]=useState(false)

  const getSpammerOrder = (page?:number) => {
    setLoading(true)
    mainApi.SpammerApi.getSpammerOrder({page:page||curPage,count:curCount,uIdOrWa:search}).then((res:SpammerOrderResp)=>{
        setTotals(res.totalCount!)
        setSpammerOrder(v => v.concat(res.items||[]))
        setCurPage(v=>(page ?? v) + 1)
      }).finally(()=>{
        setLoading(false)
        setSearchLoading(false)
      })
  }
  useEffect(()=>{
    getSpammerOrder()
  },[])
  const searchFun = ()=>{
    setSearchLoading(true)
    setSpammerOrder([])
    getSpammerOrder(1)
  }

  //刷新失败订单
  const refreshOrder = ()=>{
    if (detailData.id != null) {
      mainApi.SpammerApi.spammerRefresh(detailData.id).then(res => {
        searchFun()
        setDetailData(res)
      })
    }
  }
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
            <th className="flex-1">UID/WA</th>
            <th className="flex-1">Waku</th>
            <th className="flex-1">Mitra</th>
            <th className="flex-1">Status</th>
          </tr>
        </thead>
      </table>
      <div className="h-[calc(var(--pop-height)_-_234px)] overflow-y-auto pb-[16px]">
        <table className="w-full">
          <tbody className="text-[rgba(51,51,64,0.88)] text-center">
            {
              spammerOrder.length===0? (
                spammerOrder.map(item=>(
                    <tr className={` flex items-center h-[40px] mb-[10px] label-4-regular`}>
                      <td className="flex-1 max-w-[80px] break-all mr-2"><span>{item.uId}/{item.wathsApp}</span></td>
                      <td className="flex-1">
                        {formatDate(item.checkTime!, 'DD/MM HH:mm:ss')}
                      </td>
                      <td className="flex-1">{item.memberName}</td>
                      <td className={'justify-center flex-1 flex items-center'} onClick={()=>{
                        if(item.status===1) return
                        setDetailData(item)
                        setDetailPop(true)
                      }}>
                        <span>{item.status===0?'Pending':'Selesai'}</span>
                        {item.status===0&&<Arrow width={14} height={14}/>}
                      </td>
                    </tr>
                ))
              ):load?<Empty className={'whitespace-nowrap'} description="Sudah tak terhitung jumlahnya" />:null
            }
          </tbody>
        </table>
        <div className="w-[70px] h-[18px] [border:1px_solid_#22BB9C] rounded-[20px] relative mx-auto">
          <div style={{
            width: `${spammerOrder.length / totals * 100}%`
          }} className="rounded-[20px] h-full bg-[rgba(30,166,138,0.1)] absolute left-0 top-0"></div>
          <p className="relative label-4-regular leading-[18px] text-center text-[rgba(71,71,101,0.55)]">{spammerOrder.length}/{totals}</p>
        </div>
        <div className="text-center mt-[10px] text-[12px] text-[rgba(58,58,89,0.33)]">
          {
            spammerOrder.length >= totals
              ? <span>Tidak ada lagi</span>
              : loading
                ? <span>memuat...</span>
                : <Button onClick={()=>getSpammerOrder()} className="!bg-[#EDEDF1] !rounded-[4px] !h-[28px] translate-x-[1px] label-4-regular !px-[30px] !text-[12px] !text-[rgba(58,58,89,0.33)] !border-none">Lebih</Button>
          }
        </div>
        {/*<Select options={options} />*/}
      </div>

      <Popup visible={detailPop}
             closeable
             style={{ padding: '16px 16px 32px ' }}
             position='bottom'
             round onClose={()=>setDetailPop(false)}>
        <h3 className={'py-4 text-center label-3-semi-bold-bold text-[#1EA68A]'}>Detail</h3>
        <div>
          <Cell title={'WA'} titleClass={'text-[#969799]'}>
            <div className={'flex justify-end items-center text-[#323232]'} onClick={()=>copyText(detailData.wathsApp)}>
              <span className={'mr-2'}>{detailData.wathsApp}</span>
              <Copy/>
            </div>
          </Cell>
          <Cell title={'UID'} titleClass={'text-[#969799]'}>
            <div className={'flex justify-end items-center text-[#323232]'} onClick={()=>copyText(detailData.uId)}>
              <span className={'mr-2 '}>{detailData.uId}</span>
              <Copy/>
            </div>
          </Cell>
          <Cell title={'24H Deposit(Tertinggl)'} titleClass={'text-[#969799]'} center>
            <span className={'text-[#1EA68A]'}>{detailData.depositAmount}</span>
          </Cell>
          <Cell title={'Mitra'} titleClass={'text-[#969799]'} >
            <span className={'text-[#323232]'}>{detailData.memberName}</span>
          </Cell>
          <Cell title={'Alasan'} titleClass={'text-[#969799]'}>
            <span className={'text-[#323232]'}>Tidak ada Deposit</span>
          </Cell>
        </div>
        <Button className={'!bg-[#1EA68A] !rounded-[4px] !border-none !mt-[16px]'} type='primary' block onClick={refreshOrder}>Mencoba kembali</Button>
      </Popup>
    </div>
  )
}
Home.getLayout = function (page: ReactElement) {
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

export default Home
