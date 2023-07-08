import {Transaction} from "../model/model.ts";
import TransactionCard from "../TransactionCard/TransactionCard.tsx";
import "./TransactionCollection.css";

type Props = {
    transaction: Transaction[]
    update: (transactionId: string) => void,
}

export default function TransactionCollection(props: Props) {
    return (
        <>
            <div className={"transactionCollectionContainer"}>
                <h2>Buchungsliste</h2>
                {
                    props.transaction.map((transaction) => <TransactionCard
                        transaction={transaction}
                        key={transaction.id}
                        update={() => props.update(transaction.id)}/>)
                }
            </div>
        </>
    )
}