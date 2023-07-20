import React, {ChangeEvent, FormEvent, useState} from "react";
import "./TransactionAddUpdateDelete.css"
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";
import moment from "moment"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";






type Props = {
    submit: (event: FormEvent<HTMLFormElement>) => void,
    setDescription: (event: string) => void,
    setAmount: (number: string) => void,
    description: string,
    amount: string,
    setCategory: (event: "INCOME" | "EXPENSE") => void,
    category: "INCOME" | "EXPENSE",
    date: string | null,
    setDate: (event: string | null) => void,
    cancel: () => void,
    delete: (event: React.MouseEvent<HTMLButtonElement>) => void,
    visibilityDeleteButton: boolean,

}

export default function TransactionAddUpdateDelete(props: Props) {

    const [descriptionIsError, setDescriptionIsError] = useState(false)
    const [amountIsError, setAmountIsError] = useState(false)
    const [saveButtonError, setSaveButtonError] = useState(true)


    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setCategory(event.target.value as "INCOME" | "EXPENSE");
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setDescription(event.target.value)

        if (event.target.value.length <= 5 && event.target.value.length > 0) {
            setDescriptionIsError(true)
            setSaveButtonError(true)
        } else {
            setDescriptionIsError(false)
            setSaveButtonError(false)
        }
        if (event.target.value.length === 0) {
            setSaveButtonError(true)
        }
    }

  function checkAmount(amount: number){
      if (amount <= 0) {
          setAmountIsError(true)
          setSaveButtonError(true)

      } else {
          setAmountIsError(false)
          setSaveButtonError(false)

      }
      if (amount === undefined) {
          setSaveButtonError(true)
      }
  }

    const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setAmount(event.target.value)

        checkAmount(parseFloat(event.target.value))


    }



    const dateAsDate = moment(props.date).toDate();

    function dateToString(date: Date | null) {
        if (date === null) {
            return null
        }
        props.setDate(moment(date).format("YYYY-MM-DD"))
        checkAmount(parseFloat(props.amount))

    }

    return (
        <>
            <form onSubmit={props.submit}>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Basic date picker"
                                    value={dateAsDate}
                                    onChange={event => dateToString(event)}/>
                    </DemoContainer>
                </LocalizationProvider>

                <div className={"row"}>


                    <TextField
                        error={descriptionIsError}
                        helperText={descriptionIsError && "Die Eingabe entspricht nicht den Vorgaben"} type="text"
                        required
                        id="outlined-required"
                        label="Beschreibung"
                        value={props.description}
                        onChange={handleChangeDescription}
                    />

                    <TextField
                        error={amountIsError}
                        helperText={amountIsError && "Die Eingabe entspricht nicht den Vorgaben"} type="number"

                        required
                        id="outlined-required"
                        label="Betrag"
                        value={props.amount}
                        onChange={handleChangeAmount}
                        inputProps={{step: '0.01'}}
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
                    <button disabled={saveButtonError}>Speichern</button>

                    <button onClick={props.cancel}>Abbrechen</button>
                    {props.visibilityDeleteButton && (
                        <button onClick={props.delete}>Löschen</button>
                    )}
                </div>
            </form>


        </>

    )
}