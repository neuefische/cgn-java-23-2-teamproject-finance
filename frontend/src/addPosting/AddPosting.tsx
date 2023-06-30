import {FormEvent, useState} from "react";
import axios from "axios";


export default function AddPosting(){

    const[description, setDescription]= useState<string>("")
    const[amount, setAmount] = useState<number>()

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        axios.post(
            "/api/finance/",{
                "description": description,
                "amount": amount
            }
        ).then(response =>{
            console.log(response.data)
        }).catch(console.error)
        setAmount(0)
        setDescription("")

    }
    return(
        <>
            <form onSubmit={handleSubmit}>


                <input type={"text"} onChange={event => setDescription(event.target.value)} value={description} placeholder={"description"}/>
                <input type={"number"} onChange={event => setAmount(parseInt(event.target.value))} value={amount} placeholder={"amount"}/>
                <button>Add Posting</button>



            </form>


        </>

    )
}