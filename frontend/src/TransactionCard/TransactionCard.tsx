import {Transaction} from "../model/model.ts";

type Props={
    transaction: Transaction,
    }
export default function TransactionCard(props: Props){



    return(
        <>

            <label> Beschreibung: {props.transaction.description}</label>
            <label> Betrag: {props.transaction.amount}</label>
            <label> Kategorie: (Income/Expense): {props.transaction.category}</label>
        </>
    )
}