import React, {ChangeEvent, FormEvent} from "react";
import "./TransactionAddUpdateDelete.css"
import {Box, TextField} from "@mui/material";


type Props = {
    submit: (event: FormEvent<HTMLFormElement>) => void,
    setDescription: (event: string) => void,
    setAmount: (number: number) => void,
    description: string,
    amount: number | null,
    setCategory: (event: "INCOME" | "EXPENSE") => void,
    category: "INCOME" | "EXPENSE",
    cancel: () => void,
    delete: (event: React.MouseEvent<HTMLButtonElement>) => void,
    visibilityDeleteButton: boolean,
}

export default function TransactionAddUpdateDelete(props: Props) {


    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setCategory(event.target.value as "INCOME" | "EXPENSE");
    };


    return (
        <>
            <form onSubmit={props.submit}>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >

                    <TextField
                        type="text"
                        required
                        id="outlined-required"
                        label="Beschreibung"
                        value={props.description}
                        onChange={event => props.setDescription(event.target.value)}
                    />

                    <TextField
                        type="number"
                        required
                        id="outlined-required"
                        label="Betrag"
                        value={props.amount}
                        onChange={event => props.setAmount(parseInt(event.target.value))}
                    />
                </Box>

                {/*<input type={"text"} onChange={event => props.setDescription(event.target.value)}*/}
                {/*       value={props.description} placeholder={"Beschreibung"}/>*/}
                {/*<input type={"number"} onChange={event => props.setAmount(parseInt(event.target.value))}*/}
                {/*       value={props.amount} placeholder={"Betrag"}/>*/}

                <input
                    type="radio"
                    value="INCOME"
                    checked={props.category === 'INCOME'}
                    onChange={handleCategoryChange}
                />INCOME
                <input
                    type="radio"
                    value="EXPENSE"
                    checked={props.category === 'EXPENSE'}
                    onChange={handleCategoryChange}
                />EXPENSE


                <button>Speichern</button>
                <button onClick={props.cancel}>Abbrechen</button>
                {props.visibilityDeleteButton && (
                    <button onClick={props.delete}>Löschen</button>
                )}
            </form>


        </>

    )
}