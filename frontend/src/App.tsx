import TransactionAddUpdateDelete from "./TransactionAddUpdateDelete/TransactionAddUpdateDelete.tsx";
import React, {FormEvent, useEffect, useState} from "react";
import {Transaction} from "./model/model.ts";
import TransactionCollection from "./TransactionCollection/TransactionCollection.tsx";
import ReactModal from "react-modal";
import LoginPage from "./LoginPage/LoginPage.tsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes.tsx";
import {IconButton} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import './App.css';
import axios from "axios";
import LogoutIcon from '@mui/icons-material/Logout';
import * as dayjs from "dayjs";

export default function App() {


    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState<"INCOME" | "EXPENSE">("INCOME");
    const [id, setId] = useState<string>("")
    const [date, setDate] = useState<string | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [deleteButtonVisibility, setDeleteButtonVisibility] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState<string>("")
    const [selectedAmount, setSelectedAmount] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<"INCOME" | "EXPENSE">("INCOME")
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [user, setUser] = useState<string>()
    const navigate = useNavigate()


    function loadTransactions() {
        axios.get(
            "/api/finance/")
            .catch(console.error)
            .then(response => {
                setTransactions(response?.data)
            })

    }

    useEffect(() => {
        loadTransactions()
        me()
    }, [])


    if (!transactions) {
        return "Lade..."
    }


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        axios.post(
            "/api/finance/", {
                "description": description,
                "amount": amount,
                "category": category,
                "date": date
            }
        ).then(() => {
                setAmount("")
                setDescription("")
                setCategory("INCOME")
                setDate(null)
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
            setDate(selectedTransaction.date)
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
                "category": selectedCategory,
                "date": date
            } as Transaction).then(() => {
                setId("")
                setSelectedAmount("")
                setSelectedDescription("")
                setSelectedCategory("INCOME")
                setDate(null)
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
                setSelectedAmount("")
                setSelectedDescription("")
                setSelectedCategory("INCOME")
                setDate(null)
                setDeleteButtonVisibility(false)
            }
        ).then(() => loadTransactions())
            .then(closeModalUpdate)

    }

    function login(username: string, password: string) {
        axios.post("/api/users/login", null, {auth: {username, password}})
            .then((response) => {
                setUser(response.data)
                setDate(dayjs().format())
                navigate("/")
            })


    }

    function logout() {
        axios.post("/api/users/logout")
            .catch(console.error)
            .then(() => {
                setUser("anonymousUser")
            })

    }

    function me() {
        axios.get("/api/users/me2")
            .then(response => {
                setUser(response.data)
                navigate("/")

            })
    }

    function openModalAdd() {
        setIsModalAddOpen(true);
        setDate(dayjs().format())
    }

    function closeModalAdd() {
        setIsModalAddOpen(false);
        setDescription("")
        setAmount("")
        setCategory("INCOME")
        setDate(dayjs().format())
    }

    function openModalUpdate() {
        setIsModalUpdateOpen(true)
    }

    function closeModalUpdate() {
        setIsModalUpdateOpen(false)
        setSelectedDescription("")
        setSelectedAmount("")
        setSelectedCategory("INCOME")
        setDate(dayjs().format())
        setDeleteButtonVisibility(false);

    }


    return (

        <>
            <div>
                <h1>Finanzen virtuelles Tierheim</h1>

            </div>

            <Routes>
                <Route element={<ProtectedRoutes user={user}/>}>

                    <Route path="/" element={<div>
                        <p>{user}</p>
                        <IconButton disableRipple={true} size="small" className={"buttonAdd"}
                                    onClick={logout}><LogoutIcon/></IconButton>
                        <TransactionCollection transaction={transactions} update={initializeUpdateComponent}/>
                        <IconButton disableRipple={true} size="small" className={"buttonAdd"}
                                    onClick={openModalAdd}><AddCircle
                            fontSize={"large"}/></IconButton>


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
                                                        date={date}
                                                        setDate={setDate}
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
                                date={date}
                                setDate={setDate}
                                cancel={closeModalUpdate}
                                visibilityDeleteButton={deleteButtonVisibility}
                                delete={handleDelete}
                            /></ReactModal></div>}/>

                </Route>


                <Route path="/login" element={<LoginPage login={login}/>}/>
            </Routes>

        </>


    )
}