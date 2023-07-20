import {FormEvent, useState} from "react";


type Props = {
    login: (username: string, password: string) => void

}

export default function LoginPage(props: Props){

    const[username,setUsername]=useState<string>("")
    const[password,setPassword]=useState<string>("")

    function onLogin(event: FormEvent){
        event.preventDefault()
        props.login(username, password)

    }


    return(
        <form onSubmit={onLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <input value={username} onChange={event => setUsername(event.target.value)} placeholder="Username" style={{margin: '10px'}}/>
            <input value={password} onChange={event => setPassword(event.target.value)} placeholder="Password" type={"password"}/>
            <button style={{margin: '10px'}}>Login</button>
        </form>
    )
}