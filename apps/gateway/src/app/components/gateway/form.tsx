import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, LinearProgress, Typography, createStyles, makeStyles, Theme } from '@material-ui/core';
import { IGateway, ipV4Format } from '@gateway/models';
import * as ApiInterfaces from '@gateway/api-interfaces';


interface FormGatewayProps {
    onSubmit?(item: IGateway): void
    onCancel?(): void
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
    return (
        <div className={classes.root}>
            <Typography variant="h5" component="h2">
                Add new Gateway
                    </Typography>
            <div>
                <Formik
                    initialValues={{
                        serial: "",
                        name: "",
                        ipv4Address: "",
                    }}
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
                    onSubmit={(values, { setSubmitting }) => {

                        fetch(`http://localhost:3333/api/v1${ApiInterfaces.GatewayApiUrlCreate}`,
                            {
                                method: 'POST',
                                body: JSON.stringify(values),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(r => r.json())
                            .then(r=> props.onSubmit(r as IGateway))
                            .then(r => setSubmitting(false))
                            .catch(e => console.log(e));

                    }}
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
                            >Save</Button>
                        </Form>
                    )}
                </Formik >
            </div>
        </div>
    );
}
