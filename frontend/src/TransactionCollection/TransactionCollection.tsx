import {Transaction} from "../model/model.ts";
import TransactionCard from "../TransactionCard/TransactionCard.tsx";
import "./TransactionCollection.css";
import {Paper, Table, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

type Props = {
    transaction: Transaction[]
    update: (transactionId: string) => void,
}

export default function TransactionCollection(props: Props) {
    return (
        <>
            <div className={"transactionCollectionContainer"}>
                <h2>Buchungsliste</h2>
                <TableContainer
                    sx={{backgroundColor: '#1c98a3', borderRadius: '10px', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'}}
                    component={Paper}>
                    <Table sx={{minWidth: 650,}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}}>Datum</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}} align="right">Beschreibung</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}} align="right">Kategorie</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}} align="right">Betrag</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}} align="right">Ändern</TableCell>

                            </TableRow>
                        </TableHead>
                        {
                            props.transaction.map((transaction) => <TransactionCard
                                transaction={transaction}
                                key={transaction.id}
                                update={() => props.update(transaction.id)}/>)
                        }
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}