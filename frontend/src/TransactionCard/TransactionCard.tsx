import { Transaction } from "../model/model.ts";
import { Box, Typography } from "@mui/material";
import "./TransactionCard.css";

type Props = {
    transaction: Transaction;
    update: () => void;
};

export default function TransactionCard(props: Props) {
    return (

        <fieldset className={"transactionFieldset"}>
            <legend>DATUM</legend>
            <Box className="transactionCard">

            <div className="row">
                <Typography className="label">Beschreibung:</Typography>
                <Typography className="value">{props.transaction.description}</Typography>
            </div>
            <div className="row">
                <Typography className="label">Betrag:</Typography>
                <Typography className="value">{props.transaction.amount}</Typography>
            </div>
            <div className="row">
                <Typography className="label">Kategorie (Income/Expense):</Typography>
                <Typography className="value">{props.transaction.category}</Typography>
            </div>
            <button className="button" onClick={props.update}>
                Bearbeiten
            </button>

        </Box>
        </fieldset>
    );
}
