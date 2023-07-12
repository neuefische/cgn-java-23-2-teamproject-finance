
type Props= {
    user?: string
}

export default function ProtectedRoutes(props: Props){

    const isAuthenticatd = props.user !== undefined && props.user !== 'anomynousUser'
    
    return(
        isAuthenticatd ? <Outlet/> : <Navigate to ="/login"/>
        
    )
}