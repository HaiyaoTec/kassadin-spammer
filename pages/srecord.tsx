import { Button, Input } from 'react-vant';
import {NextPageWithLayout} from "./_app";
import React, {ReactElement, useState} from "react";
import Layout from "../components/Layout";
// @ts-ignore
import money from "@/assets/images/money.png"
import Image from 'next/image'
import { toNonExponential } from '../utils';
import { formatDate } from '../utils/index';
import { Arrow } from '@react-vant/icons';

const Srecord: NextPageWithLayout = () => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [totals, setTotals] = useState(20)
  const [list, setList] = useState([
    {
      id: 'DW3241S24023',
      barang: 2000000,
      time: +new Date('2023-1-11'),
    },
    {
      id: 'DW3241S24023',
      barang: 2000000,
      time: +new Date('2023-1-11'),
    },
    {
      id: 'DW3241S24023',
      barang: 2000000,
      time: +new Date('2023-1-11'),
    },
    {
      id: 'DW3241S24023',
      barang: 2000000,
      time: +new Date('2023-1-11'),
    },
    {
      id: 'DW3241S24023',
      barang: 2000000,
      time: +new Date('2023-1-11'),
    },
  ])
  const getDate = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setList(v => [...v, ...v.slice(0, 5)])
    }, 500);
  }
  return (
    <div className="p-[12px_16px_0px]">
      <Input
        className="!text-[14px] [border:1px_solid_#1EA68A] bg-[#F9F9FC] h-[50px] pl-[16px] rounded-[3px] mb-[12px] [&>input]:!text-[rgba(51,51,64,0.88)] !items-stretch [&>input]:self-center [&>input::placeholder]:text-[14px] [&>input::placeholder]:text-[rgba(61,61,89,0.18)]"
        value={search}
        onChange={str => setSearch(str)}
        suffix={
          <Button className="!bg-[#1EA68A] !rounded-[3px] !h-[50px] translate-x-[1px] label-3-semi-bold !px-[10px] !text-[#ffffff] !border-none">Cari</Button>
        }
        placeholder='Silakan Masukkan ID'
      />
      <table className="w-full">
        <thead>
          <tr className="flex items-center h-[40px] mb-[10px] label-3-semi-bold text-[rgba(71,71,101,0.55)]">
            <th className="flex-1">ID</th>
            <th className="flex-1 flex justify-center">Barang</th>
            <th className="flex-1">Waku</th>
          </tr>
        </thead>
      </table>
      <div className="h-[calc(var(--pop-height)_-_234px)] overflow-y-auto pb-[16px]">
        <table className="w-full">
          <tbody className="text-[rgba(51,51,64,0.88)]">
            {
              list.map((item, idx) => (
                <tr key={idx} className="whitespace-nowrap flex items-center h-[40px] mb-[10px] label-4-regular">
                  <td className="flex-1">{item.id}</td>
                  <td className="flex-1 flex justify-center items-center">
                    <Image alt="" src={money} width={18} height={18} />
                    <span className="ml-[4px] text-[#1EA68A] label-4-bold">{toNonExponential(item.barang)}</span>
                  </td>
                  <td className="flex-1 flex justify-end items-center">
                    {formatDate(item.time, 'DD/MM/YYYY HH:mm:ss')}
                    <Arrow width={14} height={14} />
                  </td>
                </tr>
              ))
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
              ? <span>No More</span>
              : loading
                ? <span>Loading...</span>
                : <Button onClick={getDate} className="!bg-[#EDEDF1] !rounded-[4px] !h-[28px] translate-x-[1px] label-4-regular !px-[30px] !text-[12px] !text-[rgba(58,58,89,0.33)] !border-none">Lebih</Button>
          }
        </div>
      </div>
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
