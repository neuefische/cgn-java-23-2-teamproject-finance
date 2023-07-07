import TransactionAddUpdateDelete from "./TransactionAddUpdateDelete/TransactionAddUpdateDelete.tsx";
import React, {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {Transaction} from "./model/model.ts";
import TransactionCollection from "./TransactionCollection/TransactionCollection.tsx";



export default function App() {


    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState<"INCOME" | "EXPENSE">("INCOME");
    const [id, setId] = useState<string>("")
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [updateTransactionVisibility, setUpdateTransactionVisibility] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState<string>("")
    const [selectedAmount, setSelectedAmount] = useState<number>(0)
    const [selectedCategory, setSelectedCategory] = useState<"INCOME"|"EXPENSE">("INCOME")


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
            setSelectedDescription(selectedTransaction.description)
            setSelectedAmount(selectedTransaction.amount)
            setSelectedCategory(selectedTransaction.category)
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
                "description": selectedDescription,
                "amount": selectedAmount,
                "category": selectedCategory
            } as Transaction).then(() => {
                setId("")
                setSelectedAmount(0)
                setSelectedDescription("")
                setSelectedCategory("INCOME")
                setUpdateTransactionVisibility(false)
            }
        ).then (()=>loadTransactions())

    }

    function handleDelete(event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault()
        axios.delete(
            "api/finance/"+id,
        ).then(() => {
                setId("")
                setSelectedAmount(0)
                setSelectedDescription("")
                setSelectedCategory("INCOME")
                setUpdateTransactionVisibility(false)
            }
        ).then (()=>loadTransactions())

    }


    return (
        <>
            <h1>Finanzen virtuelles Tierheim</h1>

          <TransactionCollection transaction={transactions} update={initializeUpdateComponent}/>



            <TransactionAddUpdateDelete submit={handleSubmit}
                                        setAmount={setAmount}
                                        setDescription={setDescription}
                                        amount={amount}
                                        description={description}
                                        category={category}
                                        setCategory={setCategory}
                                        cancel={cancelUpdateComponent}
                                        visibilityDeleteButton={updateTransactionVisibility}
                                        delete={handleDelete}
            />

            {updateTransactionVisibility && (
                <TransactionAddUpdateDelete
                    submit={handleUpdate}
                    setDescription={setSelectedDescription}
                    setAmount={setSelectedAmount}
                    description={selectedDescription}
                    amount={selectedAmount}
                    setCategory={setSelectedCategory}
                    category={selectedCategory}
                    cancel={cancelUpdateComponent}
                    visibilityDeleteButton={updateTransactionVisibility}
                    delete={handleDelete}
                />
            )}


        </>

    )
}


