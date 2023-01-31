// @ts-ignore
import Eye from '@/assets/svgs/eye.svg'
import {CoinOrderBulletin} from "../api/samira-service-proxyApi";
import React, {useEffect, useState} from "react";
import {ConfigProvider, NoticeBar} from "react-vant";
import { toNonExponential } from '../utils/index';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/id'

dayjs.extend(relativeTime).locale('id')

const Notice = (props: { bulletin: CoinOrderBulletin[] }) => {
    const {bulletin} = props
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
    },[])
    return (<div
        className={'notice overflow-hidden items-center flex w-full rounded-[8px] bg-white border-solid border-[1px] border-[#353F4E12]'}>
        {loading&&<NoticeBar background={'#fff'} rightIcon={<Eye fill={'#1EA68A'} className={'ml-1'}/>} className={'flex-1'} scrollable text={ <div className={'h-full flex items-center [&>div]:mr-6 '}>
                {bulletin.map((it, index) => (
                    <div key={index} className={'!text-[#333340] items-center label-4-regular flex [&>span]:whitespace-nowrap'}>
                        <span>{it.username} Debeli </span><span
                        className={'label-3-regular mx-2 text-[#FFB800]'}>Rp {toNonExponential(it.income ?? 0)}</span><span>{dayjs((it.createTime ?? 0) * 1000).fromNow()}</span>
                    </div>
                ))}
            </div>} />}
    </div>)
}
export default Notice
