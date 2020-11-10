import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router';
import { Typography, makeStyles, Box } from '@material-ui/core';
import { IGateway, IPeripheral } from '@gateway/models';
import * as ApiInterfaces from '@gateway/api-interfaces';
import { PeripheralCard } from '../components/peripheral/peripheral-card';


type GatewayDetailParams = {
    id: string;
};
type GatewayDetailProps = RouteComponentProps<GatewayDetailParams>;


const useStyles = makeStyles({

    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    link: {
        textDecoration: "none"
    },

});

const GatewayDetail: React.FC<GatewayDetailProps> = ({ match }) => {
    const classes = useStyles();

    const [gateway, setGateway] = useState<IGateway>({} as IGateway);
    useEffect(() => {
        fetch(`http://localhost:3333/api/v1${ApiInterfaces.GatewayApiUrlDetail.replace(":id", match.params.id)}`)
            .then(r => r.json())
            .then(setGateway)
            .catch(e => console.log(e))
    }, []);

    const [peripherals, setPeripherals] = useState<IPeripheral[]>([]);
    useEffect(() => {
        fetch(`http://localhost:3333/api/v1${ApiInterfaces.GatewayApiUrlPeripheral.replace(":id", match.params.id)}`)
            .then(r => r.json())
            .then(setPeripherals)
            .catch(e => console.log(e))
    }, []);

    return (<div>
        <Box p={1} m={2}>
            <Typography variant="h5" component="h3">
                {gateway.name}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                {gateway.ipv4Address}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
                {gateway.serial}
            </Typography>
        </Box>
        <Box p={5}>
            <Box ml={1}>
            <Typography variant="h5" component="h2">
                Devices
                </Typography>
            </Box>
            {peripherals.map(peripheral => <PeripheralCard peripheral={peripheral} />)}
        </Box>
    </div>);
};
export default GatewayDetail;