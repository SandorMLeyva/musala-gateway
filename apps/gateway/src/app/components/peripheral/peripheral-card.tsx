import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, Tooltip } from '@material-ui/core';
import { IPeripheral } from '@gateway/models';
import moment from 'moment';

const useStyles = makeStyles({
    root: {
        width: 250,
        height: 140,
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
    right: {
        display: "flex",
        flexDirection: "row-reverse",
    }
});

export function PeripheralCard(params: { peripheral: IPeripheral }) {
    const classes = useStyles();
    
    const status = params.peripheral.status ? <div className={classes.online}></div> : <div className={classes.offline}></div>;

    return (
        <Box m={1}>
            <Card className={classes.root}>
                <CardContent >
                    <div className={classes.right}>
                        <Tooltip title={params.peripheral.status?"Online":"Offline"} placement="top-start">
                            {status}
                        </Tooltip>
                    </div>
                    <Box m={1}>
                        <Typography variant="h5" component="h2">
                            {params.peripheral.vendor}
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {moment(params.peripheral.dateCreated).format('MMM Do YY, h:mm:ss a')} 
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            {params.peripheral.uid}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
