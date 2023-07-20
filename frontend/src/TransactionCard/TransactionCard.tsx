import {Transaction} from "../model/model.ts";

import "./TransactionCard.css";
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as dayjs from "dayjs";


type Props = {
    transaction: Transaction;
    update: () => void;
};

export default function TransactionCard(props: Props) {


        return (
            <Card onClick={props.update} sx={{ minWidth: 275, margin: '16px' }}>
                <CardContent style={{background:"lightblue"}}>

                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {dayjs(props.transaction.date).format('DD.MM.YYYY')}
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
                    <EditIcon/>
                </CardContent>

            </Card>
        );
    }


