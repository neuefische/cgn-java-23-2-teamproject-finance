import {Navigate, Outlet} from "react-router-dom";

type Props = {
    user?: string
}

export default function ProtectedRoutes(props: Props) {

    const isLoggedIn = props.user !== "anonymousUser";

    if (props.user === undefined) return "loading ...";


    return (


        isLoggedIn ? <Outlet/> : <Navigate to="/login"/>


    )
}
