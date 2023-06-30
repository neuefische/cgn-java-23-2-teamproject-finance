import AddPosting from "./addPosting/AddPosting.tsx";
import {FormEvent, useState} from "react";
import axios from "axios";


export default function App() {


    const [description, setDescription] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [category, setCategory] = useState<"INCOME" | "EXPENSE">("INCOME");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.post(
            "/api/finance/", {
                "description": description,
                "amount": amount,
                "category": category,
            }
        ).then(() => {
                setAmount(0)
                setDescription("")
            setCategory("INCOME")
            }
        ).catch(console.error)

    }


    return (
        <>
            <h1>Finanzen virtuelles Tierheim</h1>


            <AddPosting submit={handleSubmit} setAmount={setAmount} setDescription={setDescription} amount={amount}
                        description={description} category={category} setCategory={setCategory}/>
        </>

    )
}


