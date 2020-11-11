import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Box, Tooltip, IconButton } from '@material-ui/core';
import { IPeripheral } from '@gateway/models';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles({
    root: {
        width: 250,
        height: 200,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    online: {
        borderRadius: "100%",
        height: 10,
        width: 10,
        backgroundColor: "#4caf50"
    },
    offline: {
        borderRadius: "100%",
        height: 10,
        width: 10,
        backgroundColor: "#dc004e"
    },

});

interface IPeripheralCardProps {
    peripheral: IPeripheral;
    onEdit?(value:IPeripheral): void;
    onDelete?(value:IPeripheral): void
}

export function PeripheralCard(props: IPeripheralCardProps) {
    const classes = useStyles();
    const status = props.peripheral.status ? <div className={classes.online}></div> : <div className={classes.offline}></div>;

    return (
        <Box m={1}>
            <Card className={classes.root}>
                <CardContent >
                    <Box display="flex" flexDirection="row-reverse">
                        <Tooltip title={props.peripheral.status ? "Online" : "Offline"} placement="top-start">
                            {status}
                        </Tooltip>
                    </Box>
                    <Box m={1}>
                        <Typography variant="h5" component="h2">
                            {props.peripheral.vendor}
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {moment(props.peripheral.dateCreated).format('MMM Do YY, h:mm:ss a')}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {props.peripheral.uid}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions>
                    <Box display="flex" justifyContent="flex-end" >
                        {props.onEdit ?
                            <IconButton aria-label="edit" onClick={() => props.onEdit(props.peripheral)}>
                                <EditIcon />
                            </IconButton> : null}
                        {props.onDelete ?
                            <IconButton aria-label="delete" onClick={() =>
                                props.onDelete(props.peripheral)
                            }>
                                <DeleteIcon />
                            </IconButton> : null
                        }
                    </Box>

                </CardActions>

            </Card>
        </Box>
    );
}
