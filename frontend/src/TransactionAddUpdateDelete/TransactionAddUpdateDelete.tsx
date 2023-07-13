import React, {ChangeEvent, FormEvent} from "react";
import "./TransactionAddUpdateDelete.css"
import { FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";


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
                <div className={"row"}>


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
                            inputProps={{ step: '0.5' }}
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
                    <button>Speichern</button>
                    <button onClick={props.cancel}>Abbrechen</button>
                    {props.visibilityDeleteButton && (
                        <button onClick={props.delete}>Löschen</button>
                    )}
                </div>
            </form>


        </>

    )
}