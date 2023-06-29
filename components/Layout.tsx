import React, {ReactNode} from "react";
// @ts-ignore
import logo from '@/assets/images/logo.png'
// @ts-ignore
import Service from '@/assets/svgs/service.svg'
// @ts-ignore
import Logout from '@/assets/svgs/logout.svg'
// @ts-ignore
import Home from '@/assets/svgs/home.svg'
// @ts-ignore
import TimeCircle from '@/assets/svgs/timeCircle.svg'
// @ts-ignore
import Document from '@/assets/svgs/document.svg'
// @ts-ignore
import Ranking from '@/assets/svgs/ranking.svg'
import CustomNavBar from './NavBar'



const Layout = (props: { children: ReactNode }) => {
    const {children} = props
    return (
        <main>
            <CustomNavBar/>
            {children}
        </main>
    )
}
export default Layout
