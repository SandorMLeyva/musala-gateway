import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router';
import { Typography, makeStyles, Box, Modal, Fade, Paper, IconButton } from '@material-ui/core';
import { IGateway, IPeripheral } from '@gateway/models';
import * as ApiInterfaces from '@gateway/api-interfaces';
import { PeripheralCard } from '../components/peripheral/peripheral-card';
import AddCard from '../components/add-button';
import FormPeripheral from '../components/peripheral/form';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';



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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: "30vw",
        textAlign: "center"
    },
    textRigth: {
        textAlign: "right"
    }

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

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const newGateway = (peripheral: IPeripheral) => {
        setPeripherals([...peripherals, peripheral]);
        handleClose();
    };


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

            <Box display="flex" flexWrap={"wrap"} >
                {peripherals.length < 10 ? <AddCard small={true} onClick={handleOpen} /> : null}
                {peripherals.map(peripheral => <PeripheralCard peripheral={peripheral} key={peripheral._id} />)}
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Paper className={classes.paper}>
                        <div className={classes.textRigth}>
                            <IconButton onClick={handleClose} aria-label="delete" >
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <FormPeripheral gateway={match.params.id} onSubmit={newGateway} />
                    </Paper>
                </Fade>
            </Modal>
        </Box>
    </div>);
};
export default GatewayDetail;