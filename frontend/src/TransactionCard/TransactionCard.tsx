import {Transaction} from "../model/model.ts";
import {TableBody, TableCell, TableRow,} from "@mui/material";
import "./TransactionCard.css";

type Props = {
    transaction: Transaction;
    update: () => void;
};


export default function TransactionCard(props: Props) {


    function createData(
        date: string,
        description: string,
        category: string,
        amount: number,
    ) {
        return {date, description, category, amount};
    }

    const rows = [
        createData('Currywurst', props.transaction.description, props.transaction.category, props.transaction.amount,)
    ];


    return (
        <TableBody>
            {rows.map((row) => (
                <TableRow
                    key={row.date}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell component="th" scope="row">{row.date}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">
                        <button className={"button1"} onClick={props.update}>Buchung Ändern</button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}
