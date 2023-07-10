import TransactionAddUpdateDelete from "./TransactionAddUpdateDelete/TransactionAddUpdateDelete.tsx";
import React, {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {Transaction} from "./model/model.ts";
import TransactionCollection from "./TransactionCollection/TransactionCollection.tsx";

import ReactModal from "react-modal";


export default function App() {


    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number | null>(null);
    const [category, setCategory] = useState<"INCOME" | "EXPENSE">("INCOME");
    const [id, setId] = useState<string>("")
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [deleteButtonVisibility, setDeleteButtonVisibility] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState<string>("")
    const [selectedAmount, setSelectedAmount] = useState<number>(0)
    const [selectedCategory, setSelectedCategory] = useState<"INCOME" | "EXPENSE">("INCOME")
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

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
            .then(closeModalAdd)
    }

    function initializeUpdateComponent(transactionId: string) {

        const selectedTransaction: Transaction | undefined = transactions.find(item => item.id === transactionId)

        if (selectedTransaction !== undefined) {
            setSelectedDescription(selectedTransaction.description)
            setSelectedAmount(selectedTransaction.amount)
            setSelectedCategory(selectedTransaction.category)
            setId(selectedTransaction.id)
            setDeleteButtonVisibility(true);
        } else {
            throw DOMException
        }

        setIsModalUpdateOpen(true)
        openModalUpdate()

    }


    function handleUpdate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.put(
            "/api/finance/" + id, {
                "description": selectedDescription,
                "amount": selectedAmount,
                "category": selectedCategory
            } as Transaction).then(() => {
                setId("")
                setSelectedAmount(0)
                setSelectedDescription("")
                setSelectedCategory("INCOME")
                setDeleteButtonVisibility(false)
            }
        ).then(() => loadTransactions())
            .then(closeModalUpdate)

    }

    function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        axios.delete(
            "/api/finance/" + id,
        ).then(() => {
                setId("")
                setSelectedAmount(0)
                setSelectedDescription("")
                setSelectedCategory("INCOME")
                setDeleteButtonVisibility(false)
            }
        ).then(() => loadTransactions())
            .then(closeModalUpdate)

    }

    function openModalAdd() {
        setIsModalAddOpen(true);
    }

    function closeModalAdd() {
        setIsModalAddOpen(false);
        setDescription("")
        setAmount(0)
        setCategory("INCOME")
    }

    function openModalUpdate() {
        setIsModalUpdateOpen(true)
    }

    function closeModalUpdate() {
        setIsModalUpdateOpen(false)
        setSelectedDescription("")
        setSelectedAmount(0)
        setSelectedCategory("INCOME")
        setDeleteButtonVisibility(false);

    }


    return (

        <body>
        <h1>Finanzen virtuelles Tierheim</h1>

        <TransactionCollection transaction={transactions} update={initializeUpdateComponent}/>
        <button className={"buttonAdd"} onClick={openModalAdd}>Buchung Anlegen</button>


        <ReactModal
            isOpen={isModalAddOpen}
            onRequestClose={closeModalAdd}
            className="modal"
            overlayClassName="overlay"
        >
            <TransactionAddUpdateDelete submit={handleSubmit}
                                        setAmount={setAmount}
                                        setDescription={setDescription}
                                        amount={amount}
                                        description={description}
                                        category={category}
                                        setCategory={setCategory}
                                        cancel={closeModalAdd}
                                        visibilityDeleteButton={deleteButtonVisibility}
                                        delete={handleDelete}
            /></ReactModal>


        <ReactModal
            isOpen={isModalUpdateOpen}
            onRequestClose={closeModalUpdate}
            className="modal"
            overlayClassName="overlay"
        >
            <TransactionAddUpdateDelete
                submit={handleUpdate}
                setDescription={setSelectedDescription}
                setAmount={setSelectedAmount}
                description={selectedDescription}
                amount={selectedAmount}
                setCategory={setSelectedCategory}
                category={selectedCategory}
                cancel={closeModalUpdate}
                visibilityDeleteButton={deleteButtonVisibility}
                delete={handleDelete}
            /></ReactModal>

        </body>


    )
}


