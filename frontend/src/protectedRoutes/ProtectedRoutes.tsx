import {Navigate, Outlet} from "react-router-dom";

type Props= {
    user?: string
}

export default function ProtectedRoutes(props: Props){

    const isAuthenticatd = props.user !== undefined && props.user !== 'anonymousUser'
    
    return(
        isAuthenticatd ? <Outlet/> : <Navigate to ="/login"/>
        
    )
}