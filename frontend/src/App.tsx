import AddPosting from "./addPosting/AddPosting.tsx";
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {Posting} from "./model/model.ts";
import PostingCollection from "./PostingCollection/PostingCollection.tsx";


export default function App() {


    const [description, setDescription] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [category, setCategory] = useState<"INCOME" | "EXPENSE">("INCOME");
    const [postings,setPostings] = useState<Posting[]>([])

    function loadPostings(){
        axios.get(
            "/api/finance/")
            .then(response=>{setPostings(response.data)})
            .catch(console.error)
    }
    useEffect(loadPostings,[])
    useEffect(loadPostings,[postings])
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

            <PostingCollection postings={postings}/>
            <AddPosting submit={handleSubmit} setAmount={setAmount} setDescription={setDescription} amount={amount}
                        description={description} category={category} setCategory={setCategory}/>




        </>

    )
}


