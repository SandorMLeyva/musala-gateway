import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, LinearProgress, Typography, createStyles, makeStyles, Theme } from '@material-ui/core';
import { IGateway, ipV4Format } from '@gateway/models';
import { updateGateway, createGateway } from '../../api';


interface FormGatewayProps {
    onSubmit?(item: IGateway): void;
    gateway?: IGateway;
    edit?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 40
        }
    }),
);

export default function FormGateway(props: FormGatewayProps) {
    const classes = useStyles();

    const onSubmit = (values, { setSubmitting, setFieldError }: FormikHelpers<IGateway>) => {
        if (props.edit) {
            updateGateway(props.gateway._id, values)
                .then(r => {
                    if (r.ok) {
                        r.json().then(e => props.onSubmit(e as IGateway));
                    }
                    setSubmitting(false)
                })
                .catch(e => console.log(e));
        }
        else {
            createGateway(values)
                .then(async r => {
                    if (r.ok) {
                        r.json().then(e => props.onSubmit(e as IGateway));
                    }
                    else {
                        setFieldError("serial", "This serial belongs to another gateway");
                    }
                    setSubmitting(false);
                })
                .catch(e => console.log(e));
        }

    };

    return (
        <div className={classes.root}>
            <Typography variant="h5" component="h2">
                {props.edit ? "Edit" : "Add new"} Gateway
                    </Typography>
            <div>
                <Formik
                    initialValues={{
                        serial: props.edit ? props.gateway.serial : "",
                        name: props.edit ? props.gateway.name : "",
                        ipv4Address: props.edit ? props.gateway.ipv4Address : "",
                    } as IGateway}
                    validate={values => {
                        const errors: Partial<IGateway> = {};
                        if (!values.ipv4Address) {
                            errors.ipv4Address = 'Required';
                        } else if (
                            !ipV4Format.test(values.ipv4Address)
                        ) {
                            errors.ipv4Address = 'Invalid email address';
                        }
                        if (!values.serial) {
                            errors.serial = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={onSubmit}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form>
                            <Field
                                component={TextField}
                                name="serial"
                                type="string"
                                label="Serial"
                                style={{ margin: 10 }}
                                placeholder="XXX"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <br />
                            <Field
                                component={TextField}
                                type="string"
                                label="IP"
                                name="ipv4Address"
                                style={{ margin: 10 }}
                                placeholder="127.0.0.1"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <br />
                            <Field
                                component={TextField}
                                type="string"
                                label="Name"
                                name="name"
                                style={{ margin: 10 }}
                                placeholder="Gateway"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {isSubmitting && <LinearProgress />}
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                                id="btn-submit-gateway-form"
                            >Save</Button>
                        </Form>
                    )}
                </Formik >
            </div>
        </div>
    );
}
