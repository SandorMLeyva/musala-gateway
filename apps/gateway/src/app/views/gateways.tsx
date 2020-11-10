import React, { useEffect, useState } from 'react'
import { GatewayCard } from '../components/gateway'
import { Box, Modal, Theme, createStyles, makeStyles, Fade, Paper, TextField } from '@material-ui/core'
import AddCard from '../components/add-button'
import { IGateway } from "@gateway/models"
import * as ApiInterfaces from '@gateway/api-interfaces';
import Backdrop from '@material-ui/core/Backdrop';

import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper:{
            height: "70vh",
            width: "30vw"
        }

    }),
);
interface Values {
    email: string;
    password: string;
}
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
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validate={values => {
                                const errors: Partial<Values> = {};
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    setSubmitting(false);
                                    alert(JSON.stringify(values, null, 2));
                                }, 500);
                            }}
                        >
                            {({ submitForm, isSubmitting }) => (
                                <Form>
                                    <Field
                                        component={TextField}
                                        name="email"
                                        type="email"
                                        label="Email"
                                    />
                                    <br />
                                    <Field
                                        component={TextField}
                                        type="password"
                                        label="Password"
                                        name="password"
                                    />
                                    {isSubmitting && <LinearProgress />}
                                    <br />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        Submit
          </Button>
                                </Form>
                            )}
                        </Formik>
                    </Paper>
                </Fade>
            </Modal>
        </div>
    )
}
