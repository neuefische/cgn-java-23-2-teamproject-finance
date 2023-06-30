import {FormEvent} from "react";


type Props = {
    submit: (event: FormEvent<HTMLFormElement>) => void,
    setDescription: (event: string) => void,
    setAmount: (number: number) => void,
    description: string,
    amount: number,
}

export default function AddPosting(props: Props){



    return(
        <>
            <form onSubmit={props.submit}>


                <input type={"text"} onChange={event => props.setDescription(event.target.value)} value={props.description} placeholder={"description"}/>
                <input type={"number"} onChange={event => props.setAmount(parseInt(event.target.value))} value={props.amount} placeholder={"amount"}/>
                <button>Add Posting</button>



            </form>


        </>

    )
}