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

                {
                    props.transaction.map((transaction) => <TransactionCard  transaction={transaction} update={()=> props.update(transaction.id)} key = {transaction.id}/>)
                }
            </div>
        </>
    )
}