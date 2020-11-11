import React, {useContext} from 'react';
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
import * as ApiInterfaces from '@gateway/api-interfaces';
import { PeripheralContext } from '../../context';



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

export function PeripheralCard(params: { peripheral: IPeripheral }) {
    const classes = useStyles();
    const {peripherals, setPeripherals} = useContext(PeripheralContext);
    const status = params.peripheral.status ? <div className={classes.online}></div> : <div className={classes.offline}></div>;

    return (
        <Box m={1}>
            <Card className={classes.root}>
                <CardContent >
                    <Box display="flex" flexDirection="row-reverse">
                        <Tooltip title={params.peripheral.status ? "Online" : "Offline"} placement="top-start">
                            {status}
                        </Tooltip>
                    </Box>
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
                <CardActions>
                    <Box display="flex" justifyContent="flex-end" >
                        <IconButton aria-label="edit">
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={()=>
                            fetch(`http://localhost:3333/api/v1${ApiInterfaces.PeripheralApiUrlRemove.replace(":id",params.peripheral._id)}`,
                            {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(r => r.json())
                            .then(r=> {
                                console.log(r);
                                console.log(peripherals);
                                const clean = peripherals.filter(item=>item._id !== r._id);
                                console.log(clean);
                                setPeripherals(clean);
                            })
                            .catch(e => console.log(e))
                        }>
                            <DeleteIcon />
                        </IconButton>

                    </Box>

                </CardActions>

            </Card>
        </Box>
    );
}
