import {Transaction} from "../model/model.ts";
import {IconButton, TableBody, TableCell, TableRow,} from "@mui/material";
import "./TransactionCard.css";
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


type Props = {
    transaction: Transaction;
    update: () => void;
};


export default function TransactionCard(props: Props) {


    function createData(
        date: string,
        description: string,
        category: string,
        amount: string,
    ) {

        let categoryGerman;
        if (category === "INCOME") {
            categoryGerman = "Einnahme"
        } else {
            categoryGerman = "Ausgabe"
        }

        return {date, description, categoryGerman, amount};
    }


   /* const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );*/

        return (
            <Card sx={{ minWidth: 275, margin: '16px' }}  >
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {props.transaction.date.toLocaleString()}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {props.transaction.description}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.transaction.category}
                    </Typography>
                    <Typography variant="body2">
                        {props.transaction.amount}
                    </Typography>
                    <IconButton disableRipple={true} className={"buttonEdit"} onClick={props.update}><EditIcon/></ IconButton>
                </CardContent>

            </Card>
        );
    }



      /*  <TableBody>
            {rows.map((row) => (
                <TableRow
                    key={row.date.toLocaleString()}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell component="th" scope="row">{row.date.toLocaleString()}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.categoryGerman}</TableCell>
                    <TableCell align="right">{row.amount} €</TableCell>
                    <TableCell align="right">
                        <IconButton disableRipple={true} className={"buttonEdit"} onClick={props.update}><EditIcon/></ IconButton>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>*/



