import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Box, Tooltip } from '@material-ui/core';
import { IPeripheral, PeripheralStatus } from '@gateway/models';

const useStyles = makeStyles({
    root: {
        minWidth: 250,
        maxWidth: 250,
        minHeight: 140,
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
    const isOnline = params.peripheral.status === PeripheralStatus.online;
    const status = isOnline ? <div className={classes.online}></div> : <div className={classes.offline}></div>;

    return (
        <Box m={1}>
            <Card className={classes.root}>
                <CardContent >
                    <div className={classes.right}>
                        <Tooltip title={isOnline?"Online":"Offline"} placement="top-start">
                            {status}
                        </Tooltip>
                    </div>
                    <Box m={1}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {params.peripheral.dateCreated}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {params.peripheral.vendor}
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
