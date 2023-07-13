import React, {ChangeEvent, FormEvent, useState} from "react";
import "./TransactionAddUpdateDelete.css"
import {FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";


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

    const [descriptionIsError, setDescriptionIsError] = useState(false)
    const [amountIsError, setAmountIsError] = useState(false)


    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setCategory(event.target.value as "INCOME" | "EXPENSE");
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setDescription(event.target.value)

        if (event.target.value.length <= 5 && event.target.value.length > 0) {
            setDescriptionIsError(true)
        } else {
            setDescriptionIsError(false)
        }
    }

    const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setAmount(parseInt(event.target.value))

        if (parseInt(event.target.value) <= 0) {
            setAmountIsError(true)
        } else {
            setAmountIsError(false)
        }
    }


    return (
        <>
            <form onSubmit={props.submit}>
                <div className={"row"}>


                    <TextField
                        error={descriptionIsError}
                        helperText={descriptionIsError && "Die Eingabe entspricht nicht den Vorgaben"}
                        type="text"
                        required
                        id="outlined-required"
                        label="Beschreibung"
                        value={props.description}
                        onChange={handleChangeDescription}

                    />

                    <TextField
                        error={amountIsError}
                        helperText={amountIsError && "Die Eingabe entspricht nicht den Vorgaben"}
                        type="number"
                        required
                        id="outlined-required"
                        label="Betrag"
                        value={props.amount}
                        onChange={handleChangeAmount}
                        inputProps={{step: '0.5'}}
                    />

                </div>
                <div className={"row"}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={props.category}
                        onChange={handleCategoryChange}
                    >
                        <FormControlLabel value="INCOME" control={<Radio/>} label="EINNAHME"/>
                        <FormControlLabel value="EXPENSE" control={<Radio/>} label="AUSGABE"/>

                    </RadioGroup>
                </div>
                <div className={"row"}>
                    {!descriptionIsError && (<button>Speichern</button>)}

                    <button onClick={props.cancel}>Abbrechen</button>
                    {props.visibilityDeleteButton && (
                        <button onClick={props.delete}>Löschen</button>
                    )}
                </div>
            </form>


        </>

    )
}