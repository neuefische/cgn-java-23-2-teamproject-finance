import {Transaction} from "../model/model.ts";

import "./TransactionCard.css";
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as dayjs from "dayjs";

import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import axios from "axios";


type Props = {
    transaction: Transaction;
    update: () => void;

};

export default function TransactionCard(props: Props) {
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={props.update}>
                Bearbeiten
            </SwipeAction>
        </LeadingActions>
    );

    function callDelete(){

        axios.delete("/api/finance/" + props.transaction.id)
            .catch(console.error)
    }


    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={callDelete}
            >
                Löschen
            </SwipeAction>
        </TrailingActions>
    );

    let category: string

    if (props.transaction.category === "EXPENSE"){
        category = "Ausgabe"
    }else{
        category= "Einnahme"
    }


        return (

            <SwipeableList>
                <SwipeableListItem
                    leadingActions={leadingActions()}
                    trailingActions={trailingActions()}

                >

            <Card onClick={props.update} sx={{ minWidth: 275, margin: '16px' }}>
                <CardContent style={{background:"lightblue"}}>

                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {dayjs(props.transaction.date).format('DD.MM.YYYY')}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {props.transaction.description}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {category}
                    </Typography>
                    <Typography variant="body2">
                        {props.transaction.amount} EUR
                    </Typography>
                    <EditIcon/>
                </CardContent>

            </Card>
                </SwipeableListItem>
            </SwipeableList>

        );
    }


