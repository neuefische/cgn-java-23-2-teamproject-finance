import {Transaction} from "../model/model.ts";
import TransactionCard from "../TransactionCard/TransactionCard.tsx";

type Props={
    transaction: Transaction[]
}

export default function TransactionCollection(props: Props){
    return(
        <>
            <h2>Buchungsliste</h2>
            {
                props.transaction.map((post )=><TransactionCard transaction={post} key={post.id}/>)
            }
        </>
    )
}