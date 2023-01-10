import {ReactNode} from "react";

const Layout = (props:{children: ReactNode})=>{
    const {children} = props
    return (
        <main>
            {children}
        </main>
    )
}
export default Layout
