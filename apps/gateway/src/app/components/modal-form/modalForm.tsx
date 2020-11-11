import React, { Children } from 'react'
import { Modal, Theme, createStyles, makeStyles, Fade, Paper, IconButton } from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop';
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
        textRight: {
            textAlign: "right"
        }

    }),
);

interface IModalFormProps{
    open: boolean;
    handleClose():void;
    children?: any;
}

export const ModalForm = (props:IModalFormProps) => {
    const classes = useStyles();


    return (

        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <Paper className={classes.paper}>
                    <div className={classes.textRight}>
                        <IconButton onClick={props.handleClose} aria-label="delete" >
                            <CloseIcon />
                        </IconButton>
                    </div>
                    {props.children}
                    {/* <FormGateway onSubmit={props.newGateway} /> */}
                </Paper>
            </Fade>
        </Modal>
    )
}
