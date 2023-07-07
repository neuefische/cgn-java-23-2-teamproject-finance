import React, {ChangeEvent, FormEvent} from "react";
import "./TransactionAddUpdateDelete.css"


type Props = {
    submit: (event: FormEvent<HTMLFormElement>) => void,
    setDescription: (event: string) => void,
    setAmount: (number: number) => void,
    description: string,
    amount: number,
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


                <input type={"text"} onChange={event => props.setDescription(event.target.value)}
                       value={props.description} placeholder={"Beschreibung"}/>
                <input type={"number"} onChange={event => props.setAmount(parseInt(event.target.value))}
                       value={props.amount} placeholder={"Betrag"}/>

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
                {props.visibilityDeleteButton&& (
                <button onClick={props.delete}>Löschen</button>
                    )}
            </form>


        </>

    )
}