import {Posting} from "../model/model.ts";

type Props={
    posting: Posting,
    }
export default function PostingCard(props: Props){



    return(
        <>

            <label> Beschreibung: {props.posting.description}</label>
            <label> Betrag: {props.posting.amount}</label>
            <label> Kategorie: (Income/Expense): {props.posting.category}</label>
        </>
    )
}