import AddTransaction from "./addTransaction/AddTransaction.tsx";
import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {Transaction} from "./model/model.ts";
import TransactionCollection from "./TransactionCollection/TransactionCollection.tsx";
import UpdateTransaction from "./UpdateTransaction/UpdateTransaction.tsx";


export default function App() {


    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<"INCOME" | "EXPENSE">("INCOME");
    const [id, setId] = useState<string>("")
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [updateTransactionVisibility, setUpdateTransactionVisibility] = useState(false);
    //  const [selectedDescription, setSelectedDescription] = useState<string>("")
    //const [selectedAmount, setSelectedAmount] = useState<number>(0)
    //const [selectedCategory, setSelectedCategory] = useState<"INCOME"|"EXEPNSE">()


    function loadTransactions() {
        axios.get(
            "/api/finance/")
            .catch(console.error)
            .then(response => {
                setTransactions(response?.data)
            })

    }

    useEffect(loadTransactions, [])
 

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
            .then(loadTransactions)
    }

    function initializeUpdateComponent(transactionId: string) {

        const selectedTransaction: Transaction | undefined = transactions.find(item => item.id === transactionId)

        if (selectedTransaction !== undefined) {
            setDescription(selectedTransaction.description)
            setAmount(selectedTransaction.amount)
            setCategory(selectedTransaction.category)
            setId(selectedTransaction.id)
            setUpdateTransactionVisibility(true);
        } else {
            throw DOMException
        }


    }

    function cancelUpdateComponent() {
        setUpdateTransactionVisibility(false);
    }

    function handleUpdate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.put(
            "/api/finance/"+id, {
                "description": description,
                "amount": amount,
                "category": category
            } as Transaction).then(() => {
                setId("")
                setAmount(0)
                setDescription("")
                setCategory("INCOME")
                setUpdateTransactionVisibility(false)
            }
        ).then (()=>loadTransactions())

    }


    return (
        <>
            <h1>Finanzen virtuelles Tierheim</h1>

            <TransactionCollection transaction={transactions} update={initializeUpdateComponent}/>
            <AddTransaction submit={handleSubmit} setAmount={setAmount} setDescription={setDescription} amount={amount}
                            description={description} category={category} setCategory={setCategory}/>

            {updateTransactionVisibility && (
                <UpdateTransaction
                    submit={handleUpdate}
                    setDescription={setDescription}
                    setAmount={setAmount}
                    description={description}
                    amount={amount}
                    setCategory={setCategory}
                    category={category}
                    cancel={cancelUpdateComponent}
                />
            )}


        </>

    )
}


