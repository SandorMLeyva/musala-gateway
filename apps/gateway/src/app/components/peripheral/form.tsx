import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, LinearProgress, Typography, Box, Switch, FormControlLabel, makeStyles, Theme, createStyles } from '@material-ui/core';
import { IPeripheral } from '@gateway/models';
import * as ApiInterfaces from '@gateway/api-interfaces';


interface FormPeripheralProps {
    onSubmit?(item: IPeripheral): void,
    gateway?: string;
    onCancel?(): void
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 40
        }
    }),
);


export default function FormPeripheral(props: FormPeripheralProps) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h5" component="h2">
                Add new Peripheral
                    </Typography>
            <div>
                <Formik
                    initialValues={{
                        uid: 0,
                        vendor: "",
                        status: true,
                    }}
                    validate={values => {
                        const errors: Partial<IPeripheral> = {};
                        if (!values.vendor) {
                            errors.vendor = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        fetch(`http://localhost:3333/api/v1${ApiInterfaces.PeripheralApiUrlCreate}`,
                            {
                                method: 'POST',
                                body: JSON.stringify({
                                    uid: values.uid,
                                    vendor: values.vendor,
                                    status: values.status,
                                    gateway: props.gateway
                                }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(r => r.json())
                            .then(r => props.onSubmit(r as IPeripheral))
                            .then(r => setSubmitting(false))
                            .catch(e => console.log(e));

                    }
                    }
                >
                    {({ submitForm, isSubmitting, setValues, values }) => (
                        <Form>
                            <Field
                                component={TextField}
                                name="uid"
                                type="number"
                                label="UID"
                                style={{ margin: 10 }}
                                placeholder="UID"
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
                                label="Vendor"
                                name="vendor"
                                style={{ margin: 10 }}
                                placeholder=""
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <br />
                            <FormControlLabel
                                control={
                                    <Field
                                        component={Switch}
                                        type="checkbox"
                                        label="Status"
                                        name="status"
                                        color="primary"
                                        defaultChecked
                                        onChange={event => setValues({ ...values, status: event.target.checked })}
                                    />
                                }
                                label="Status"
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
