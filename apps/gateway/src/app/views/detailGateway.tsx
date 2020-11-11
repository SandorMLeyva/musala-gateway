import React, { useState, useEffect, useContext } from 'react'
import { Typography, makeStyles, Box, Modal, Fade, Paper, IconButton } from '@material-ui/core';
import { IGateway, IPeripheral } from '@gateway/models';
import * as ApiInterfaces from '@gateway/api-interfaces';
import { PeripheralCard } from '../components/peripheral/peripheralCard';
import AddCard from '../components/add-button';
import FormPeripheral from '../components/peripheral/form';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';
import { PeripheralContext } from '../context';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



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

interface ParamTypes {
    id: string
}
interface ISetUpdate {
    edit: boolean,
    peripheral: IPeripheral
}
const GatewayDetail = () => {
    const classes = useStyles();
    const { id } = useParams<ParamTypes>();

    const [gateway, setGateway] = useState<IGateway>({} as IGateway);
    useEffect(() => {
        fetch(`http://localhost:3333/api/v1${ApiInterfaces.GatewayApiUrlDetail.replace(":id", id)}`)
            .then(r => r.json())
            .then(setGateway)
            .catch(e => console.log(e))
    }, [id]);

    const { peripherals, setPeripherals } = useContext(PeripheralContext);

    useEffect(() => {
        fetch(`http://localhost:3333/api/v1${ApiInterfaces.GatewayApiUrlPeripheral.replace(":id", id)}`)
            .then(r => r.json())
            .then(setPeripherals)
            .catch(e => console.log(e))
    }, [id]);

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState<ISetUpdate>({
        edit: false,
        peripheral: null
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setEdit({
            edit: false,
            peripheral: null
        })
        setOpen(false);
    };

    const newPeripheral = (peripheral: IPeripheral) => {
        setPeripherals([...peripherals, peripheral]);
        handleClose();
    };

    const updatedPeripheral = (peripheral: IPeripheral) => {

        const index = peripherals.findIndex(item => item._id === peripheral._id);

        if (index !== -1) {
            peripherals[index] = peripheral;
        }
        setPeripherals(peripherals);
        handleClose();
    };

    const deletePeripheral = (item: IPeripheral) => (
        fetch(`http://localhost:3333/api/v1${ApiInterfaces.PeripheralApiUrlRemove.replace(":id", item._id)}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(r => r.json())
            .then(r => {
                const clean = peripherals.filter(item => item._id !== r._id);
                setPeripherals(clean);
            })
            .catch(e => console.log(e))
    );

    const editPeripheral = (item: IPeripheral) => {
        setEdit({
            edit: true,
            peripheral: item
        })
        handleOpen()
    };

    return (<div>
        <Box p={1} m={2} display="flex">
            <Box m={5}>
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
            <Box display="flex" m={5} p={3}>
                <IconButton aria-label="edit"
                    onClick={() => console.log("edit")}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete"
                    onClick={() => console.log("delete")
                    }>
                    <DeleteIcon color="secondary" />
                </IconButton>
            </Box>

        </Box>
        <Box p={5}>
            <Box ml={1}>
                <Typography variant="h5" component="h2">
                    Devices
                </Typography>
            </Box>

            <Box display="flex" flexWrap={"wrap"} >
                {peripherals.length < 10 ? <AddCard small={true} onClick={handleOpen} /> : null}
                {peripherals.map(peripheral => <PeripheralCard onDelete={deletePeripheral} onEdit={editPeripheral} peripheral={peripheral} key={peripheral._id} />)}
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
                        <FormPeripheral {...edit} gateway={id} onSubmit={edit.edit ? updatedPeripheral : newPeripheral} />
                    </Paper>
                </Fade>
            </Modal>
        </Box>
    </div>);
};
export default GatewayDetail;