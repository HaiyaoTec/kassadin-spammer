// @ts-ignore
import Eye from '@/assets/svgs/eye.svg'
import {CoinOrderBulletin} from "../api/samira-service-proxyApi";

const Notice = (props: { bulletin: CoinOrderBulletin[] }) => {
    const {bulletin} = props
    return (<div
        className={'items-center flex label-4-regular w-full py-[7px] px-3 rounded-[8px] bg-white border-solid border-[1px] border-[#353F4E12]'}>
        <marquee>
        <div className={'overflow-hidden h-full flex items-center [&>div]:mr-6 flex-1 mr-2'}>
                {bulletin.map((it, index) => (
                    <div key={index} className={'items-center flex [&>span]:whitespace-nowrap'}>
                        <span>{it.username}</span><span
                        className={'label-3-regular mx-2 text-[#FFB800]'}>Rp {it.income}</span><span>{it.createTime}</span>
                    </div>
                ))}
            </div>
        </marquee>
        <Eye fill={'#1EA68A'} className={'ml-auto'}/>
    </div>)
}
export default Notice
