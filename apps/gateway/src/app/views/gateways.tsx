import React, { useEffect, useState } from 'react'
import { GatewayCard } from '../components/gateway'
import { Box, Modal, Theme, createStyles, makeStyles, Fade, Paper, IconButton } from '@material-ui/core'
import AddCard from '../components/add-button'
import { IGateway } from "@gateway/models"
import * as ApiInterfaces from '@gateway/api-interfaces';
import Backdrop from '@material-ui/core/Backdrop';
import FormGateway from '../components/gateway/form';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

    }),
);

export const Gateways = () => {
    const classes = useStyles();
    const [gateways, setGateways] = useState<IGateway[]>([]);
    useEffect(() => {
        fetch(`http://localhost:3333/api/v1${ApiInterfaces.GatewayApiUrlList}`)
            .then(r => r.json())
            .then(setGateways)
            .catch(e => console.log(e))
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const newGateway = (gateway: IGateway) => {
        setGateways([...gateways, gateway]);
        handleClose();
    };


    return (
        <div>
            <Box display="flex" flexWrap={"wrap"} >
                <AddCard onClick={handleOpen} />
                {gateways.map(gateway =>
                    <GatewayCard gateway={gateway} key={gateway._id} />)}
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
                        <FormGateway onSubmit={newGateway} />
                    </Paper>
                </Fade>
            </Modal>
        </div>
    )
}