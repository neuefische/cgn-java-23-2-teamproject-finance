import AddTransaction from "./addTransaction/AddTransaction.tsx";
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {Transaction} from "./model/model.ts";
import TransactionCollection from "./TransactionCollection/TransactionCollection.tsx";


export default function App() {


    const [description, setDescription] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [category, setCategory] = useState<"INCOME" | "EXPENSE">("INCOME");
    const [transaction,setTransaction] = useState<Transaction[]>([])

    function loadTransactions(){
        axios.get(
            "/api/finance/")
            .then(response=>{setTransaction(response.data)})
            .catch(console.error)
    }
    useEffect(loadTransactions,[])
    useEffect(loadTransactions,[transaction])
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

            <TransactionCollection transaction={transaction}/>
            <AddTransaction submit={handleSubmit} setAmount={setAmount} setDescription={setDescription} amount={amount}
                            description={description} category={category} setCategory={setCategory}/>




        </>

    )
}


