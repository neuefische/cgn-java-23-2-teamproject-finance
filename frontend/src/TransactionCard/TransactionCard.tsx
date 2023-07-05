import {Transaction} from "../model/model.ts";

type Props = {
    transaction: Transaction,
    update: () => void,
}
export default function TransactionCard(props: Props) {


    return (
        <>
            <h3> Beschreibung: {props.transaction.description}</h3>
            <p> Betrag: {props.transaction.amount}</p>
            <p> Kategorie: (Income/Expense): {props.transaction.category}</p>
            <button onClick={props.update}>Bearbeiten</button>



        </>
    )
}